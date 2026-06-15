Transaction monitoring & regulatory data — end-to-end scope (v2 architecture + migration)
This scopes the org-scoped transaction field catalog, org-scoped rules & integrations, STR alignment, optional amount, new-org provisioning, and backward-compatible migration from the current model.

1. Goals & non-goals
Goals
One org-owned transaction field catalog — same pattern as CustomerFieldDefinition.
Integrations are adapters only — ModuleApiRequestFieldDefinition wires catalog → Finchecker/API.
STR maps to catalog fields — not ModuleApiRequestFieldDefinition.
Rules org-scoped — Rule.organizationId required; unique (organizationId, externalId).
TRANSACTION ModuleApi org-only — no global production TM services.
New orgs auto-provisioned — fields, TM API, workflow, STR config + default mappings.
Optional amount — system field in catalog; dual-write to nullable Transaction.amount.
Migrate existing tenants without breaking ingest, STR, or dashboards.
Non-goals (this project)
CTR / FTR escalation services (consume same catalog later).
Field-level encryption (schema sensitivity only; encrypt in follow-up).
SAR / AIF / PEP monthly reports.
Renaming API path /str-reports → /regulatory-reports.
Removing Transaction.amount column (keep as denormalized cache).
2. Target architecture
Ingest API
Per Organization
Per Transaction
Finchecker / TM provider
goAML XML builder
mappedFields + optional amount
TransactionFieldDefinition
CustomerFieldDefinition
Rule
ModuleApi
ModuleApiRequestFieldDefinition
ModuleApiWorkflow
StrFieldMapping
OrganizationStrConfig
Transaction
TransactionMappedField
TransactionRule
Layer responsibilities
Layer	Owns	Does not own
TransactionFieldDefinition
Semantic field (amount, beneficiary_account)
Finchecker JSON shape
ModuleApiRequestFieldDefinition
apiRequestAliases, per-integration required
Canonical meaning
TransactionMappedField
Stored values
Integration identity (optional audit only)
Rule
Org rule catalog
Global shared rules
StrFieldMapping
goAML → customer/transaction field def id
Per-transaction rows
3. Schema changes
3.1 New: TransactionFieldDefinition
enum FieldSensitivityEnum { NONE PII FINANCIAL }
model TransactionFieldDefinition {
  id             Int                              @id @default(autoincrement())
  organizationId String
  name           String
  aliases        String
  type           TransactionFieldDefinitionTypeEnum
  isRequired     Boolean                          @default(false)
  isSystem       Boolean                          @default(false)
  sensitivity    FieldSensitivityEnum             @default(NONE)
  validation     Json?
  createdAt      DateTime                         @default(now())
  updatedAt      DateTime                         @updatedAt
  organization   Organization                     @relation(...)
  mappedFields   TransactionMappedField[]
  strFieldMappings StrFieldMapping[]
  integrationMappings ModuleApiRequestFieldDefinition[]
  @@unique([organizationId, aliases])
  @@index([organizationId])
}
3.2 TransactionMappedField — repoint FK
 TransactionFieldDefinitionId Int
 TransactionFieldDefinition   ModuleApiRequestFieldDefinition @relation(...)
 transactionFieldDefinitionId Int
 transactionFieldDefinition   TransactionFieldDefinition @relation(...)
 transactionId String
 value       String
 organizationId String?  // keep; validate === transaction.organizationId
 moduleApiId Int?         // drop unless reporting needs "ingested via"
Transition: keep old column nullable during migration; dual FK period optional.

3.3 ModuleApiRequestFieldDefinition — link to catalog
 transactionFieldDefinitionId Int
 transactionFieldDefinition   TransactionFieldDefinition @relation(...)
 moduleApiId            Int
 apiRequestAliases      String?
 required               Boolean
 aliases                String   // deprecate as canonical key; keep for BC read
 aliases                String?  // optional display; canonical = catalog.aliases
@@unique([moduleApiId, transactionFieldDefinitionId])
3.4 Rule — org-scoped
 organizationId String
 externalId     String?
 @@index([externalId])
 @@unique([organizationId, externalId])
 @@index([organizationId])
