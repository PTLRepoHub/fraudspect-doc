# Fraudspect STR Reporting Module — End-to-End Build Prompt

Copy everything below this line into Claude Code or your agent session.

---

## Objective

Build a production-grade **Suspicious Transaction Report (STR)** module integrated into Fraudspect's existing **transaction monitoring** stack. First target: **Nigeria NFIU goAML** (XML submission). Architecture must be **provider-agnostic** so other countries (FinCEN, FIC, etc.) can be added later without rewriting core workflow logic.

Read and understand these existing modules before writing code:

- `backend/src/modules/transactions/` — transaction ingestion, scoring, rules, status
- `backend/src/modules/rules/` — rule definitions
- `backend/src/modules/aml-cases/` — AML case management
- `backend/src/modules/changelog/` — audit trail
- `backend/src/modules/notification/` — in-app + email notifications
- `backend/prisma/schema.prisma` — `Transaction`, `TransactionRule`, `Rule`, `AmlCase`, `ChangeLog`, `Organization`

Sample goAML XML templates (map schema from these):

- `~/Downloads/_Web_Report_ReportID_2619207-0-0.xml` — full goAML report (schema_version 5.0.2, CTR example; STR uses same schema with `report_code` = STR)
- `~/Downloads/TRN_V2_2619166-0-0_1.xml` — transaction fragment template

---

## Regulatory & Product Decisions (LOCKED — do not change)

| Decision | Choice |
|----------|--------|
| Submission platform | **NFIU goAML** (Nigeria) first |
| Trigger model | **D + C combined** — high-risk auto-escalation + manual filing always available |
| Human gate | **MLRO approval required** before any NFIU submission (CBN-compliant maker-checker) |
| Credentials | **Per-organisation** NFIU goAML credentials (rentity_id, reporting_user_code, API/auth details); global platform key NOT used for submission |
| Auto-submit | Only **after MLRO approves** — never unattended direct-to-NFIU |
| Filing window | Track 24-hour clock from `suspicionFormedAt` → `submittedAt` for audit |

### MLRO bypass — explicitly forbidden (v1)

- **Do NOT** build a production flow that submits to NFIU goAML without MLRO approval
- `mlroApprovalRequired` is **hardcoded `true`** for provider `NFIU_GOAML` — **not an org toggle**
- The **only exception**: `environment: SANDBOX` for credential/XML testing (no real NFIU filing)
- `autoSubmitOnApproval: true` means submit immediately **AFTER** MLRO clicks Approve — **not instead of MLRO**
- Do not add config flags such as `strBypassMlroReview`, `skipMlroApproval`, or equivalent for production Nigeria STRs
- If a future non-Nigeria provider allows different policy, enforce bypass rules **per provider** in the provider adapter — never as a global org setting for NFIU

### What "D + C" means in code

**C (configurable triggers per org):**

- `strAutoEscalationScore: Int` — transaction score threshold (separate from customer `riskHighMax`)
- `strTriggerRuleIds: String[]` — rules tagged `strTrigger: true` in org config
- Either condition met → auto-escalate to STR draft

**D (workflow model):**

- High-risk → auto-create STR draft + notify MLRO
- Any analyst can manually initiate STR from any transaction or AML case (no rule required)
- MLRO reviews → approves/rejects → system submits to goAML on approval only

---

## End-to-End Workflow

