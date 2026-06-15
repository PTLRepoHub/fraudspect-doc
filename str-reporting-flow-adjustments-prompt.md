# STR Flow Adjustments — Implementation Prompt

Copy everything below this line into Claude Code. This is a **targeted patch** to the existing STR module — do **not** rebuild from scratch.

---

## Context

The STR reporting module is already implemented under:

```
backend/src/modules/str-reports/
frontend/src/modules/str-reports/
```

Core pieces already working:

- D + C auto-escalation (`StrEscalationService` + `TransactionStrListener`)
- Manual STR creation (`StrReportsService.create`)
- MLRO approve/reject/request-info workflow
- MLRO submission guard in `StrSubmissionProcessor` (`requiresMlroApproval: true`)
- Auto-submit after MLRO approval (`strAutoSubmitOnApproval`)
- NFIU goAML XML builder + field mappings
- Frontend: dashboard, detail, config pages

**Problem:** Auto-escalation skips critical steps that the manual path requires. MLRO gets empty STRs with no notification. CTR/TTR must not be mixed into STR escalation yet.

---

## Objective

Align auto and manual STR paths into one consistent workflow:

```text
DRAFT (+ auto-generated narrative)
  → submitForReview (narrative required)
  → PENDING_MLRO_REVIEW (+ MLRO notified)
  → MLRO approve
  → auto-submit to NFIU (if strAutoSubmitOnApproval)
  → SUBMITTED
```

**Do NOT** add production MLRO bypass. **Do NOT** implement CTR/TTR in this task.

---

## LOCKED decisions

| Rule | Requirement |
|------|-------------|
| Auto-escalation initial status | `DRAFT` (not `PENDING_MLRO_REVIEW`) |
| Narrative on auto-escalate | Auto-generated draft text required |
| MLRO notification | On auto-escalate AND on submitForReview |
| MLRO approval before NFIU | Mandatory — keep existing processor guard |
| Production MLRO bypass | Forbidden — no new flags or endpoints |
| CTR / TTR / FTR | Out of scope — separate future module |

---

## Task 1 — Fix `StrEscalationService` (backend)

**File:** `backend/src/modules/str-reports/services/str-escalation.service.ts`

### 1a. Change auto-escalation status

Replace:

```typescript
status: StrReportStatus.PENDING_MLRO_REVIEW,
```

With:

```typescript
status: StrReportStatus.DRAFT,
reportType: StrReportType.STR, // explicit — never CTR from rule escalation
```

### 1b. Auto-generate narrative on escalation

Create a helper (new file or private method):

**File:** `backend/src/modules/str-reports/helpers/str-narrative.builder.ts`

```typescript
export function buildAutoStrNarrative(params: {
  transactionReferenceId: string;
  score: number;
  triggerReason: string;
  ruleNames: string[];
  customerName?: string;
  amount?: number;
  transactionDate?: Date;
}): string {
  const rules =
    params.ruleNames.length > 0
      ? params.ruleNames.join(', ')
      : 'No specific rule names available';

  return [
    `Suspicious transaction activity detected on transaction ${params.transactionReferenceId}.`,
    params.customerName ? `Customer: ${params.customerName}.` : null,
    params.amount != null ? `Amount: ${params.amount}.` : null,
    `Risk score: ${params.score}.`,
    `Trigger: ${params.triggerReason}.`,
    `Rules triggered: ${rules}.`,
    '',
    'This narrative is auto-generated and must be reviewed and edited by compliance before MLRO approval and NFIU submission.',
  ]
    .filter(Boolean)
    .join('\n');
}
```

In `evaluate()`:

1. Load transaction with `referenceId`, `amount`, `createdAt`, customer name
2. Load rule names for matched `ruleIds`
3. Set `narrative` to output of `buildAutoStrNarrative()`
4. Keep `triggerReason` as the short machine reason (score/rule id)

### 1c. Wire MLRO notification on auto-escalate

Inject `NotificationService` into `StrEscalationService` (or extract shared notifier — see Task 2).

After creating the STR record, call the same notification logic as `StrReportsService.notifyMlro()`:

- Title: `STR Draft Created — Review Required`
- Body: include transaction reference, score, filing deadline
- Priority: `URGENT`
- Category: `STR_REPORT`
- actionUrl: `/str-reports/{id}`

Remove the empty comment block at lines 83–87.

### 1d. Add changelog entry on auto-escalate

Inject `ChangelogService` and create a changelog entry:

- tableName: `StrReport`
- type: `create`
- name: `STR Auto-Escalated`
- description: `STR draft auto-created for transaction #{referenceId}`

### 1e. Optional (recommended): pre-generate XML draft

After creating DRAFT, optionally call `NfiuGoamlProvider.buildXml()` with current data, upload to DO Spaces, set `xmlDraftUrl`.

If too heavy for escalation path, skip — MLRO can still download XML after approve. **Do not block escalation on XML failure.**

---