Migration: nullable organizationId → backfill → NOT NULL.

3.5 StrFieldMapping — fix FK target
 transactionFieldDefinition ModuleApiRequestFieldDefinition?
 transactionFieldDefinition TransactionFieldDefinition?
Column name can stay transactionFieldDefinitionId; target table changes.

3.6 ModuleApi — TRANSACTION must be org-owned
Enforced in app + migration (clone globals to orgs first).

3.7 Transaction — uniqueness fix
 @@unique([moduleApiId, referenceId])
 @@unique([organizationId, moduleApiId, referenceId])
Transaction.amount → remain, nullable.

3.8 Org feature flags (new table or JSON on Organization)
model OrganizationComplianceFeatures {
  organizationId              String @id
  transactionFieldsV2         Boolean @default(false)
  transactionMonitoringOrgOnly Boolean @default(false)
  provisionedAt               DateTime?
  provisionTemplateVersion    Int @default(1)
}
3.9 Migration map tables (temporary, keep until Phase 4)
model ComplianceMigrationMap {
  id            String @id @default(uuid())
  organizationId String
  mapType       String  // REQUEST_FIELD_DEF | RULE | PROCESS_ID | STR_MAPPING
  legacyId      String
  newId         String
  createdAt     DateTime @default(now())
  @@unique([organizationId, mapType, legacyId])
}
4. Seed templates (platform-level, not tenant data)
File: backend/src/modules/compliance/seeders/compliance-template.seeder.ts

4.1 Customer field template (cbn-default)
first_name, last_name, gender, birthdate, id_number, phone, address, city, entity_name, incorporation_number, business_description — all isSystem: true.

4.2 Transaction field template
aliases	type	isSystem	isRequired
amount
number
true
false
currency
string
true
false
description
string
true
false
location
string
true
false
transmode
string
true
false
beneficiary_name
string
true
false
beneficiary_account
string
true
false
originator_account
string
true
false
to_country
string
true
false
channel
string
true
false
4.3 ModuleApi template (per org clone)
serviceName: fincheckerTransactionsService
serviceMethod: handleTransaction
serviceIdentifier: tm-{orgSlug} or tm-{orgId-prefix}
Request defs: one per transaction field template + FINCHECKER_WIRE_MAP[alias] → apiRequestAliases
required on request def: only where Finchecker requires (amount optional)
4.4 Default STR mappings template
Map GOAML_FIELD.* → customer/transaction field def ids (by alias lookup after seed).

Add to constants:

GOAML_FIELD.TXN_AMOUNT_LOCAL = 'transaction.amount_local'
4.5 Default OrganizationStrConfig
strAutoEscalationScore: 75
strAutoLinkAmlCase: true
No MLRO / NFIU creds (admin/org setup)
5. Backend implementation
5.1 New module: compliance (or extend str-reports + transactions)
Service	Responsibility
OrgComplianceProvisionerService
Idempotent org bootstrap
TransactionFieldDefinitionsService
CRUD (org read, admin write)
TransactionFieldResolverService
Single BC + v2 resolver
TransactionIngestNormalizerService
Merge top-level amount, validate aliases, dual-write
ComplianceMigrationService
Run per-org migration steps
5.2 TransactionFieldResolverService (central — DRY)
// Pseudocode API
resolveCatalogFields(orgId): TransactionFieldDefinition[]
resolveIngestPayload(orgId, moduleApiId, mappedFields, topLevelAmount?): NormalizedField[]
toFincheckerPayload(moduleApiId, normalized): Record<string, unknown>
resolveMappedFieldStorage(orgId, normalized): { transactionFieldDefinitionId, value }[]
readAmount(transaction): number | null  // mapped field → column fallback
resolveStrTransactionFieldId(orgId, mappingRow): number | null  // v2 id or legacy map
All ingest, STR XML, reports call this — no scattered if (v2).

5.3 Ingest changes (TransactionsService.process / rescore)
Flow:

Load org + active workflow → org ModuleApi.
TransactionIngestNormalizer validates canonical aliases against org catalog.
Build Finchecker payload via request defs (apiRequestAliases).
Call Finchecker.
RulesService.findManyOrCreate(rules, organizationId).
Create Transaction + TransactionMappedField (v2 FK) + dual-write amount.
Emit TRANSACTION_SCORED_EVENT.
Duplicate check:

where: { organizationId, referenceId, moduleApi: { serviceIdentifier: processId } }
Legacy shim (flag off): accept integration aliases; map via request def → catalog if linked; else old path.

5.4 RulesService changes
All reads/writes include organizationId.
findManyOrCreate(dtos, organizationId) upsert @@unique([organizationId, externalId]).
findAllForOrg(user) → where: { organizationId, status: ACTIVE }.
Admin global CRUD → deprecated or super-admin cross-org only.
StrEscalationService: validate trigger ruleId belongs to org.
5.5 ModulesApiService changes
findAll (TRANSACTION): remove global OR; org ModuleApi only when transactionMonitoringOrgOnly.
handleTransactionApiService: require moduleApi.organizationId === organizationId.
LegacyProcessIdMap lookup for old processId during BC.
5.6 STR module changes
Area	Change
getAvailableFields
transactionFields from TransactionFieldDefinition, not moduleApis
updateFieldMappings
FK → TransactionFieldDefinition
nfiu-xml.builder
amount_local via resolveExplicitOrAlias; include transactionFieldDefinition in includes
ensureStrConfig
Called from provisioner + escalation if missing
StrEscalationService
Remove silent if (!strConfig) return → ensureStrConfig first
5.7 Field definition APIs
Endpoint	Auth	Notes
GET /transactions/field-definitions
Org user
Tenancy; returns catalog
GET/POST/PUT/DELETE /transactions/field-definitions/admin
Admin
Mirror customer admin
GET /customers/field-definitions
Existing
Unchanged
5.8 Reports & dashboard
Dynamic filters: use catalog field ids/types.
Export: resolve labels from TransactionFieldDefinition.name.
_sum amount: keep Transaction.amount until Phase 4 optional removal.
5.9 Hooks — org creation
OrganizationService.create()  → provisioner.provision(orgId)
AuthService.signup()          → provisioner.provision(orgId)   // fix gap
Provisioner steps (idempotent): classifiers (or delegate), customer fields, transaction fields, ModuleApi+workflow, OrganizationModule, ensureStrConfig, default STR mappings, set transactionFieldsV2: true for new orgs only.

6. Admin app
Screen	Work
Org detail → Transaction fields
CRUD TransactionFieldDefinition (mirror OrgCustomers field drawer)
Org detail → Compliance provision
Button: "Provision / re-run template" (admin only)
Transaction services
organizationId required; remove global scope for TRANSACTION
Service form — request fields
Pick from org transaction catalog + set apiRequestAliases
Migration status
Show provisionedAt, template version, v2 flag
7. Frontend (org app)
Area	Work
Settings → Transaction fields
New page (mirror customer fields)
Workflow config
Map integration fields to catalog (dropdown), not free-text aliases
STR field mapping
Transaction dropdown from catalog API (remove moduleApiName grouping or show as info only)
Transaction dashboard
Dynamic filters from catalog; amount filter reads column or catalog
API types
Normalize mappedFields[].field: { id, aliases, name } in responses
Deploy order: backend Phase 2 (dual-read APIs) → frontend → backend Phase 4 (drop shims).

8. API contract
8.1 Ingest (canonical — v2)
POST /transactions/:processId/process
{
  "referenceId": "TX-001",
  "customerId": "CUST-123",
  "mappedFields": {
    "amount": 50000,
    "channel": "mobile",
    "beneficiary_account": "0123456789"
  }
}
8.2 Legacy shim (supported until deprecation)
{
  "referenceId": "TX-001",
  "customerId": "CUST-123",
  "amount": 50000,
  "mappedFields": { "beneficiary_account": "..." }
}
Top-level amount merged into mappedFields.amount.
Integration alias keys accepted when transactionFieldsV2 === false or unmapped legacy org.
8.3 processId
New orgs: org-specific serviceIdentifier.
Legacy orgs: old id resolves via ComplianceMigrationMap (PROCESS_ID).
8.4 Response normalization (stable for UI)
"mappedFields": [{
  "value": "50000",
  "field": { "id": 42, "aliases": "amount", "name": "Amount" }
}]
9. Migration flow (existing organizations)
Overview
Phase 0: Deploy additive schema + resolver + flags
Phase 1: Deploy dual-write code
Phase 2: Per-org migration scripts
Phase 3: Flip org flags
Phase 4: Remove legacy paths
Phase 0 — Deploy (no behavior change)
Run Prisma migration: new tables/columns (all nullable/additive).
Deploy backend with resolver; flags default false for existing orgs.
Deploy admin field-def CRUD (optional early).
No data migration yet.
Rollback: revert deploy; new columns unused.

