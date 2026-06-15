# Fraudspect Regulatory Reporting — Production & CBN Compliance Implementation Prompt

Copy everything below this line into Claude Code. Execute **phase by phase** in order. Do not skip Phase 1 — it unblocks real client usage of the STR module already built.

---

## Mission

Bring Fraudspect's NFIU goAML reporting from **STR v1 (functional)** to **production-grade, CBN-aligned regulatory reporting** suitable for Nigerian financial institutions preparing for the June 2026 automated AML baseline standards roadmap.

### What already exists (do not rebuild)

```
backend/src/modules/str-reports/     # STR module (escalation, MLRO workflow, NFIU submit)
backend/src/modules/transactions/    # TM + TRANSACTION_SCORED_EVENT
frontend/src/modules/str-reports/    # Dashboard, detail, config
doc/str-reporting-module-build-prompt.md
doc/str-reporting-flow-adjustments-prompt.md
```

**STR core workflow (keep):**

- Auto-escalation: score ≥ `strAutoEscalationScore` OR `StrTriggerRule` match
- Status flow: `DRAFT → PENDING_MLRO_REVIEW → APPROVED → SUBMITTING → SUBMITTED`
- MLRO approval required before NFIU production submit (`requiresMlroApproval: true`)
- 24h filing deadline (`STR_FILING_WINDOW_HOURS = 24`)
- goAML XML builder, field mappings, audit events, in-app notifications

---

## CBN compliance target (what "fully compliant" means)

Per CBN Circular BSD/DIR/PUB/LAB/019/002 and NFIU goAML requirements, a production-grade system must demonstrate:

| Capability | Requirement |
|------------|-------------|
| **Automated detection** | TM flags suspicious/high-risk transactions without manual polling |
| **Automated drafting** | STR pre-filled in NFIU XML format with evidence |
| **Human governance** | MLRO substantive review before filing (maker-checker) |
| **Automated submission** | Direct goAML submission after MLRO approval (or documented manual upload) |
| **24h STR window** | Timestamp proof: suspicion formed → filed within 24 hours |
| **Audit trail** | Immutable log of who did what, when |
| **Threshold reporting** | CTR (domestic cash) + FTR (cross-border) — separate from STR |
| **Integrated investigation** | STR linked to transactions, customers, AML cases |
| **Filing quality metrics** | Org can prove on-time filing rate to auditors |
| **Role separation** | Analyst drafts; MLRO approves; config admin separate |

**Explicitly forbidden:** Production MLRO bypass (unattended STR submit to NFIU).

---

## Architecture principles (all phases)

1. **One module, multiple report types** — extend `str-reports` → rename internally to `regulatory-reports` only if needed; keep API path `/str-reports` for backward compatibility or add `/regulatory-reports` alias.

2. **Provider pattern** — `StrSubmissionProvider` per country (`NFIU_GOAML` first). Report-type logic (STR vs CTR vs FTR) lives in separate escalation services sharing XML builder.

3. **Workflow per report type:**

   | Type | Trigger | Deadline | MLRO gate |
   |------|---------|----------|-----------|
   | STR | Suspicion (rules/score/manual) | 24h | Required |
   | CTR | Cash amount threshold | 7 days | Compliance sign-off (lighter) |
   | FTR | Cross-border ≥ $10k equivalent | Confirm with NFIU | Compliance sign-off |
   | SAR | Non-transactional suspicion | 24h | Required (future) |

4. **Submission modes** — track explicitly:

   ```prisma
   enum StrSubmissionMode {
     API_SUBMITTED      // confirmed delivered to NFIU API
     MANUAL_UPLOAD      // XML generated; user must upload to goAML portal
     SANDBOX_TEST       // test only
   }
   ```

   Never mark `SUBMITTED` with `MANUAL_UPLOAD` without user confirming portal upload.

---

# PHASE 1 — STR production readiness (P0)
**Goal:** Clients can use STR end-to-end in daily operations without workarounds.
**Timeline:** Ship first.

## 1.1 Entry points (frontend)

### Transaction detail — File STR

**File:** `frontend/src/modules/transaction/pages/TransactionDetails.tsx`

Add feature component: `TransactionStrReportCard.tsx`

- Query existing STRs for this transaction: `GET /str-reports?transactionId={id}`
- If active STR exists (not REJECTED/FAILED terminal) → link to `/str-reports/:id`
- Else → **File STR** button (`CREATE_STR` permission)
  - Calls `createStrReport({ transactionId, narrative?: '' })`
  - Navigate to STR detail page