## Task 2 — Extract shared MLRO notifier (backend)

**Problem:** `notifyMlro()` is private on `StrReportsService`. Escalation service needs the same logic.

**Option A (preferred):** Create `StrNotificationService`:

```
backend/src/modules/str-reports/services/str-notification.service.ts
```

Methods:

- `notifyMlroDraftCreated(organizationId, strReportId, report, context: 'AUTO_ESCALATED' | 'SUBMITTED_FOR_REVIEW')`
- `notifyDrafter(...)` — move from StrReportsService

Register in `str-reports.module.ts`. Use from both `StrEscalationService` and `StrReportsService`.

Update `StrReportsService.notifyMlro` / `notifyDrafter` to delegate to `StrNotificationService`.

---

## Task 3 — Fix rejection reason field (backend)

**File:** `backend/src/modules/str-reports/services/str-reports.service.ts`

**Problem:** `reject()` overwrites `triggerReason` with rejection reason, destroying the original auto-trigger metadata.

### 3a. Prisma migration

Add to `StrReport` model:

```prisma
rejectionReason String? @db.Text
```

Keep `triggerReason` for escalation metadata only.

### 3b. Update `reject()`

```typescript
data: {
  status: StrReportStatus.REJECTED,
  rejectionReason: dto.reason,  // not triggerReason
  ...
}
```

### 3c. Update frontend types

**File:** `frontend/src/types/str-report.ts` — add `rejectionReason?: string | null`

Display rejection reason in `StrReportDetails.tsx` when status is `REJECTED`.

---

## Task 4 — Tighten `submitForReview` validation (backend)

**File:** `backend/src/modules/str-reports/services/str-reports.service.ts`

`submitForReview()` already requires narrative. Ensure it also:

1. Only allows transition from `DRAFT` or `PENDING_INFO` (not from `REJECTED` without recreate)
2. Validates narrative is non-empty after trim
3. Validates minimum length (e.g. 50 chars) with clear error message
4. Blocks submit if `reportType !== STR` when CTR module doesn't exist yet

Update `STR_VALID_TRANSITIONS` if needed:

```typescript
DRAFT: ['PENDING_MLRO_REVIEW'],
PENDING_INFO: ['PENDING_MLRO_REVIEW'],
// REJECTED and SUBMITTED have no forward transitions without new STR
```

---

## Task 5 — Strengthen MLRO access check (backend)

**File:** `backend/src/modules/str-reports/services/str-reports.service.ts`

Current `assertMlroAccess()` only checks `mlroUserId` if set. If `mlroUserId` is null, anyone might approve.

Update to:

```typescript
private async assertMlroAccess(user: User) {
  const config = await this.rawPrisma.organizationStrConfig.findUnique({
    where: { organizationId: user.organizationId },
  });

  // If MLRO is designated, only that user can approve
  if (config?.mlroUserId) {
    if (config.mlroUserId !== user.id) {
      throw new ForbiddenException('Only the designated MLRO can perform this action');
    }
    return;
  }

  // Fallback: user must have APPROVE_STR permission (checked at controller via @RequirePermissions)
  // Optionally verify permission in service via PermissionsGuard metadata or role check
}
```

Also block `approve()` if `mlroUserId` is not configured — return `400` with message: "Designate an MLRO in STR settings before approving reports."

---

## Task 6 — Auto-escalation guard improvements (backend)

**File:** `backend/src/modules/str-reports/services/str-escalation.service.ts`

### 6a. Require org STR config before escalating

If no `OrganizationStrConfig` exists, log and return (current behaviour). Consider auto-creating default config on org creation — out of scope unless trivial.

### 6b. Require MLRO designated before auto-escalate

If `mlroUserId` is null:

- Still create DRAFT (don't lose the alert)
- Log warning: `MLRO not configured — STR draft created but no reviewer assigned`
- Send notification to org admins OR skip MLRO notify

### 6c. Deduplication

Current dedup excludes `REJECTED` and `FAILED`. Also exclude `SUBMITTED` (already implied). Allow new STR if previous was `REJECTED` — confirm product intent:

- If previous STR was REJECTED and same transaction re-triggers → create new DRAFT with event note linking prior STR id

---

## Task 7 — Frontend adjustments

### 7a. `StrReportDetails.tsx`

For status `DRAFT`:

- Show banner: **"Auto-escalated — review narrative and submit for MLRO review"** when `triggeredBy === AUTO`
- Pre-fill narrative editor with `report.narrative` on load
- Show **Submit for MLRO Review** button (CREATE_STR / EDIT_STR permission)
- Hide MLRO Approve/Reject until `PENDING_MLRO_REVIEW`

For status `PENDING_MLRO_REVIEW`:

- Show MLRO action bar (APPROVE_STR)
- Narrative read-only unless MLRO is also editor (keep editable for MLRO — current `assertEditableStatus` allows it)

Add **24-hour deadline countdown**:

```typescript
const hoursLeft = dfns.differenceInHours(new Date(report.filingDeadlineAt), new Date());
// Show red chip if < 4 hours
```

Show `rejectionReason` when `REJECTED`.

Show `triggerReason` separately as "Escalation trigger" (read-only metadata).

### 7b. `StrReportDashboard.tsx`

Add default tab/filter: **Pending MLRO Review** for MLRO users.

Columns: reference, customer, status, triggeredBy, deadline, createdAt.

### 7c. `StrReportConfig.tsx`

- Make `mlroUserId` selection **required** with validation warning if empty
- Helper text: "MLRO must approve all STRs before submission to NFIU"
- Show configured `strAutoEscalationScore` and trigger rules clearly

### 7d. Transaction detail entry point

**File:** `frontend/src/modules/transaction/` (detail page)

Add **File STR** button → navigates to create STR or opens dialog → `createStrReport` mutation.

Add link if STR already exists for transaction.

### 7e. AML case entry point

**File:** `frontend/src/modules/case/` (case detail)

Add **File STR** button with `amlCaseId` pre-filled.

---

## Task 8 — Tests (backend)

**File:** `backend/src/modules/str-reports/processors/str-submission.processor.spec.ts` (extend)

Add/update tests:

### `str-escalation.service.spec.ts` (new)

| Test | Expect |
|------|--------|
| Score threshold exceeded | Creates STR with status `DRAFT`, narrative populated |
| Trigger rule matched | Creates STR with status `DRAFT` |
| Neither threshold nor rule | No STR created |
| Duplicate active STR | No second STR |
| MLRO configured | Notification sent |
| Auto-escalate | Does NOT set `PENDING_MLRO_REVIEW` |

### `str-reports.service.spec.ts` (new or extend)

| Test | Expect |
|------|--------|
| submitForReview without narrative | 400 |
| submitForReview from DRAFT | → PENDING_MLRO_REVIEW, MLRO notified |
| approve without mlroUserId configured | 400 |
| approve by non-MLRO when mlroUserId set | 403 |
| reject | sets `rejectionReason`, preserves `triggerReason` |

### Existing processor spec

Keep tests for MLRO guard — submission blocked without approval.

---

## Task 9 — Update build prompt doc (documentation only)

**File:** `doc/str-reporting-module-build-prompt.md`

Update the workflow diagram:

- Auto-escalation → `DRAFT` (not `PENDING_MLRO_REVIEW`)
- Add note: CTR/TTR is separate module, not part of STR escalation

---

## Explicitly out of scope (do not implement)

- MLRO bypass / unattended production submit
- CTR / TTR / FTR threshold detection
- `strBypassMlroReview` or any org toggle to skip MLRO
- Auto-submit on escalation without MLRO approve
- PEP Transaction Report (new NFIU type)

---

## Implementation order

1. Prisma: add `rejectionReason` migration
2. `str-narrative.builder.ts` helper
3. `StrNotificationService` extract
4. Fix `StrEscalationService` (DRAFT + narrative + notify + changelog)
5. Fix `reject()` field + `assertMlroAccess` + `submitForReview` validation
6. Frontend: detail page DRAFT UX + deadline + rejection reason
7. Frontend: config MLRO required warning
8. Frontend: transaction/AML entry points (if not already wired)
9. Tests
10. Update doc

---

## Acceptance criteria

- [ ] Auto-escalated STRs are created in `DRAFT` with auto-generated narrative
- [ ] MLRO receives URGENT notification on auto-escalate
- [ ] Analyst must click "Submit for MLRO Review" (narrative required) before MLRO can approve
- [ ] MLRO approve → auto-submit to NFIU (existing flow)
- [ ] No production path submits to NFIU without `APPROVED` + `approvedByUserId`
- [ ] Rejection reason stored separately from trigger reason
- [ ] MLRO must be designated in config before approval is allowed
- [ ] Frontend shows deadline countdown and auto-escalated banner on DRAFT STRs
- [ ] All new tests pass: `yarn test -- --testPathPattern=str-report`

---

## Reference: current auto-escalation bug

```61:77:backend/src/modules/str-reports/services/str-escalation.service.ts
      await this.prisma.strReport.create({
        data: {
          organizationId,
          transactionId,
          triggeredBy: StrReportTriggeredBy.AUTO,
          triggerReason,
          status: StrReportStatus.PENDING_MLRO_REVIEW,  // ← CHANGE TO DRAFT
          suspicionFormedAt,
          filingDeadlineAt,
          // ← ADD narrative
          events: { ... },
        },
      });
      // ← WIRE MLRO NOTIFICATION (currently empty)
```

---

## Reference: MLRO guard (keep unchanged)

```48:50:backend/src/modules/str-reports/processors/str-submission.processor.ts
    if (this.nfiuProvider.requiresMlroApproval) {
      await this.assertMlroApproval(strReportId);
    }
```

Do not weaken this guard.