Phase 1 — Dual-write / dual-read code live
Ingest: when catalog exists for org, dual-write mapped fields (old FK + new FK if both present).
STR: read v2 mapping id if set; else legacy map table; else alias fallback.
/rules/org: union org + global rules for legacy orgs.
Log legacy_ingest_path, legacy_str_mapping_resolve.
Rollback: flag off; old path only.

Phase 2 — Per-org migration script
CLI: yarn compliance:migrate-org --orgId=<uuid> [--dry-run]

Idempotent steps in order:

Step 2.1 — Seed catalog (if missing)
Create TransactionFieldDefinition + CustomerFieldDefinition from template.
Record provisionTemplateVersion.
Step 2.2 — Clone ModuleApi (if org uses global TM)
For each global TRANSACTION ModuleApi the org has workflows/transactions against:

Create org ModuleApi copy (organizationId set, new serviceIdentifier).
Copy moduleApiRequestDefinitions + link transactionFieldDefinitionId by alias match.
Copy moduleApiConfigFieldDefinitions if any.
Create/update ModuleApiWorkflow pointing to new moduleApiId.
Insert ComplianceMigrationMap PROCESS_ID: oldServiceIdentifier → new.
Step 2.3 — Link existing request defs (if not cloning)
If org already has org ModuleApi:

For each ModuleApiRequestFieldDefinition, set transactionFieldDefinitionId by matching aliases to catalog.
Step 2.4 — Remap TransactionMappedField
For each row on org transactions:

Resolve legacy TransactionFieldDefinitionId (request def).
Find catalog field via link or alias.
Set transactionFieldDefinitionId (new FK).
If amount def exists and Transaction.amount set, ensure mapped row exists (backfill).
Dry-run output: counts created/updated/skipped/unresolved.

Step 2.5 — Remap StrFieldMapping
For each StrFieldMapping with transactionFieldDefinitionId pointing at request def:

Resolve catalog id (direct link or migration map).
Update FK to TransactionFieldDefinition.
Store map STR_MAPPING: legacyId → newId.
Step 2.6 — Migrate rules
For each global Rule referenced by org TransactionRule or StrTriggerRule:

upsert org rule { organizationId, externalId, name, score, status }.
Map ComplianceMigrationMap RULE: globalId → orgRuleId.
Update TransactionRule.ruleId + StrTriggerRule.ruleId.
Step 2.7 — Fix transaction uniqueness
Verify no collisions on (organizationId, moduleApiId, referenceId) before applying unique constraint (separate migration if collisions exist — resolve manually).
Step 2.8 — Verification gate
Automated checks must pass before flip:

Check	Pass criteria
Mapped fields
0 rows with null new FK for org txns
STR mappings
0 transaction-field mappings pointing at request defs
Rules
0 org transaction rules pointing at global-only ids
Sample ingest
Dry-run normalizer on last 10 txns
Sample STR
XML preview on 1 report; amount_local resolves when amount present
Process id
New serviceIdentifier documented for client
Step 2.9 — Flip org flags
transactionFieldsV2 = true
transactionMonitoringOrgOnly = true
provisionedAt = now()
Notify customer success if processId changed.

Phase 3 — Pilot → rollout
Pilot: 1–2 internal/low-traffic orgs.
Wave 2: Orgs with STR enabled.
Wave 3: All remaining orgs.
Monitor legacy path metrics → target <1% for 30 days.
Rollback per org: set flags false; data remains dual-linked; clients use LegacyProcessIdMap reverse.