```
┌──────────────────────────────────────────────────────────────────────────┐
│ 1. DETECTION (automated)                                                 │
│    Transaction ingested via Finchecker TM → rules linked → score set    │
│    Hook: after transaction create/update when rules.length > 0           │
└────────────────────────────┬─────────────────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ 2. ESCALATION CHECK (automated)                                          │
│    IF score >= org.strAutoEscalationScore                                │
│       OR any fired ruleId IN org.strTriggerRuleIds                       │
│    THEN → create StrReport (status: DRAFT)                               │
│    ELSE → no auto action (manual path still available)                   │
└────────────────────────────┬─────────────────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ 3. DRAFT GENERATION (automated)                                          │
│    • Pre-fill goAML XML from transaction + customer + org data           │
│    • Attach rule evidence, screening results if available                │
│    • Generate suspicion narrative draft (editable by MLRO)               │
│    • Set suspicionFormedAt = now()                                       │
│    • Status → PENDING_MLRO_REVIEW                                        │
│    • Notify MLRO (in-app URGENT + email)                                 │
│    • Optional: link/create AML case                                      │
└────────────────────────────┬─────────────────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ 4. MLRO REVIEW (human — mandatory, cannot be skipped in production)      │
│    MLRO opens STR detail → reviews evidence + narrative                  │
│    Actions:                                                              │
│      • APPROVE → status APPROVED → queue submission job                  │
│      • REJECT  → status REJECTED (reason required, audit logged)         │
│      • REQUEST_INFO → status PENDING_INFO → notify analyst               │
│    Non-MLRO users may DRAFT and EDIT narrative but cannot APPROVE/SUBMIT │
└────────────────────────────┬─────────────────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ 5. SUBMISSION (automated, post-approval only)                            │
│    BullMQ job: STR_SUBMISSION queue                                      │
│    • Guard: reject submission if MLRO approval missing (NFIU_GOAML)      │
│    • Load org NFIU credentials (encrypted at rest)                       │
│    • Build final XML (report wrapper + transaction nodes)                │
│    • Submit to NFIU goAML API/portal (production) OR validate only       │
│      (SANDBOX)                                                           │
│    • Status → SUBMITTING → SUBMITTED or FAILED                           │
│    • Store: nfiuReportId, submittedAt, response payload, XML file URL    │
└────────────────────────────┬─────────────────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ 6. AUDIT & DOWNLOAD (automated)                                          │
│    • Immutable StrReportEvent log (every status transition)              │
│    • ChangeLog entries on transaction + STR record                       │
│    • Download submitted XML from UI                                      │
│    • Filing deadline indicator (24h from suspicionFormedAt)              │
│    • Notify submitter + MLRO on success/failure                          │
└──────────────────────────────────────────────────────────────────────────┘

MANUAL PATH (always available):
  Transaction detail OR AML case → "File STR" button
  → same draft → MLRO review → submit flow (skip auto-escalation check)

SANDBOX PATH (testing only):
  Settings → Test NFIU credentials / Validate XML
  → builds XML, optionally calls NFIU sandbox
  → never marks production StrReport as SUBMITTED without MLRO approval
```

---

## STR Report Status Enum

```
DRAFT → PENDING_MLRO_REVIEW → APPROVED → SUBMITTING → SUBMITTED
                          ↘ REJECTED
                          ↘ PENDING_INFO → PENDING_MLRO_REVIEW
Any state → FAILED (on submission error, retryable)
```

Submission processor must validate: `APPROVED` status + `approvedByUserId` present + provider is not bypassing MLRO before calling NFIU production endpoint.

---

## Database Schema (Prisma additions)

### `StrReport`

- id, organizationId, transactionId (required), amlCaseId? (optional link)
- status (StrReportStatus enum)
- reportType: STR (future: SAR, CTR)
- provider: NFIU_GOAML (future: FINCEN, etc.)
- environment: PRODUCTION | SANDBOX
- suspicionFormedAt, submittedAt?, filingDeadlineAt (suspicionFormedAt + 24h)
- narrative: String (MLRO-editable suspicion description)
- xmlDraftUrl?, xmlSubmittedUrl? (DigitalOcean Spaces)
- nfiuReportId?, nfiuResponse?: Json
- triggeredBy: AUTO | MANUAL
- triggerReason?: Json (score, ruleIds, etc.)
- draftedByUserId?, approvedByUserId? (MLRO — required before submit), submittedByUserId?
- rejectionReason?
- errorMessage?
- createdAt, updatedAt

### `StrReportEvent` (immutable audit)

- id, strReportId, action, performedByUserId?, metadata Json, createdAt

### `OrganizationStrConfig` (or fields on Organization)

- strAutoEscalationScore Int @default(75)
- strTriggerRuleIds String[] (or join table StrTriggerRule)
- nfiuRentityId?, nfiuReportingUserCode?
- nfiuCredentialsEncrypted? (AES — use existing AesEncryptionService)
- mlroUserId? (designated MLRO per org)
- strAutoSubmitOnApproval Boolean @default(true) — submits after MLRO approves; does NOT skip MLRO
- nfiuEnvironment: PRODUCTION | SANDBOX @default(PRODUCTION)

**Do NOT add:** `mlroApprovalRequired` as org toggle for NFIU — enforce in provider/service layer.

### Permissions (add to permissions enum)

- VIEW_STR
- CREATE_STR (analysts — draft)
- EDIT_STR
- APPROVE_STR (MLRO only)
- SUBMIT_STR (MLRO only, or auto on approve)
- DOWNLOAD_STR