- Show STR status chip if exists

### AML case detail — File STR

**File:** `frontend/src/modules/case/pages/CaseDetails.tsx`

Add `CaseStrReportSection.tsx`:

- List STRs linked to case (`amlCaseId` filter on API — add if missing)
- **File STR** per linked transaction or primary customer transaction
- Pre-fill `amlCaseId` on create

### STR dashboard — manual create

**File:** `frontend/src/modules/str-reports/pages/StrReportDashboard.tsx`

- **Create STR** button → dialog: select transaction (searchable), optional narrative
- Uses `createStrReport` mutation

### API filter addition

**File:** `backend/src/modules/str-reports/dto/get-str-reports-filter.dto.ts`

Add optional `transactionId`, `amlCaseId` query params to list endpoint.

---

## 1.2 Org STR config bootstrap

**Problem:** No `OrganizationStrConfig` → auto-escalation silently skipped.

### Backend

**File:** `backend/src/modules/str-reports/services/str-reports.service.ts`

On `getConfig()` — if no config exists, return defaults (already partial). On first `updateConfig()` — upsert (already works).

**New:** `ensureStrConfig(organizationId)` helper called from:

- `StrEscalationService.evaluate()` — if no config, create default config with `strAutoEscalationScore: 75` and log info
- Org module on organization creation (optional hook)

Default config must NOT include NFIU credentials or MLRO — those remain admin setup.

### Frontend onboarding banner

**File:** `frontend/src/modules/str-reports/pages/StrReportDashboard.tsx`

If `mlroUserId` is null OR `hasNfiuCredentials` is false → show setup alert linking to `/str-reports/config` with checklist:

- [ ] Designate MLRO
- [ ] Configure NFIU credentials
- [ ] Set escalation rules
- [ ] Map goAML fields

Block nothing — warn only. Escalation works with defaults after bootstrap.

---

## 1.3 Submission mode honesty

### Schema migration

```prisma
enum StrSubmissionMode {
  API_SUBMITTED
  MANUAL_UPLOAD
  SANDBOX_TEST
}

// On StrReport:
submissionMode    StrSubmissionMode?
portalUploadedAt  DateTime?   // user confirms manual portal upload
portalUploadedByUserId String?
```

### Backend

**File:** `backend/src/modules/str-reports/processors/str-submission.processor.ts`

When `nfiuProvider.submit()` returns `rawResponse.mode === 'manual_upload'`:

- Set status `PENDING_PORTAL_UPLOAD` (new status) OR `APPROVED` with `submissionMode: MANUAL_UPLOAD`
- Do NOT set `SUBMITTED` until user confirms

**New endpoint:**

```
POST /str-reports/:id/confirm-portal-upload
```

MLRO confirms they uploaded XML to goAML portal manually. Then → `SUBMITTED`, `portalUploadedAt`, audit event.

### Frontend

STR detail shows clear banner:

- **API Submitted** — green, NFIU report ID
- **Pending Portal Upload** — amber, download XML + confirm button
- Never show "Submitted to NFIU" for manual_upload without confirmation

---

## 1.4 XML preview before MLRO approval

### Backend

```
POST /str-reports/:id/preview-xml
```

- Builds XML via `NfiuGoamlProvider.buildXml()` without submitting
- Returns `{ xml, validationWarnings: string[] }`
- Stores to `xmlDraftUrl` optionally

Permission: `VIEW_STR` or `EDIT_STR`

### Frontend

STR detail → **Preview XML** button (before approve). MLRO can review goAML structure.

---

## 1.5 Email notifications (MLRO critical path)

**File:** `backend/src/modules/str-reports/services/str-notification.service.ts`

Extend to send email via `MailService` (pattern: `customer-rescore.processor.ts`) for:

| Event | Recipient | Priority |
|-------|-----------|----------|
| AUTO_ESCALATED | MLRO | URGENT |
| SUBMITTED_FOR_REVIEW | MLRO | URGENT |
| Deadline < 4h (cron) | MLRO + drafter | URGENT |
| SUBMITTED / FAILED | MLRO + drafter | HIGH |

Respect `NotificationService` user preferences if email category exists; otherwise always email MLRO for STR.

### Cron job

**New:** `StrDeadlineCron` — runs every hour:

- Find STRs in `DRAFT`, `PENDING_MLRO_REVIEW`, `APPROVED` where `filingDeadlineAt` < now + 4h
- Send reminder if not already reminded (track `lastReminderAt` on StrReport or dedupe via events)

---

## 1.6 Escalation on transaction re-score

**File:** `backend/src/modules/transactions/services/transactions.service.ts`

Emit `TRANSACTION_SCORED_EVENT` not only on create but also when:

- Transaction score/rules updated via rescore path (if exists)
- Status change that re-evaluates rules (evaluate scope — at minimum document where it fires)

**File:** `backend/src/modules/str-reports/services/str-escalation.service.ts`

Dedup logic already handles active STRs — ensure re-trigger after REJECTED creates new DRAFT.

---

## 1.7 AML case auto-link on auto-escalation

**File:** `backend/src/modules/str-reports/services/str-escalation.service.ts`

After creating STR DRAFT:

- Check if AML case exists for transaction (via `AmlCaseTransaction`)
- If yes → set `amlCaseId` on StrReport
- If no AND score ≥ 90 (configurable `strAutoCreateAmlCaseScore`) → create AML case (type Default, status Open) and link

Configurable in `OrganizationStrConfig`: `strAutoLinkAmlCase: boolean @default(true)`

---

## 1.8 Role templates & permissions UX

### Default roles seed (per org on STR module enable)

| Role | Permissions |
|------|-------------|
| **Compliance Analyst** | VIEW_STR, CREATE_STR, EDIT_STR, DOWNLOAD_STR |
| **MLRO** | VIEW_STR, EDIT_STR, APPROVE_STR, SUBMIT_STR, DOWNLOAD_STR |
| **Compliance Admin** | All STR + MANAGE_STR_CONFIG |

**File:** `backend/src/modules/roles/` — add optional seeder or document in config UI.

### Frontend role builder

Ensure STR permissions appear in `user-management` role create/edit UI grouped under "STR Reporting".

---

## Phase 1 acceptance criteria

- [ ] File STR from transaction detail and AML case detail
- [ ] Create STR from STR dashboard
- [ ] Org gets default STR config automatically; escalation never silently no-ops
- [ ] Manual upload vs API submit clearly distinguished in UI
- [ ] MLRO receives email on escalation and review queue
- [ ] XML preview before approval
- [ ] STR linked to AML case when applicable
- [ ] 4h deadline reminder cron

---

# PHASE 2 — Filing compliance & audit (P0/P1)
**Goal:** Prove 24h STR compliance to CBN auditors.

## 2.1 Filing timeliness dashboard

**New page:** `/str-reports/compliance` or tab on STR dashboard

### Metrics (org-scoped)

| Metric | Calculation |
|--------|-------------|
| STRs filed on time | `submittedAt <= filingDeadlineAt` |
| STRs overdue | `filingDeadlineAt < now` AND status not SUBMITTED |
| Avg hours to file | `submittedAt - suspicionFormedAt` |
| Pending MLRO queue | count by status |
| Failed submissions | count + retry rate |

### Backend

```
GET /str-reports/compliance/summary?startDate&endDate
GET /str-reports/compliance/overdue
```

### Export

CSV/PDF export of filing log for auditor — reuse PDF pattern from `customer-rescore.processor.ts`.

---

## 2.2 Enhanced audit trail

### StrReportEvent actions (ensure all exist)

```
AUTO_ESCALATED | CREATED | NARRATIVE_UPDATED | SUBMITTED_FOR_REVIEW
APPROVED | REJECTED | INFO_REQUESTED | SUBMITTING | SUBMITTED
SUBMISSION_FAILED | SUBMISSION_BLOCKED_NO_MLRO_APPROVAL
PORTAL_UPLOAD_CONFIRMED | DEADLINE_REMINDER_SENT | XML_PREVIEWED
```

### ChangeLog

Every STR status change already logged — add transaction-level changelog entry on SUBMITTED.

### Immutable submitted record

After `SUBMITTED` + `API_SUBMITTED` or `PORTAL_UPLOAD_CONFIRMED`:

- Block narrative edits
- Block XML overwrite
- Amendments create new `StrReportAmendment` record (v2 — optional in Phase 2)

---

## 2.3 MLRO review checklist (frontend)

Before Approve button enables, MLRO must check:

- [ ] Narrative describes suspicion grounds
- [ ] Transaction evidence reviewed
- [ ] Customer identity verified in narrative
- [ ] XML preview reviewed (if field mappings complete)

