# Changelog

## 0.1.0-alpha.3 (unreleased)

- Added `bills.list()`, `create()`, `retrieve()`, `update()` and `del()`. Creation saves a draft with one optional uploaded document; approval is a separate `update` with `status: 'APPROVED'`. Bill writes require workspace staff, entity permission and the bills feature flag, and retain accounting period locks and payment restrictions. List balances preserve decimal strings. Mutations are never retried automatically.
- Regenerated from the 20 November 2026 API snapshot: 85 operations across 25 resource groups.
- Added `charts.listXeroReportMappings()` for the approved NZ Xero report-code placements in the authorised workspace. Each entry has a report group and nullable category. Other countries return an empty lookup.
- Added `groupBy: "reportGroup"` to `reports.trialBalance()` and included the saved report group and category on account rows. `groupBy: "subtype"` remains available during deprecation.
- Added `fixedAssets.import()`, which creates up to 100 draft fixed assets in one call and reports on every row. Built for bringing a register over from another system. Each row comes back as `created`, `exists` or `error`: `exists` means an asset already carries that `assetNumber`, returned with its ID instead of an error, so retrying a call that timed out cannot create the asset twice. A row naming an asset type the entity does not have is refused rather than imported without one. Rows are independent, so one refusal does not stop the rest, and the call returns `200` either way — read `results`, not the status. Opening accumulated depreciation posts no journal, because the depreciation it represents is already in the ledger; for the same reason a cost limit and an immediate expense claim are not accepted here. Give `depreciationRate` rather than a fractional `usefulLifeYears`, which must be whole years.
- Added `fixedAssets.activate()`, which activates up to 100 draft fixed assets and is what starts them depreciating. Each is activated independently, so the response lists `activated` and `failed` and a failure does not roll back the rest. No purchase journal posts. An asset needs a type, both dates, a purchase price, a method and exactly one of a rate or a useful life, and every dimension the entity requires.
- Added `fixedAssets.del()`, which permanently deletes a draft fixed asset. Drafts only: an active or disposed asset has posted journals behind it and returns `409`.
- Entity responses carry `conversionDate` and `gstFilingStartDate`, the day the entity's books moved into Prosaic and the first day of its first GST period here. Both are calendar dates in the entity's own timezone, and null when they were never recorded.
- Added `fixedAssets.update()`, which changes a draft fixed asset. Fields you leave out keep their stored values, and `null` clears a field that can be empty. An asset's own depreciation method, rate and useful life override its asset type's defaults. Rate and useful life are exclusive: setting one clears the other, and method `'none'` clears both. An active or disposed asset returns `409`.
- Deliberate breaking API v1 chart-write update in activated workspaces: create accounts with an explicit report group and category choice (null for eligible group-only accounts); account type derives from group. Parent inputs remain supported only in nonactivated workspaces. API URL version `/v1`, package version and workspace capability are separate.
- Added `reportCategories.listForWorkspace()` for discovery before an entity exists. Entity discovery exposes capability across every active workspace. Writes recheck policy and return `CHART_INPUT_CONTRACT_MISMATCH` (409) when the contract changed, or `CHART_INPUT_POLICY_UNAVAILABLE` (503).
- Template reads expose stable IDs, row versions, template version and review state. Reporting and replacement writes require saved preconditions. Metadata-only patches preserve classification. API access does not confirm human template review or bypass permanent system-role locks.
- Entity reporting edits include the expected saved pair. Conflict responses require reload and deliberate resubmission; mutations are never retried automatically. Stored subtype values and trial-balance grouping remain compatible.

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