---

## Backend Module Structure

```
backend/src/modules/str-reports/
├── str-reports.module.ts
├── controllers/
│   └── str-reports.controller.ts
├── services/
│   ├── str-reports.service.ts          # CRUD, workflow transitions
│   ├── str-escalation.service.ts       # C+D trigger evaluation
│   └── str-notification.service.ts
├── providers/
│   ├── str-provider.interface.ts       # abstract submit(), validateCredentials()
│   └── nfiu-goaml/
│       ├── nfiu-goaml.provider.ts
│       ├── nfiu-xml.builder.ts         # maps Fraudspect → goAML 5.0.2 XML
│       └── nfiu-goaml.types.ts
├── processors/
│   └── str-submission.processor.ts     # BullMQ STR_SUBMISSION queue
├── dto/
├── events/
│   └── str-escalation.event.ts
├── listeners/
│   └── transaction-str.listener.ts     # OnEvent after transaction scored
└── constants/
```

### Provider interface (scalability)

```typescript
interface StrSubmissionProvider {
  readonly providerCode: 'NFIU_GOAML' | string;
  readonly requiresMlroApproval: boolean; // true for NFIU_GOAML — enforced in code
  buildXml(report: StrReport, context: StrBuildContext): string;
  validateCredentials(org: OrganizationStrConfig): Promise<boolean>;
  submit(xml: string, credentials: OrgCredentials, options: { environment: 'PRODUCTION' | 'SANDBOX' }): Promise<StrSubmissionResult>;
}
```

Register providers in a map; `StrReportsService` resolves by `report.provider`. `NfiuGoamlProvider.requiresMlroApproval` must always be `true`.

---

## Integration Points

### 1. Transaction ingestion hook

In `transactions.service.ts` after transaction + rules are persisted:

- Emit `TRANSACTION_SCORED` event with `{ transactionId, organizationId, score, ruleIds }`
- `TransactionStrListener` calls `StrEscalationService.evaluate()`

### 2. Do NOT auto-submit on rule fire alone

Rule fire is necessary but not sufficient. Escalation requires score threshold OR strTrigger-tagged rule.

### 3. Do NOT auto-submit without MLRO approval

Submission processor must throw/abort if `approvedByUserId` is null for NFIU production submissions.

### 4. AML case linkage

- Auto-escalation may optionally create/link `AmlCase` (type: Default, status: Open)
- Manual STR from AML case pre-fills customer + linked transactions

### 5. ChangeLog

Log every STR status change with `ChangeLogType.status_change` on both `StrReport` and `Transaction`.

### 6. Notifications

- MLRO: URGENT in-app + email on `PENDING_MLRO_REVIEW`
- Analyst: on REJECTED / PENDING_INFO
- MLRO + drafter: on SUBMITTED / FAILED
- Category: new `NotificationCategory.STR_REPORT` or use `AML_CASE`

---

## NFIU goAML XML Mapping

Reference sample `_Web_Report_ReportID_2619207-0-0.xml` (schema 5.0.2):

| goAML field | Fraudspect source |
|-------------|-------------------|
| schema_version | `5.0.2` |
| rentity_id | org.nfiuRentityId |
| submission_code | `E` (electronic) |
| report_code | `STR` (not CTR) |
| report_date | submission date |
| currency_code_local | `NGN` or org primary currency |
| reporting_user_code | org.nfiuReportingUserCode |
| transaction.* | Transaction + mappedFields + customer |
| report_indicators | rule names / typology codes |

Build two XML artifacts:

1. **Report wrapper** (`_Web_Report_*.xml` pattern)
2. **Transaction node(s)** (`TRN_V2_*.xml` pattern) — embed in report

Store both draft and final submitted XML in DO Spaces.

---

## API Endpoints

```
GET    /str-reports                     # paginated list (filters: status, date, transaction)
GET    /str-reports/:id                 # detail + events + evidence
POST   /str-reports                     # manual create from transactionId
PATCH  /str-reports/:id/narrative       # edit narrative (drafter + MLRO)
POST   /str-reports/:id/submit-for-review  # analyst submits draft to MLRO
POST   /str-reports/:id/approve         # MLRO only → queues submission
POST   /str-reports/:id/reject          # MLRO only → reason required
POST   /str-reports/:id/retry           # retry failed submission (MLRO approved only)
GET    /str-reports/:id/download-xml    # download submitted/draft XML
GET    /str-reports/:id/events          # audit trail

# Org config (org admin / MLRO)
GET    /str-reports/config
PUT    /str-reports/config              # escalation threshold, trigger rules, NFIU creds, mlroUserId
POST   /str-reports/config/test-credentials  # SANDBOX validate only — no production submit
POST   /str-reports/config/validate-xml      # dry-run XML build without submit
```