Store `mlroReviewChecklist` JSON on approve event metadata.

---

## 2.4 STR detail — consolidated evidence panel

**File:** `frontend/src/modules/str-reports/features/StrReportEvidencePanel.tsx`

Single view showing:

- Transaction summary + rules fired
- Customer profile link
- Latest PEP/sanctions screening result (if any)
- Linked AML case
- Case manager notes (read-only excerpt)

Fetch via STR detail endpoint expansion or parallel queries.

---

## Phase 2 acceptance criteria

- [ ] Compliance dashboard with on-time % and overdue list
- [ ] Exportable filing log for auditors
- [ ] MLRO checklist captured on approval
- [ ] Evidence panel on STR detail
- [ ] Submitted STRs immutable

---

# PHASE 3 — CTR (Currency Transaction Report) (P1)
**Goal:** Threshold reporting for domestic cash transactions per NFIU.

## 3.1 Regulatory rules

| Entity | Threshold (NGN cash) | goAML `report_code` |
|--------|------------------------|---------------------|
| Individual | ≥ 5,000,000 | CTR |
| Corporate | ≥ 10,000,000 | CTR |

**Deadline:** 7 days from transaction (CBN guidance). Constant: `CTR_FILING_WINDOW_HOURS = 168`.

**Indicator:** `THRESHOLDREPORT` in `report_indicators`.

Reference sample: `~/Downloads/_Web_Report_ReportID_2619207-0-0.xml`

---

## 3.2 Schema

```prisma
// OrganizationStrConfig additions:
ctrEnabled              Boolean @default(true)
ctrIndividualThreshold  Decimal @default(5000000)
ctrCorporateThreshold   Decimal @default(10000000)

// StrReport — reuse model, reportType: CTR
```

---

## 3.3 CtrEscalationService (separate from STR)

**File:** `backend/src/modules/str-reports/services/ctr-escalation.service.ts`

Listen to `TRANSACTION_SCORED_EVENT` or new `TRANSACTION_INGESTED_EVENT`.

Evaluate:

```
IF transaction is cash (map from transmode_code or mapped field)
AND amount >= threshold for customer entity type
THEN create StrReport { reportType: CTR, status: DRAFT, filingDeadlineAt: +7 days }
```

**No MLRO suspicion gate** — use compliance sign-off workflow:

```
DRAFT → PENDING_COMPLIANCE_REVIEW → APPROVED → SUBMITTED
```

Designated reviewer: `complianceOfficerUserId` on org config (can be same as MLRO).

Auto-submit on approval optional.

---

## 3.4 XML builder

**File:** `nfiu-xml.builder.ts`

When `report.reportType === 'CTR'`:

- `report_code`: CTR
- `report_indicators`: THRESHOLDREPORT
- No suspicion narrative required (factual transaction report)

---

## 3.5 Frontend

- STR dashboard → rename to **Regulatory Reports** with tabs: STR | CTR
- CTR config section in settings (thresholds)
- Filter list by `reportType`

---

## Phase 3 acceptance criteria

- [ ] Cash transactions above threshold auto-create CTR draft
- [ ] 7-day deadline tracked
- [ ] CTR XML matches goAML sample structure
- [ ] Separate workflow from STR (no MLRO suspicion requirement)
- [ ] Submit to NFIU after compliance approval

---

# PHASE 4 — FTR (Foreign Transaction Report) (P1)
**Goal:** Cross-border ≥ $10,000 USD equivalent.

## 4.1 Rules

- Threshold: $10,000 USD (convert via org exchange rate or transaction currency field)
- `report_code`: FTR (confirm against latest NFIU goAML schema)
- Separate from CTR — cross-border only
- Add `FTR` to `StrReportType` enum

## 4.2 FtrEscalationService

Similar to CTR but triggers on:

- `transaction is cross-border` AND `amount_usd >= 10000`

## 4.3 Config

```prisma
ftrEnabled           Boolean @default(true)
ftrUsdThreshold      Decimal @default(10000)
```

---

# PHASE 5 — SAR, AIF, PEP monthly (P2)
**Goal:** Complete NFIU report type coverage.

| Report | Trigger | Notes |
|--------|---------|-------|
| **SAR** | Manual only (non-transactional suspicion) | Refusal to provide KYC, suspicious behaviour |
| **AIF** | Linked to existing STR/CTR/SAR | Supplementary information filing |
| **PEP Transaction Report** | Monthly cron on PEP customer transactions | New NFIU requirement — all PEP txns regardless of suspicion |

