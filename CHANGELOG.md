# Changelog

## 0.1.0-alpha.2 (unreleased)

- Chart accounts expose nullable `systemRole`. Creation and full replacement retain global account defaults and support `includeSystemAccounts: true` for omitted system accounts. Manual role mappings and custom root account codes are not supported.
- Entity accounts expose nullable `systemRole`. Metadata updates preserve role assignments and account types. Balance-sheet account rows identify calculated earnings through optional `earningsType`.

- Regenerated from the 21 October 2026 API snapshot: 76 operations across 24 resource groups.
- Added `files.list()`, which lists an entity's saved files, newest first, optionally narrowed by part of the name.
- Added `bankAccounts` with `importTransactions()`, which imports statement lines into an existing CSV bank account and skips lines it already holds, and `createWithTransactions()`, which creates a CSV bank account and imports into it in one step.
- `transactions.list()` accepts `reconciliationStatus` (`'reconciled'` or `'unreconciled'`) and `view: 'compact'`, a smaller response shaped for coding transactions.
- New response fields: entity GST registration, GST period and basis, financial year start month and currency; bank account `sourceType`; invoice `amountDue`; workspace `subscriptionState` on `me.retrieve()`; and the trial balance's reporting `timezone`.
- `transactions.reconcileBulk()` accepts `creditHolding` and `fixedAssetDisposal` on an update, and `transactions.reverse()` documents its `409` conflict response.
- Added `contacts` with `list`, `create`, `retrieve`, `update`, `del`, `archive` and `restore`.
- `rules.list()` now follows the paginated rules endpoint, so automatic iteration reads every page.
- Updated request and response types for clients, rules, invoices and fixed assets to match the current API.
- Invoices carry `bankAccountName`, the payee name printed with the invoice's bank details. Responses return it (null while a draft uses the default name). `invoices.create()` accepts it; omit it or send null to use the default, which is the account holder name the bank reports, then the entity name, then the bank's account name.
- `invoices.create()` accepts `invoiceTemplateId`, the template to print with; null uses the contact's or entity's default.
- `transactions.list()` accepts `includePreConversion: 'true'`. The API now hides transactions dated before an entity's conversion date by default, and moves an earlier `dateFrom` up to it; the flag returns them.

## 0.1.0-alpha.1 (unreleased)

- Typed resource methods for the 66 public API v1 operations in the 7 September 2026 snapshot, with a reproducible contract. See README.md for known compatibility gaps with newer server versions.
- API-key and OAuth bearer access, workspace selection, S256 PKCE, callback validation, refresh rotation, and token revocation.
- Pagination, multipart uploads, typed errors, response metadata, cancellation and bounded safe-read retries.
- ESM/CommonJS packaging, local testing guidance, and consumer/maintainer agent skills.
- Public source at prosaichq/prosaic-node, archive installation instructions, and a shareable quickstart. npm publication remains pending.