Auth: `@RequirePermissions` on all endpoints. `APPROVE_STR` / `SUBMIT_STR` restricted to MLRO role or `org.mlroUserId`.

There is **no** endpoint to submit STR to goAML without MLRO approval.

---

## Frontend (org dashboard)

### New routes

- `/str-reports` — STR list (table: ref, customer, status, deadline, MLRO, actions)
- `/str-reports/:id` — STR detail (narrative editor, evidence panel, MLRO approve/reject, XML download, event log)
- `/settings/str-reporting` — org config (threshold, trigger rules, NFIU credentials, MLRO designation, sandbox test)

### Entry points

- Transaction detail → **File STR** button (CREATE_STR permission)
- AML case detail → **File STR** button
- Header notification → MLRO review queue link
- Side nav: under **Monitoring → Transactions → STR Reports**

### STR detail UI sections

1. Status chip + 24h deadline countdown
2. Transaction + customer summary (read-only)
3. Triggered rules + score evidence
4. Narrative textarea (editable until approved)
5. MLRO action bar (approve / reject / request info) — visible only to MLRO
6. Event timeline (immutable audit)
7. Download XML button

Do **not** expose a "Submit without review" or "Skip MLRO" control in the UI.

Follow existing Fraudspect UI conventions: Tailwind, TanStandardTable, LoadingButton, nested Paper layout, RTK Query API injection, permission restrictors.

---

## BullMQ

Add queue constant: `STR_SUBMISSION`

Job: `SUBMIT_STR_REPORT` with `{ strReportId }`

Processor:

1. Load report
2. Assert `status === APPROVED` and `approvedByUserId` is set (NFIU production)
3. Build XML
4. Call NfiuGoamlProvider
5. Update status
6. Notify

Retry: 3 attempts with exponential backoff; on final failure → status FAILED + notify MLRO

---

## Security

- NFIU credentials encrypted at rest (AesEncryptionService)
- Never return decrypted credentials in API responses
- MLRO approval logged with userId + timestamp + IP (if available)
- Submitted XML immutable after SUBMITTED (edits create amendment/revision record, not overwrite)
- Tenant-scoped via prisma.tenancy
- Submission processor rejects production submit without MLRO approval even if called directly

---

## Testing

- Unit: StrEscalationService (score threshold, rule trigger, no double-escalation)
- Unit: NfiuXmlBuilder (output matches goAML 5.0.2 schema)
- Unit: workflow state machine (invalid transitions rejected)
- Unit: submission processor rejects missing MLRO approval for NFIU production
- Integration: transaction scored → STR draft created → MLRO approve → mock NFIU submit
- Integration: submission attempt without MLRO approval → fails with 403/422
- E2E: manual STR from transaction detail
- E2E: sandbox credential test does not create production SUBMITTED record without MLRO

---

## Out of Scope (v1)

- **MLRO bypass / unattended auto-submit to goAML in production**
- CTR / ITR reporting (separate report_code; same provider architecture)
- Multi-transaction STR bundles (v1: one STR per transaction; v2: batch)
- FinCEN / other country providers (interface only, no implementation)
- Org-configurable skip of MLRO for Nigeria NFIU

---

## Deliverables Checklist

- [ ] Prisma migration + models
- [ ] str-reports backend module (service, provider, processor, listener)
- [ ] Hook into transaction scoring pipeline
- [ ] NFIU goAML XML builder from sample templates
- [ ] Permissions + MLRO gate (hardcoded for NFIU, not toggleable)
- [ ] Submission guard: no production submit without MLRO approval
- [ ] BullMQ submission with retry
- [ ] API endpoints with @Response() wrapper
- [ ] Frontend: list, detail, settings, entry points on transaction/AML case
- [ ] Notifications (MLRO queue, submission result)
- [ ] Audit log + XML download
- [ ] 24-hour filing deadline tracking
- [ ] SANDBOX credential/XML validation (test only, no MLRO bypass for production)

Build incrementally: schema → escalation listener → draft XML → MLRO workflow API → submission processor (with MLRO guard) → frontend list/detail → settings → notifications.