Phase 4 — Contract (breaking cleanup)
After all orgs migrated + deprecation window:

Remove legacy ingest alias path.
Drop old TransactionMappedField.TransactionFieldDefinitionId column.
Rule.organizationId NOT NULL; delete orphaned global rules.
Delete global TRANSACTION ModuleApi rows (or mark INACTIVE).
Remove ComplianceMigrationMap (archive export first).
Optional: stop dual-writing Transaction.amount.
10. Backward compatibility summary
Concern	Strategy
Ingest payload
Top-level amount + integration aliases during shim
processId
ComplianceMigrationMap
STR mapping ids
Remap + resolver fallback
Rules filter
Union → org-only
API responses
Normalized field object
New orgs
v2 only from day one
Old orgs
Migrate then flip flag
11. Security
Item	Action
Tenant isolation
Tenancy on reads; FK validation fieldDef.organizationId === txn.organizationId on write
process() duplicate check
Include organizationId
Rules
No cross-org rule ids in triggers
serviceIdentifier
Treat as org secret in docs; per-org values
Field sensitivity
Schema now; encrypt at rest in follow-up
NFIU credentials
Unchanged (already encrypted)
Audit
Changelog on field def + mapping + provision events
12. Testing
Unit
TransactionFieldResolverService — canonical + legacy aliases, amount merge
TransactionIngestNormalizer — optional amount, required per integration
RulesService.findManyOrCreate — same externalId, different orgs → different rows
nfiu-xml.builder — amount_local from mapping; explicit mapping no alias fallthrough
Provisioner idempotency
Integration
Full process() v2 org with mocked Finchecker
STR preview post-migration
Cross-org isolation (org A fields not visible to org B)
Migration
Fixture DB pre-migration → script → invariant checks
Dry-run produces stable report
Re-run idempotent
E2E (manual / Playwright later)
New org signup → fields exist → workflow active → ingest → STR mapping dropdown populated
yarn test -- --testPathPattern=compliance|transaction-field|str-report|rules
13. Delivery phases & effort
Phase	Deliverable	Est.
A
Schema + templates + provisioner + admin field CRUD
5–7 d
B
Resolver + ingest dual-write + rules org scope
6–8 d
C
STR repoint + amount_local + frontend settings/mapping
5–7 d
D
Migration CLI + maps + pilot runbook
5–7 d
E
Org ModuleApi clone + processId comms + flip waves
3–5 d
F
Legacy removal + docs
2–3 d
Total: ~26–37 dev-days (1 senior full-stack + QA), excluding CTR/FTR.

14. Acceptance criteria (architecture done)

 New org: customer + transaction catalog seeded; TM workflow active; STR config + default mappings exist.

 Ingest uses canonical aliases; amount optional; dual-write when present.

 TransactionMappedField FK → TransactionFieldDefinition only (post Phase 4).

 STR transaction mappings → catalog; XML amount_local via mapping.

 Rules scoped per org; /rules/org org-only post Phase 4.

 No production TRANSACTION ModuleApi with organizationId: null post Phase 4.

 Migrated org: legacy processId works via map for deprecation window.

 Migration script idempotent; dry-run + verification gate documented.

 Zero cross-org referenceId collision bugs on ingest.
15. Explicitly deferred
CTR / FTR escalation (uses same amount, transmode, to_country fields when built).
CBN compliance dashboard / readiness PDF.
Field value encryption.
Removing Transaction.amount column.
16. Implementation order (single thread)
1. Schema + OrganizationComplianceFeatures + ComplianceMigrationMap
2. Templates + OrgComplianceProvisionerService
3. TransactionFieldDefinitionsService (admin + org read)
4. TransactionFieldResolverService + IngestNormalizer
5. Rules org scope + ingest wiring
6. STR getAvailableFields + mapping FK + XML amount_local
7. ModuleApi org-only paths + legacy shim
8. Migration CLI (steps 2.1–2.6)
9. Frontend transaction fields + STR/workflow UI
10. Pilot migrate → wave rollout → Phase 4 cleanup