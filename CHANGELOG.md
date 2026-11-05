# Changelog

## 0.1.0-alpha.2

- First npm release, as `prosaic-node`. Install it with `npm install prosaic-node@next`. Earlier archives were named `@prosaic/sdk`; import from `prosaic-node` instead.
- The package includes only the consumer agent skill, `skills/prosaic-sdk`.
- Document correctable system-account errors: `SYSTEM_ACCOUNT_VALIDATION`, `SYSTEM_ACCOUNT_CONFLICT`, and `DELETE_RESTRICTED` return HTTP 400.

- Chart accounts expose nullable `systemRole`. Creation and full replacement retain global account defaults and support `includeSystemAccounts: true` for omitted system accounts. Manual role mappings and custom root account codes are not supported.
- Entity accounts expose nullable `systemRole`. Metadata updates preserve role assignments and account types. Balance-sheet account rows identify calculated earnings through optional `earningsType`.

- Regenerated from the 6 November 2026 API snapshot: 79 operations across 25 resource groups.
- Added `journals.createBulk()`, which records up to 100 journals and 1,000 lines in one transaction: all of them or none. `autoPost` is required and applies to the whole set, and an optional `idempotencyKey` makes a retry safe.
- Added `reportCategories.list(entityId)` for country-specific report groups, category defaults and exact allowed placements. Headings are returned as structure and cannot be assigned.
- Account responses include nullable `reportGroup` and `reportCategory` summaries, including template accounts and accounts nested on bank accounts. Use these fields for reporting; `subtype` remains legacy compatibility data and its existing values are preserved.
- Added `bankAccounts.link()`, which links existing client bank accounts to an entity and returns them with their general ledger account. It only adds links; accounts already on the entity are left as they are.
- Added `files.list()`, which lists an entity's saved files, newest first, optionally narrowed by part of the name.
- Added `bankAccounts` with `importTransactions()`, which imports statement lines into an existing CSV bank account and skips lines it already holds, and `createWithTransactions()`, which creates a CSV bank account and imports into it in one step.
- Imported statement lines accept an optional `bankTransactionId`.
- `transactions.list()` accepts `reconciliationStatus` (`'reconciled'` or `'unreconciled'`) and `view: 'compact'`, a smaller response shaped for coding transactions.
- New response fields: entity GST registration, GST period and basis, financial year start month and currency; bank account `sourceType`; invoice `amountDue`; workspace `subscriptionState` on `me.retrieve()`; and the trial balance's reporting `timezone`.
- `transactions.reconcileBulk()` accepts `creditHolding`, `fixedAssetDisposal`, `fixedAssetPurchase` and `billAllocations` on an update, and `transactions.reverse()` documents its `409` conflict response.
- Profit and loss `segmentColumns` may omit `dimensionId` and `dimensionName`.
- Added `contacts` with `list`, `create`, `retrieve`, `update`, `del`, `archive` and `restore`.
- `rules.list()` now follows the paginated rules endpoint, so automatic iteration reads every page.
- Updated request and response types for clients, rules, invoices and fixed assets to match the current API.
- Invoices carry `bankAccountName`, the payee name printed with the invoice's bank details. Responses return it (null while a draft uses the default name). `invoices.create()` accepts it; omit it or send null to use the default, which is the account holder name the bank reports, then the entity name, then the bank's account name.
- `invoices.create()` no longer takes `invoiceTemplateId`, which the API stopped accepting.
- `transactions.list()` accepts `includePreConversion: 'true'`. The API now hides transactions dated before an entity's conversion date by default, and moves an earlier `dateFrom` up to it; the flag returns them.

## 0.1.0-alpha.1 (not published to npm)

- Typed resource methods for the 66 public API v1 operations in the 7 September 2026 snapshot, with a reproducible contract. See README.md for known compatibility gaps with newer server versions.
- API-key and OAuth bearer access, workspace selection, S256 PKCE, callback validation, refresh rotation, and token revocation.
- Pagination, multipart uploads, typed errors, response metadata, cancellation and bounded safe-read retries.
- ESM/CommonJS packaging, local testing guidance, and consumer/maintainer agent skills.
- Public source at prosaichq/prosaic-node, archive installation instructions, and a shareable quickstart. npm publication remains pending.