Implement after STR + CTR + FTR stable.

---

# PHASE 6 — CBN governance & platform hardening (P1/P2)

## 6.1 Implementation readiness checklist (in-app)

**New settings page section:** CBN Readiness

Auto-evaluate org against:

- [ ] MLRO designated
- [ ] NFIU credentials configured and tested
- [ ] STR escalation rules configured
- [ ] goAML field mappings ≥ 80% complete
- [ ] At least one STR drill submitted (sandbox)
- [ ] TM module enabled
- [ ] Filing compliance > 95% last 30 days

Export as PDF for June 2026 roadmap submission.

---

## 6.2 Sandbox drill mode

**Config:** `nfiuEnvironment: SANDBOX | PRODUCTION`

- Sandbox submissions never mark production SUBMITTED
- Sandbox STR list filtered separately
- "Run STR drill" wizard for onboarding

---

## 6.3 API documentation

**File:** `doc/docs/regulatory-reporting/` (Docusaurus)

Document for clients:

- STR workflow
- CTR/FTR thresholds
- MLRO responsibilities
- API endpoints
- Field mapping guide
- Filing deadline rules

Update `doc/provider-productivity-guide.md` with STR section.

---

## 6.4 Monitoring & alerts (ops)

- Log NFIU API failures to external monitoring (existing pino/Logtail)
- Alert on: submission failure rate > 5%, overdue STR count > 0 for > 1h
- BullMQ dead letter for STR_SUBMISSION queue

---

# Implementation order summary

```
Phase 1 (P0) — STR production ready          ← START HERE
Phase 2 (P0/P1) — Filing compliance & audit
Phase 3 (P1) — CTR
Phase 4 (P1) — FTR
Phase 5 (P2) — SAR, AIF, PEP monthly
Phase 6 (P1/P2) — CBN governance & docs
```

---

# Testing requirements (all phases)

```bash
yarn test -- --testPathPattern=str-report
yarn test -- --testPathPattern=ctr-escalation   # Phase 3+
```

### Critical test scenarios

1. Auto-escalate → DRAFT → submit for review → MLRO approve → API submit → SUBMITTED
2. Manual upload path → PENDING_PORTAL_UPLOAD → confirm → SUBMITTED
3. Submission blocked without MLRO approval
4. CTR threshold triggers CTR not STR
5. FTR cross-border triggers FTR not STR
6. Filing deadline cron sends reminder
7. Duplicate STR dedup per transaction
8. New STR allowed after REJECTED

---

# Files to modify (Phase 1 quick reference)

| Area | Files |
|------|-------|
| Escalation bootstrap | `str-escalation.service.ts`, `str-reports.service.ts` |
| Notifications | `str-notification.service.ts`, new `str-deadline.cron.ts` |
| Submission mode | `str-submission.processor.ts`, `schema.prisma` |
| XML preview | `str-reports.controller.ts`, `str-reports.service.ts` |
| Transaction UI | `TransactionDetails.tsx`, new `TransactionStrReportCard.tsx` |
| Case UI | `CaseDetails.tsx`, new `CaseStrReportSection.tsx` |
| Dashboard UI | `StrReportDashboard.tsx` |
| API filters | `get-str-reports-filter.dto.ts` |

---

# LOCKED — do not implement

- Production MLRO bypass
- Auto-submit STR to NFIU without MLRO approval
- Using customer `riskHighMax` as STR escalation threshold
- Mixing CTR amount triggers into STR escalation service
- Marking SUBMITTED for manual_upload without user confirmation

---

# Definition of done — "production grade & CBN compliant"

Fraudspect can truthfully claim:

1. **Automated** suspicious transaction detection and STR draft generation
2. **MLRO governance** with maker-checker before every NFIU STR filing
3. **24-hour STR filing** tracking with overdue alerts and compliance reporting
4. **Direct goAML submission** (API or documented manual upload path)
5. **CTR and FTR** threshold reporting (Phase 3–4)
6. **Integrated** transaction → STR → AML case workflow
7. **Audit-ready** export for CBN examinations
8. **Onboarding checklist** for June 2026 implementation roadmap

Build Phase 1 completely before starting Phase 3. Phases 3–4 are required for full NFIU report type coverage but STR-only clients can go live after Phase 1 + Phase 2.
