// Generated from openapi/prosaic.json. Run yarn generate; do not edit.
import type { operations } from './types.js';
import { Transport, pathParam, type RequestOptions } from './transport.js';
import { APIPromise, APIListPromise } from './pagination.js';

export type VersionRetrieveResponse = operations["version.retrieve"]['responses'][200]['content']['application/json'];
export type ChartsListResponse = operations["charts.list"]['responses'][200]['content']['application/json'];
export type ChartsCreateResponse = operations["charts.create"]['responses'][201]['content']['application/json'];
export type ChartsCreateParams = operations["charts.create"]['requestBody']['content']['application/json'];
export type ChartsListAccountsResponse = operations["charts.listAccounts"]['responses'][200]['content']['application/json'];
export type ChartsListAccountsParams = NonNullable<operations["charts.listAccounts"]['parameters']['query']>;
export type ChartsCreateAccountResponse = operations["charts.createAccount"]['responses'][200]['content']['application/json'];
export type ChartsCreateAccountParams = operations["charts.createAccount"]['requestBody']['content']['application/json'];
export type ChartsDeleteAccountResponse = operations["charts.deleteAccount"]['responses'][200]['content']['application/json'];
export type ChartsUpdateAccountResponse = operations["charts.updateAccount"]['responses'][200]['content']['application/json'];
export type ChartsUpdateAccountParams = operations["charts.updateAccount"]['requestBody']['content']['application/json'];
export type ChartsDelResponse = operations["charts.del"]['responses'][200]['content']['application/json'];
export type ChartsUpdateResponse = operations["charts.update"]['responses'][200]['content']['application/json'];
export type ChartsUpdateParams = operations["charts.update"]['requestBody']['content']['application/json'];
export type ClientsListResponse = operations["clients.list"]['responses'][200]['content']['application/json'];
export type ClientsListParams = NonNullable<operations["clients.list"]['parameters']['query']>;
export type ClientsCreateResponse = operations["clients.create"]['responses'][200]['content']['application/json'];
export type ClientsCreateParams = operations["clients.create"]['requestBody']['content']['application/json'];
export type ClientsListBankAccountsResponse = operations["clients.listBankAccounts"]['responses'][200]['content']['application/json'];
export type ClientsCreateOnboardingLinkResponse = operations["clients.createOnboardingLink"]['responses'][200]['content']['application/json'];
export type ClientsCreateOnboardingLinkParams = operations["clients.createOnboardingLink"]['requestBody']['content']['application/json'];
export type ClientsListTransactionsResponse = operations["clients.listTransactions"]['responses'][200]['content']['application/json'];
export type ClientsListTransactionsParams = NonNullable<operations["clients.listTransactions"]['parameters']['query']>;
export type ContactsListResponse = operations["contacts.list"]['responses'][200]['content']['application/json'];
export type ContactsListParams = NonNullable<operations["contacts.list"]['parameters']['query']>;
export type EntitiesListResponse = operations["entities.list"]['responses'][200]['content']['application/json'];
export type EntitiesListParams = NonNullable<operations["entities.list"]['parameters']['query']>;
export type EntitiesCreateResponse = operations["entities.create"]['responses'][201]['content']['application/json'];
export type EntitiesCreateParams = operations["entities.create"]['requestBody']['content']['application/json'];
export type ChangeSetsCreateResponse = operations["changeSets.create"]['responses'][201]['content']['application/json'];
export type ChangeSetsCreateParams = operations["changeSets.create"]['requestBody']['content']['application/json'];
export type EntityAccountsListResponse = operations["entityAccounts.list"]['responses'][200]['content']['application/json'];
export type EntityAccountsListParams = NonNullable<operations["entityAccounts.list"]['parameters']['query']>;
export type EntityAccountsCreateResponse = operations["entityAccounts.create"]['responses'][201]['content']['application/json'];
export type EntityAccountsCreateParams = operations["entityAccounts.create"]['requestBody']['content']['application/json'];
export type EntityAccountsRestoreResponse = operations["entityAccounts.restore"]['responses'][200]['content']['application/json'];
export type EntityAccountsDelResponse = operations["entityAccounts.del"]['responses'][200]['content']['application/json'];
export type EntityAccountsResetResponse = operations["entityAccounts.reset"]['responses'][200]['content']['application/json'];
export type EntityAccountsUpdateResponse = operations["entityAccounts.update"]['responses'][200]['content']['application/json'];
export type EntityAccountsUpdateParams = operations["entityAccounts.update"]['requestBody']['content']['application/json'];
export type ContactsCreateResponse = operations["contacts.create"]['responses'][201]['content']['application/json'];
export type ContactsCreateParams = operations["contacts.create"]['requestBody']['content']['application/json'];
export type ContactsDelResponse = operations["contacts.del"]['responses'][200]['content']['application/json'];
export type ContactsRetrieveResponse = operations["contacts.retrieve"]['responses'][200]['content']['application/json'];
export type ContactsUpdateResponse = operations["contacts.update"]['responses'][200]['content']['application/json'];
export type ContactsUpdateParams = operations["contacts.update"]['requestBody']['content']['application/json'];
export type ContactsArchiveResponse = operations["contacts.archive"]['responses'][200]['content']['application/json'];
export type ContactsArchiveParams = operations["contacts.archive"]['requestBody']['content']['application/json'];
export type ContactsRestoreResponse = operations["contacts.restore"]['responses'][200]['content']['application/json'];
export type ContactsRestoreParams = operations["contacts.restore"]['requestBody']['content']['application/json'];
export type DimensionsListResponse = operations["dimensions.list"]['responses'][200]['content']['application/json'];
export type FilesUploadResponse = operations["files.upload"]['responses'][201]['content']['application/json'];
export type FixedAssetTypesListResponse = operations["fixedAssetTypes.list"]['responses'][200]['content']['application/json'];
export type FixedAssetTypesCreateResponse = operations["fixedAssetTypes.create"]['responses'][201]['content']['application/json'];
export type FixedAssetTypesCreateParams = operations["fixedAssetTypes.create"]['requestBody']['content']['application/json'];
export type FixedAssetsListResponse = operations["fixedAssets.list"]['responses'][200]['content']['application/json'];
export type FixedAssetsListParams = NonNullable<operations["fixedAssets.list"]['parameters']['query']>;
export type FixedAssetsCreateResponse = operations["fixedAssets.create"]['responses'][201]['content']['application/json'];
export type FixedAssetsCreateParams = operations["fixedAssets.create"]['requestBody']['content']['application/json'];
export type FixedAssetsRetrieveResponse = operations["fixedAssets.retrieve"]['responses'][200]['content']['application/json'];
export type GeneralLedgerByAccountResponse = operations["generalLedger.byAccount"]['responses'][200]['content']['application/json'];
export type GeneralLedgerByAccountParams = NonNullable<operations["generalLedger.byAccount"]['parameters']['query']>;
export type GeneralLedgerByTransactionResponse = operations["generalLedger.byTransaction"]['responses'][200]['content']['application/json'];
export type GeneralLedgerByTransactionParams = NonNullable<operations["generalLedger.byTransaction"]['parameters']['query']>;
export type GstReturnsListForEntityResponse = operations["gstReturns.listForEntity"]['responses'][200]['content']['application/json'];
export type GstReturnsListForEntityParams = NonNullable<operations["gstReturns.listForEntity"]['parameters']['query']>;
export type GstReturnsRetrieveResponse = operations["gstReturns.retrieve"]['responses'][200]['content']['application/json'];
export type InvoicesCreateResponse = operations["invoices.create"]['responses'][201]['content']['application/json'];
export type InvoicesCreateParams = operations["invoices.create"]['requestBody']['content']['application/json'];
export type InvoicesRetrieveResponse = operations["invoices.retrieve"]['responses'][200]['content']['application/json'];
export type JournalsListResponse = operations["journals.list"]['responses'][200]['content']['application/json'];
export type JournalsListParams = NonNullable<operations["journals.list"]['parameters']['query']>;
export type JournalsCreateResponse = operations["journals.create"]['responses'][200]['content']['application/json'];
export type JournalsCreateParams = operations["journals.create"]['requestBody']['content']['application/json'];
export type JournalsAttachFilesResponse = operations["journals.attachFiles"]['responses'][200]['content']['application/json'];
export type JournalsAttachFilesParams = operations["journals.attachFiles"]['requestBody']['content']['application/json'];
export type JournalsVoidResponse = operations["journals.void"]['responses'][200]['content']['application/json'];
export type LedgerListResponse = operations["ledger.list"]['responses'][200]['content']['application/json'];
export type LedgerListParams = NonNullable<operations["ledger.list"]['parameters']['query']>;
export type ReportsBalanceSheetResponse = operations["reports.balanceSheet"]['responses'][200]['content']['application/json'];
export type ReportsBalanceSheetParams = NonNullable<operations["reports.balanceSheet"]['parameters']['query']>;
export type ReportsCurrentAccountsResponse = operations["reports.currentAccounts"]['responses'][200]['content']['application/json'];
export type ReportsCurrentAccountsParams = NonNullable<operations["reports.currentAccounts"]['parameters']['query']>;
export type ReportsDepreciationScheduleResponse = operations["reports.depreciationSchedule"]['responses'][200]['content']['application/json'];
export type ReportsDepreciationScheduleParams = NonNullable<operations["reports.depreciationSchedule"]['parameters']['query']>;
export type ReportsProfitLossResponse = operations["reports.profitLoss"]['responses'][200]['content']['application/json'];
export type ReportsProfitLossParams = NonNullable<operations["reports.profitLoss"]['parameters']['query']>;
export type TransactionsListResponse = operations["transactions.list"]['responses'][200]['content']['application/json'];
export type TransactionsListParams = NonNullable<operations["transactions.list"]['parameters']['query']>;
export type TransactionsReconcileResponse = operations["transactions.reconcile"]['responses'][200]['content']['application/json'];
export type TransactionsReconcileParams = operations["transactions.reconcile"]['requestBody']['content']['application/json'];
export type TransactionsReverseResponse = operations["transactions.reverse"]['responses'][200]['content']['application/json'];
export type TransactionsReverseParams = operations["transactions.reverse"]['requestBody']['content']['application/json'];
export type ReportsTrialBalanceResponse = operations["reports.trialBalance"]['responses'][200]['content']['application/json'];
export type ReportsTrialBalanceParams = NonNullable<operations["reports.trialBalance"]['parameters']['query']>;
export type ExtensionsRequestResponse = operations["extensions.request"]['responses'][200]['content']['application/json'];
export type ExtensionsRequestParams = operations["extensions.request"]['requestBody']['content']['application/json'];
export type GlobalAccountsListResponse = operations["globalAccounts.list"]['responses'][200]['content']['application/json'];
export type GstReturnsListResponse = operations["gstReturns.list"]['responses'][200]['content']['application/json'];
export type GstReturnsListParams = NonNullable<operations["gstReturns.list"]['parameters']['query']>;
export type InvoicesListResponse = operations["invoices.list"]['responses'][200]['content']['application/json'];
export type InvoicesListParams = NonNullable<operations["invoices.list"]['parameters']['query']>;
export type MeRetrieveResponse = operations["me.retrieve"]['responses'][200]['content']['application/json'];
export type RulesListResponse = operations["rules.list"]['responses'][200]['content']['application/json'];
export type RulesListParams = NonNullable<operations["rules.list"]['parameters']['query']>;
export type RulesCreateResponse = operations["rules.create"]['responses'][201]['content']['application/json'];
export type RulesCreateParams = operations["rules.create"]['requestBody']['content']['application/json'];
export type RulesDelResponse = operations["rules.del"]['responses'][200]['content']['application/json'];
export type RulesRetrieveResponse = operations["rules.retrieve"]['responses'][200]['content']['application/json'];
export type RulesUpdateResponse = operations["rules.update"]['responses'][200]['content']['application/json'];
export type RulesUpdateParams = operations["rules.update"]['requestBody']['content']['application/json'];
export type ScheduledTasksListResponse = operations["scheduledTasks.list"]['responses'][200]['content']['application/json'];
export type ScheduledTasksCreateResponse = operations["scheduledTasks.create"]['responses'][201]['content']['application/json'];
export type ScheduledTasksCreateParams = operations["scheduledTasks.create"]['requestBody']['content']['application/json'];
export type ScheduledTasksDelResponse = operations["scheduledTasks.del"]['responses'][200]['content']['application/json'];
export type ScheduledTasksRetrieveResponse = operations["scheduledTasks.retrieve"]['responses'][200]['content']['application/json'];
export type ScheduledTasksUpdateResponse = operations["scheduledTasks.update"]['responses'][200]['content']['application/json'];
export type ScheduledTasksUpdateParams = operations["scheduledTasks.update"]['requestBody']['content']['application/json'];
export type ScheduledTasksRunResponse = operations["scheduledTasks.run"]['responses'][202]['content']['application/json'];
export type TransactionsReconcileBulkResponse = operations["transactions.reconcileBulk"]['responses'][200]['content']['application/json'];
export type TransactionsReconcileBulkParams = operations["transactions.reconcileBulk"]['requestBody']['content']['application/json'];

export class VersionResource {
  constructor(private readonly transport: Transport) {}
  /**
   * API version information
   * Returns information about the Prosaic Public API v1
   */
  retrieve(options: RequestOptions = {}): APIPromise<VersionRetrieveResponse> {
    return new APIPromise(this.transport.request<VersionRetrieveResponse>("GET", `/api/public/v1`, {}, options));
  }
}

export class ChartsResource {
  constructor(private readonly transport: Transport) {}
  /**
   * List all chart of accounts templates
   * Returns all chart of accounts templates in the workspace. Requires API key authentication.
   */
  list(options: RequestOptions = {}): APIListPromise<ChartsListResponse> {
    return new APIListPromise(this.transport.request<ChartsListResponse>("GET", `/api/public/v1/charts`, {}, options));
  }

  /**
   * Create a chart of accounts template
   * Creates a new chart of accounts template in the workspace. Every system global
   * account (see `GET /api/public/v1/global-accounts`, `isSystem: true`) must be present
   * in `accounts` with `isIncluded: true` — otherwise the request fails with
   * `SYSTEM_ACCOUNT_VALIDATION` listing all missing accounts. Set
   * `includeSystemAccounts: true` to have any omitted system accounts added
   * automatically from their global definitions. Requires API key authentication.
   *
   * **Tax codes**: The `taxCode` field expects the machine code, not the human-readable tax name.
   * Passing a name (e.g. `"15% GST on Income"`) is stored verbatim and resolves to null wherever the
   * code is looked up. Valid codes are `NZ_GST_15_INC` (15% GST on Income), `NZ_GST_15_EXP`
   * (15% GST on Expenses), `NZ_GST_0_NONE` (No GST), and `NZ_GST_0_ZERO` (Zero-rated GST). Omit
   * `taxCode` or set it to null to default to `NZ_GST_0_NONE` (No GST).
   *
   * **Description defaults**: `description` is optional per account; omitting it (or null) leaves
   * the account description empty.
   *
   */
  create(params: ChartsCreateParams, options: RequestOptions = {}): APIPromise<ChartsCreateResponse> {
    return new APIPromise(this.transport.request<ChartsCreateResponse>("POST", `/api/public/v1/charts`, { body: params }, options));
  }

  /**
   * Get chart of accounts template accounts
   * Returns paginated accounts from a chart-of-accounts **template** (the read-only blueprint entities are provisioned from). When `includeHidden=true`, also returns global accounts not in the template with `isIncluded=false`. Requires API key authentication.
   *
   * **Important**: The `id` values returned by this endpoint are *template account* IDs (`TemplateAccount.id`). They are **not** the IDs of an entity's actual GL accounts — do not use them to post journals or look up reconciliation activity.
   *
   * To fetch the chart of accounts for a specific entity (including bank-account-linked accounts and any custom accounts), use `GET /api/public/v1/entities/{entityId}/charts`. The bank-account-to-GL linkage is also embedded on each entity's bank account at `bankAccounts[].entityAccount` in the `GET /api/public/v1/entities` response.
   *
   * **Tax codes**: The `taxCode` field is returned as the human-readable tax *name* (e.g. `"15% GST on Income"`, or `"No GST"` when unset), not the machine code. When creating or updating a template you must pass the machine *code* instead (`NZ_GST_15_INC`, `NZ_GST_15_EXP`, `NZ_GST_0_NONE`, `NZ_GST_0_ZERO`), so convert the name back to its code before writing.
   *
   */
  listAccounts(chartId: string, params: ChartsListAccountsParams = {}, options: RequestOptions = {}): APIListPromise<ChartsListAccountsResponse> {
    return new APIListPromise(this.transport.request<ChartsListAccountsResponse>("GET", `/api/public/v1/charts/${pathParam(chartId)}`, { query: params }, options), (page) => this.transport.request<ChartsListAccountsResponse>("GET", `/api/public/v1/charts/${pathParam(chartId)}`, { query: { ...params, page } }, options));
  }

  /**
   * Add a single account to a chart of accounts template
   * Adds one account to a chart of accounts template without resending the full account list. To
   * add a top-level (parent) account, provide its global account `code`; to add a custom child
   * account, provide `code`, `name`, and `parentCode` (the child code must be `{parentCode}.{digits}`).
   * The addition propagates to every entity using the template. Requires API key authentication.
   *
   */
  createAccount(chartId: string, params: ChartsCreateAccountParams, options: RequestOptions = {}): APIPromise<ChartsCreateAccountResponse> {
    return new APIPromise(this.transport.request<ChartsCreateAccountResponse>("POST", `/api/public/v1/charts/${pathParam(chartId)}/accounts`, { body: params }, options));
  }

  /**
   * Delete a single account from a chart of accounts template
   * Removes one account from a chart of accounts template without resending the full account list.
   * The removal propagates to every entity using the template. Accounts that have journal entries,
   * child accounts, or are system accounts cannot be removed. `accountId` is the TemplateAccount ID
   * from `GET /charts/{chartId}`. Requires API key authentication.
   *
   */
  deleteAccount(chartId: string, accountId: string, options: RequestOptions = {}): APIPromise<ChartsDeleteAccountResponse> {
    return new APIPromise(this.transport.request<ChartsDeleteAccountResponse>("POST", `/api/public/v1/charts/${pathParam(chartId)}/accounts/${pathParam(accountId)}/delete`, {}, options));
  }

  /**
   * Update a single account in a chart of accounts template
   * Updates one account in a chart of accounts template without resending the full account list.
   * Supports `name`, `description`, `taxCode`, `mappedCode` and `code` (rename, kept under the same
   * parent). A code rename cascades non-destructively to every entity account derived from this
   * template account (balances and customizations are preserved). Changes propagate to all entities
   * using the template. Omitted fields preserve their existing values; send `description: null` to
   * clear the description. `accountId` is the TemplateAccount ID from `GET /charts/{chartId}`.
   * Requires API key authentication.
   *
   */
  updateAccount(chartId: string, accountId: string, params: ChartsUpdateAccountParams = {}, options: RequestOptions = {}): APIPromise<ChartsUpdateAccountResponse> {
    return new APIPromise(this.transport.request<ChartsUpdateAccountResponse>("POST", `/api/public/v1/charts/${pathParam(chartId)}/accounts/${pathParam(accountId)}/update`, { body: params }, options));
  }

  /**
   * Delete a chart of accounts template
   * Deletes a chart of accounts template. Cannot delete templates with assigned entities. Requires API key authentication.
   */
  del(chartId: string, options: RequestOptions = {}): APIPromise<ChartsDelResponse> {
    return new APIPromise(this.transport.request<ChartsDelResponse>("POST", `/api/public/v1/charts/${pathParam(chartId)}/delete`, {}, options));
  }

  /**
   * Update a chart of accounts template
   * Updates a chart of accounts template. When `accounts` is provided it fully replaces the
   * template's account list (delegates to updateAccountTemplateAccounts and propagates to all
   * entities). When `accounts` is omitted, only the provided template metadata (`name`,
   * `description`) is updated and accounts are left untouched. Omit a metadata field to preserve
   * its existing value, or send `description: null` to clear the description. A full replacement
   * list must still contain every
   * system account (`GET /api/public/v1/global-accounts`, `isSystem: true`) with
   * `isIncluded: true` — otherwise the request fails with `SYSTEM_ACCOUNT_VALIDATION` listing
   * all missing accounts. Set `includeSystemAccounts: true` to carry over any omitted system
   * accounts automatically. For surgical single-account changes use the
   * `/charts/{chartId}/accounts` endpoints instead. Requires API key authentication.
   *
   * **Tax codes**: The `taxCode` field expects the machine code, not the human-readable tax name.
   * Passing a name (e.g. `"15% GST on Income"`) is stored verbatim and resolves to null wherever the
   * code is looked up. Valid codes are `NZ_GST_15_INC` (15% GST on Income), `NZ_GST_15_EXP`
   * (15% GST on Expenses), `NZ_GST_0_NONE` (No GST), and `NZ_GST_0_ZERO` (Zero-rated GST). Note that
   * `GET /api/public/v1/charts/{chartId}` returns the human-readable name on read — convert it back to
   * the machine code before writing.
   *
   * **Field preserve/clear semantics**: For each account, omitting a field (`description`, `taxCode`,
   * `mappedCode`) preserves its existing value, while an explicit null clears it (taxCode clears to
   * `NZ_GST_0_NONE`).
   *
   */
  update(chartId: string, params: ChartsUpdateParams = {}, options: RequestOptions = {}): APIPromise<ChartsUpdateResponse> {
    return new APIPromise(this.transport.request<ChartsUpdateResponse>("POST", `/api/public/v1/charts/${pathParam(chartId)}/update`, { body: params }, options));
  }
}

export class ClientsResource {
  constructor(private readonly transport: Transport) {}
  /**
   * List clients
   * Returns client users (`client` and `standard_user` roles) in the workspace tied to the token.
   * Callers authenticated as client or standard_user only ever receive their own client record,
   * even within a shared workspace. Accountant-style roles receive the full list (subject to filters).
   *
   */
  list(params: ClientsListParams = {}, options: RequestOptions = {}): APIListPromise<ClientsListResponse> {
    return new APIListPromise(this.transport.request<ClientsListResponse>("GET", `/api/public/v1/clients`, { query: params }, options));
  }

  /**
   * Create a client
   * Creates a new client in the workspace associated with the API key. If a client with the same email already exists, returns the existing client.
   */
  create(params: ClientsCreateParams, options: RequestOptions = {}): APIPromise<ClientsCreateResponse> {
    return new APIPromise(this.transport.request<ClientsCreateResponse>("POST", `/api/public/v1/clients`, { body: params }, options));
  }

  /**
   * List client's bank accounts
   * Returns all bank accounts belonging to the specified client.
   *
   * Access control:
   * - Authenticated user must be the client themselves, OR
   * - Authenticated user must be in the same workspace as the client (accountant/advisor)
   *
   */
  listBankAccounts(clientId: string, options: RequestOptions = {}): APIListPromise<ClientsListBankAccountsResponse> {
    return new APIListPromise(this.transport.request<ClientsListBankAccountsResponse>("GET", `/api/public/v1/clients/${pathParam(clientId)}/bank-accounts`, {}, options));
  }

  /**
   * clients.createOnboardingLink
   */
  createOnboardingLink(clientId: string, params: ClientsCreateOnboardingLinkParams = {}, options: RequestOptions = {}): APIPromise<ClientsCreateOnboardingLinkResponse> {
    return new APIPromise(this.transport.request<ClientsCreateOnboardingLinkResponse>("POST", `/api/public/v1/clients/${pathParam(clientId)}/onboarding`, { body: params }, options));
  }

  /**
   * List client's bank transactions
   * Returns paginated bank transactions for the specified client.
   *
   * Access control:
   * - Authenticated user must be the client themselves, OR
   * - Authenticated user must be in the same workspace as the client (accountant/advisor)
   *
   * Supports filtering by:
   * - Bank account IDs (comma-separated)
   * - Date range (dateFrom, dateTo)
   * - Reconciliation status (reconciled | unreconciled)
   *
   */
  listTransactions(clientId: string, params: ClientsListTransactionsParams = {}, options: RequestOptions = {}): APIListPromise<ClientsListTransactionsResponse> {
    return new APIListPromise(this.transport.request<ClientsListTransactionsResponse>("GET", `/api/public/v1/clients/${pathParam(clientId)}/transactions`, { query: params }, options), (page) => this.transport.request<ClientsListTransactionsResponse>("GET", `/api/public/v1/clients/${pathParam(clientId)}/transactions`, { query: { ...params, page } }, options));
  }
}

export class ContactsResource {
  constructor(private readonly transport: Transport) {}
  /**
   * List contacts
   * Returns non-deleted contacts from entities visible in the active workspace.
   */
  list(params: ContactsListParams = {}, options: RequestOptions = {}): APIListPromise<ContactsListResponse> {
    return new APIListPromise(this.transport.request<ContactsListResponse>("GET", `/api/public/v1/contacts`, { query: params }, options), (page) => this.transport.request<ContactsListResponse>("GET", `/api/public/v1/contacts`, { query: { ...params, page } }, options));
  }

  /**
   * Create a contact
   * Creates a contact in the path entity and returns its public representation.
   */
  create(entityId: string, params: ContactsCreateParams, options: RequestOptions = {}): APIPromise<ContactsCreateResponse> {
    return new APIPromise(this.transport.request<ContactsCreateResponse>("POST", `/api/public/v1/entities/${pathParam(entityId)}/contacts`, { body: params }, options));
  }

  /**
   * Delete a contact
   * Soft-deletes an active contact that has no invoice history.
   */
  del(entityId: string, contactId: string, options: RequestOptions = {}): APIPromise<ContactsDelResponse> {
    return new APIPromise(this.transport.request<ContactsDelResponse>("DELETE", `/api/public/v1/entities/${pathParam(entityId)}/contacts/${pathParam(contactId)}`, {}, options));
  }

  /**
   * Get a contact
   * Returns one active or archived contact belonging to the path entity.
   */
  retrieve(entityId: string, contactId: string, options: RequestOptions = {}): APIPromise<ContactsRetrieveResponse> {
    return new APIPromise(this.transport.request<ContactsRetrieveResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/contacts/${pathParam(contactId)}`, {}, options));
  }

  /**
   * Update a contact
   * Updates only the supplied mutable fields on an active contact. Omitted fields, including nested email labels and person invoice preferences, are unchanged; send null to clear an email label. Type and entity cannot be changed.
   */
  update(entityId: string, contactId: string, params: ContactsUpdateParams = {}, options: RequestOptions = {}): APIPromise<ContactsUpdateResponse> {
    return new APIPromise(this.transport.request<ContactsUpdateResponse>("PATCH", `/api/public/v1/entities/${pathParam(entityId)}/contacts/${pathParam(contactId)}`, { body: params }, options));
  }

  /**
   * Archive a contact
   * Archives an active contact, optionally archiving a business's people with it.
   */
  archive(entityId: string, contactId: string, params: ContactsArchiveParams = {}, options: RequestOptions = {}): APIPromise<ContactsArchiveResponse> {
    return new APIPromise(this.transport.request<ContactsArchiveResponse>("POST", `/api/public/v1/entities/${pathParam(entityId)}/contacts/${pathParam(contactId)}/archive`, { body: params }, options));
  }

  /**
   * Restore a contact
   * Restores an archived contact and optionally the people archived with the same business operation.
   */
  restore(entityId: string, contactId: string, params: ContactsRestoreParams = {}, options: RequestOptions = {}): APIPromise<ContactsRestoreResponse> {
    return new APIPromise(this.transport.request<ContactsRestoreResponse>("POST", `/api/public/v1/entities/${pathParam(entityId)}/contacts/${pathParam(contactId)}/restore`, { body: params }, options));
  }
}

export class EntitiesResource {
  constructor(private readonly transport: Transport) {}
  /**
   * List entities
   * Returns all entities that the authenticated user has access to within their workspace. Optionally filter by entity ID or client ID.
   *
   * **Important**: This endpoint is the primary source for entity-level reference data including:
   * - `taxRates[]` — Available tax rates (GST codes) for each entity. Use `taxRates[].code` when reconciling transactions or creating chart accounts.
   * - `bankAccounts[]` — Linked bank accounts for each entity. Each bank account includes its linked GL account at `bankAccounts[].entityAccount` (use `entityAccount.id` when posting journals or reconciling against the bank).
   * - `clients[]` — Client users associated with each entity.
   *
   * **Chart of accounts**: The `currentTemplateId` field references the *template* the entity was provisioned from — it is **not** the entity's actual chart of accounts. To fetch the entity's GL accounts (including bank-account-linked accounts and any custom accounts), call `GET /api/public/v1/entities/{entityId}/charts`.
   *
   */
  list(params: EntitiesListParams = {}, options: RequestOptions = {}): APIListPromise<EntitiesListResponse> {
    return new APIListPromise(this.transport.request<EntitiesListResponse>("GET", `/api/public/v1/entities`, { query: params }, options));
  }

  /**
   * Create an entity
   * Creates a new entity in the workspace associated with the API key. Supports full entity configuration including GST settings, client assignment, and bank account linking.
   */
  create(params: EntitiesCreateParams, options: RequestOptions = {}): APIPromise<EntitiesCreateResponse> {
    return new APIPromise(this.transport.request<EntitiesCreateResponse>("POST", `/api/public/v1/entities`, { body: params }, options));
  }
}

export class ChangeSetsResource {
  constructor(private readonly transport: Transport) {}
  /**
   * Submit a change-set (proposed financial writes) for an entity
   * Records an agent-proposed set of write operations (`journal.post` and/or `reconcile`) as a PENDING change-set. Idempotent on the content hash — re-submitting identical content returns the existing change-set. The set is NOT committed here; an admin approves it (L1) before it hits the ledger. The read-only box token is permitted on this single write path and remains pinned to its entity.
   *
   */
  create(entityId: string, params: ChangeSetsCreateParams, options: RequestOptions = {}): APIPromise<ChangeSetsCreateResponse> {
    return new APIPromise(this.transport.request<ChangeSetsCreateResponse>("POST", `/api/public/v1/entities/${pathParam(entityId)}/change-sets`, { body: params }, options));
  }
}

export class EntityAccountsResource {
  constructor(private readonly transport: Transport) {}
  /**
   * List chart of accounts for an entity
   * Returns chart account codes configured for the specified entity. Supports filtering by system accounts and excluded accounts. Requires API key authentication and entity access.
   */
  list(entityId: string, params: EntityAccountsListParams = {}, options: RequestOptions = {}): APIListPromise<EntityAccountsListResponse> {
    return new APIListPromise(this.transport.request<EntityAccountsListResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/charts`, { query: params }, options));
  }

  /**
   * Create a child account in the chart of accounts
   * Creates a new child (sub) account under an existing parent account. Only 2-level hierarchy is supported (parent → child, no grandchildren).
   * Parent account can be referenced by ID, code, or mappedCode to support external system integrations.
   *
   */
  create(entityId: string, params: EntityAccountsCreateParams, options: RequestOptions = {}): APIPromise<EntityAccountsCreateResponse> {
    return new APIPromise(this.transport.request<EntityAccountsCreateResponse>("POST", `/api/public/v1/entities/${pathParam(entityId)}/charts`, { body: params }, options));
  }

  /**
   * Restore a hidden/excluded template account
   * Restores an excluded template account by removing the exclusion and recreating the entity account from the template. No request body required.
   */
  restore(entityId: string, templateAccountId: string, options: RequestOptions = {}): APIPromise<EntityAccountsRestoreResponse> {
    return new APIPromise(this.transport.request<EntityAccountsRestoreResponse>("POST", `/api/public/v1/entities/${pathParam(entityId)}/charts/excluded/${pathParam(templateAccountId)}/restore`, {}, options));
  }

  /**
   * Delete or hide an entity account
   * Deletes a custom child account or hides a template-based account by creating an exclusion. Parent accounts cannot be deleted.
   */
  del(entityId: string, accountId: string, options: RequestOptions = {}): APIPromise<EntityAccountsDelResponse> {
    return new APIPromise(this.transport.request<EntityAccountsDelResponse>("POST", `/api/public/v1/entities/${pathParam(entityId)}/charts/${pathParam(accountId)}/delete`, {}, options));
  }

  /**
   * Reset an entity account to template defaults
   * Resets all customized fields on a template-based entity account back to the template values and clears customization flags. No request body required.
   */
  reset(entityId: string, accountId: string, options: RequestOptions = {}): APIPromise<EntityAccountsResetResponse> {
    return new APIPromise(this.transport.request<EntityAccountsResetResponse>("POST", `/api/public/v1/entities/${pathParam(entityId)}/charts/${pathParam(accountId)}/reset`, {}, options));
  }

  /**
   * Update an entity account
   * Updates an entity account's editable fields. Parent accounts can only update taxCode and mappedCode. Bank account-linked accounts have additional restrictions.
   */
  update(entityId: string, accountId: string, params: EntityAccountsUpdateParams = {}, options: RequestOptions = {}): APIPromise<EntityAccountsUpdateResponse> {
    return new APIPromise(this.transport.request<EntityAccountsUpdateResponse>("POST", `/api/public/v1/entities/${pathParam(entityId)}/charts/${pathParam(accountId)}/update`, { body: params }, options));
  }
}

export class DimensionsResource {
  constructor(private readonly transport: Transport) {}
  /**
   * List dimensions
   * Returns the entity's active dimensions (tracking categories such as Property or
   * Department) with their active options. Use each option's `id` as a value in
   * `dimensionOptionIds` when creating journals
   * (`POST /api/public/v1/entities/{entityId}/journals`) or reconciling transactions
   * (`POST /api/public/v1/entities/{entityId}/transactions/{transactionId}/reconcile`).
   *
   * Archived dimensions and archived options are excluded. Requires API key
   * authentication and entity access.
   *
   */
  list(entityId: string, options: RequestOptions = {}): APIListPromise<DimensionsListResponse> {
    return new APIListPromise(this.transport.request<DimensionsListResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/dimensions`, {}, options));
  }
}

export class FilesResource {
  constructor(private readonly transport: Transport) {}
  /**
   * Upload a file
   * Uploads a file for an entity. Files must be validated against size (20MB) and type restrictions. Returns a fileId that can be used when creating or attaching to journals. Requires API key authentication and entity access.
   */
  upload(entityId: string, file: Blob, options: RequestOptions & { filename?: string } = {}): APIPromise<FilesUploadResponse> {
    const form = new FormData(); form.append('file', file, options.filename ?? (file instanceof File ? file.name : 'upload'));
return new APIPromise(this.transport.request<FilesUploadResponse>("POST", `/api/public/v1/entities/${pathParam(entityId)}/files/upload`, { body: form }, options));
  }
}

export class FixedAssetTypesResource {
  constructor(private readonly transport: Transport) {}
  /**
   * List fixed asset types (categories) for an entity
   * Returns all fixed asset types (categories) configured for the specified entity.
   * Asset types define default depreciation settings and account mappings.
   * Includes mappedCode on accounts to support external system integrations (e.g., Xero).
   *
   */
  list(entityId: string, options: RequestOptions = {}): APIListPromise<FixedAssetTypesListResponse> {
    return new APIListPromise(this.transport.request<FixedAssetTypesListResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/fixed-asset-types`, {}, options));
  }

  /**
   * Create a new fixed asset type (category)
   * Creates a new fixed asset type for the specified entity.
   * Asset types define default depreciation settings and account mappings for fixed assets.
   *
   */
  create(entityId: string, params: FixedAssetTypesCreateParams, options: RequestOptions = {}): APIPromise<FixedAssetTypesCreateResponse> {
    return new APIPromise(this.transport.request<FixedAssetTypesCreateResponse>("POST", `/api/public/v1/entities/${pathParam(entityId)}/fixed-asset-types`, { body: params }, options));
  }
}

export class FixedAssetsResource {
  constructor(private readonly transport: Transport) {}
  /**
   * List fixed assets for an entity
   * Returns paginated fixed assets for the specified entity.
   * Includes asset details, depreciation information, and current book values.
   *
   */
  list(entityId: string, params: FixedAssetsListParams = {}, options: RequestOptions = {}): APIListPromise<FixedAssetsListResponse> {
    return new APIListPromise(this.transport.request<FixedAssetsListResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/fixed-assets`, { query: params }, options), (page) => this.transport.request<FixedAssetsListResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/fixed-assets`, { query: { ...params, page } }, options));
  }

  /**
   * Create a new fixed asset
   * Creates a new fixed asset for the specified entity.
   * Can create the asset as either a draft or immediately as active.
   * When creating as active, all required fields must be provided and pass validation.
   *
   */
  create(entityId: string, params: FixedAssetsCreateParams, options: RequestOptions = {}): APIPromise<FixedAssetsCreateResponse> {
    return new APIPromise(this.transport.request<FixedAssetsCreateResponse>("POST", `/api/public/v1/entities/${pathParam(entityId)}/fixed-assets`, { body: params }, options));
  }

  /**
   * Get a single fixed asset by ID
   * Returns a single fixed asset by its ID for the specified entity.
   * Includes asset details, depreciation information, and current book value.
   *
   */
  retrieve(entityId: string, assetId: string, options: RequestOptions = {}): APIPromise<FixedAssetsRetrieveResponse> {
    return new APIPromise(this.transport.request<FixedAssetsRetrieveResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/fixed-assets/${pathParam(assetId)}`, {}, options));
  }
}

export class GeneralLedgerResource {
  constructor(private readonly transport: Transport) {}
  /**
   * Get general ledger grouped by account
   * Returns journal entries grouped by account with running balances and period totals. Supports various period presets and custom date ranges.
   */
  byAccount(entityId: string, params: GeneralLedgerByAccountParams = {}, options: RequestOptions = {}): APIPromise<GeneralLedgerByAccountResponse> {
    return new APIPromise(this.transport.request<GeneralLedgerByAccountResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/general-ledger/account`, { query: params }, options));
  }

  /**
   * Get general ledger as flat entry list
   * Returns a flat list of journal entries with embedded account metadata. Entries are ordered by date, createdAt, and id for deterministic results.
   */
  byTransaction(entityId: string, params: GeneralLedgerByTransactionParams = {}, options: RequestOptions = {}): APIPromise<GeneralLedgerByTransactionResponse> {
    return new APIPromise(this.transport.request<GeneralLedgerByTransactionResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/general-ledger/transaction`, { query: params }, options));
  }
}

export class GstReturnsResource {
  constructor(private readonly transport: Transport) {}
  /**
   * List GST returns for an entity
   * Returns paginated GST returns for the specified entity, newest period first.
   *
   * Each row carries the return's lifecycle status, its period, its filing due date,
   * its net GST position (IRD Box 15) and a count of bank transactions in the period
   * that are not yet reconciled.
   *
   * **Box 15 is only present once the return has been calculated.** A draft that has
   * never been finalised reports `netGstPosition: null`. Use the detail endpoint to get
   * live, calculated box amounts for a draft.
   *
   * **Period and due dates are New Zealand calendar days** (`YYYY-MM-DD`), not UTC
   * instants. A GST period runs from the first moment of `dateFrom` to the last moment
   * of `dateTo`, both in NZ time.
   *
   * By default, draft returns whose period has not started yet are hidden, matching
   * what the Prosaic UI shows. Pass `includeFutureDrafts=true` to see them.
   *
   */
  listForEntity(entityId: string, params: GstReturnsListForEntityParams = {}, options: RequestOptions = {}): APIListPromise<GstReturnsListForEntityResponse> {
    return new APIListPromise(this.transport.request<GstReturnsListForEntityResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/gst-returns`, { query: params }, options), (page) => this.transport.request<GstReturnsListForEntityResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/gst-returns`, { query: { ...params, page } }, options));
  }

  /**
   * Get a single GST return with its IRD box amounts
   * Returns one GST return, including the IRD return boxes 5 to 15.
   *
   * **Where the numbers come from depends on the return's status**, and `amountsSource`
   * says which. A `draft` return has no persisted totals, so the boxes are calculated
   * live from posted journal lines and will move as coding changes — `amountsSource` is
   * `calculated`. Every other status reads the snapshot taken at finalisation, which is
   * what was, or will be, filed with IRD — `amountsSource` is `finalised`.
   *
   * **Period and due dates are New Zealand calendar days** (`YYYY-MM-DD`), not UTC instants.
   *
   * IRD submission keys, raw IRD response payloads and amendment original values are
   * internal and are never returned.
   *
   */
  retrieve(entityId: string, gstReturnId: string, options: RequestOptions = {}): APIPromise<GstReturnsRetrieveResponse> {
    return new APIPromise(this.transport.request<GstReturnsRetrieveResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/gst-returns/${pathParam(gstReturnId)}`, {}, options));
  }

  /**
   * List GST returns across the workspace
   * Returns paginated GST returns for every entity in the workspace the
   * caller can see, newest period first. The entity-scoped endpoint
   * (`/entities/{entityId}/gst-returns`) returns the same rows for one
   * entity; use `entityId` here to narrow without changing endpoint.
   *
   * Each row carries the return's lifecycle status, its period, its filing due date,
   * its net GST position (IRD Box 15) and a count of bank transactions in the period
   * that are not yet reconciled.
   *
   * **Box 15 is only present once the return has been calculated.** A draft that has
   * never been finalised reports `netGstPosition: null`. Use the entity detail endpoint
   * to get live, calculated box amounts for a draft.
   *
   * **Period and due dates are New Zealand calendar days** (`YYYY-MM-DD`), not UTC
   * instants. A GST period runs from the first moment of `dateFrom` to the last moment
   * of `dateTo`, both in NZ time.
   *
   * By default, draft returns whose period has not started yet are hidden, matching
   * what the Prosaic UI shows. Pass `includeFutureDrafts=true` to see them.
   *
   */
  list(params: GstReturnsListParams = {}, options: RequestOptions = {}): APIListPromise<GstReturnsListResponse> {
    return new APIListPromise(this.transport.request<GstReturnsListResponse>("GET", `/api/public/v1/gst-returns`, { query: params }, options), (page) => this.transport.request<GstReturnsListResponse>("GET", `/api/public/v1/gst-returns`, { query: { ...params, page } }, options));
  }
}

export class InvoicesResource {
  constructor(private readonly transport: Transport) {}
  /**
   * Create a finalised invoice
   * Creates a complete, finalised invoice for the specified entity. The
   * entity is taken from the URL; `status` cannot be supplied. Finalised
   * invoices are not automatically delivered to the recipient.
   *
   */
  create(entityId: string, params: InvoicesCreateParams, options: RequestOptions = {}): APIPromise<InvoicesCreateResponse> {
    return new APIPromise(this.transport.request<InvoicesCreateResponse>("POST", `/api/public/v1/entities/${pathParam(entityId)}/invoices`, { body: params }, options));
  }

  /**
   * Get an invoice by ID for an entity
   */
  retrieve(entityId: string, invoiceId: string, options: RequestOptions = {}): APIPromise<InvoicesRetrieveResponse> {
    return new APIPromise(this.transport.request<InvoicesRetrieveResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/invoices/${pathParam(invoiceId)}`, {}, options));
  }

  /**
   * List invoices
   * Returns invoices in the active workspace that the authenticated user can
   * access. Results are paginated and can be narrowed by client or entity.
   * When both filters are supplied, an invoice must match both.
   *
   */
  list(params: InvoicesListParams = {}, options: RequestOptions = {}): APIListPromise<InvoicesListResponse> {
    return new APIListPromise(this.transport.request<InvoicesListResponse>("GET", `/api/public/v1/invoices`, { query: params }, options), (page) => this.transport.request<InvoicesListResponse>("GET", `/api/public/v1/invoices`, { query: { ...params, page } }, options));
  }
}

export class JournalsResource {
  constructor(private readonly transport: Transport) {}
  /**
   * List manual journals
   * Returns paginated manual journals for the specified entity with optional date range filtering. Requires API key authentication and entity access. Only returns journals of type MANUAL (excludes automatic and reversal journals).
   */
  list(entityId: string, params: JournalsListParams = {}, options: RequestOptions = {}): APIListPromise<JournalsListResponse> {
    return new APIListPromise(this.transport.request<JournalsListResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/journals`, { query: params }, options), (page) => this.transport.request<JournalsListResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/journals`, { query: { ...params, page } }, options));
  }

  /**
   * Create a manual journal
   * Creates a new manual journal in either draft or posted status. By default, journals are automatically posted (status=POSTED).
   * Set `autoPost: false` to create in draft status (status=DRAFT), which allows for review before posting.
   *
   * The journal must have balanced debits and credits. Lines are validated against the entity's chart of accounts and tax rates.
   * Requires API key authentication and entity access.
   *
   * ## Prerequisites — Finding Tax Codes and Account Codes
   *
   * Before creating a journal, you need two pieces of information:
   *
   * - **Account codes**: Retrieve the entity's chart of accounts via `GET /api/public/v1/entities/{entityId}/charts`. Use the account `code` field (e.g., "2030") as the `entityAccountCode` in journal lines.
   * - **Tax rate IDs**: Retrieve the entity's tax rates via `GET /api/public/v1/entities` (filter by `entityId`). Use the `taxRates[].id` field as the `taxRateId` in journal lines. Common tax codes include GST15, EXEMPT, and ZERO.
   *
   * ## Dimensions (optional)
   *
   * Lines can be tagged with dimensions (tracking categories such as Property or Department) by passing
   * `dimensionOptionIds` on each line — an array of dimension option UUIDs, at most one option per
   * dimension. Retrieve the entity's dimensions and option ids via
   * `GET /api/public/v1/entities/{entityId}/dimensions`. Options must belong to the entity;
   * unknown option ids or two options from the same dimension are rejected with a 400. Tagged lines
   * drive the dimension filter and "Segment by" columns on financial reports.
   *
   */
  create(entityId: string, params: JournalsCreateParams, options: RequestOptions = {}): APIPromise<JournalsCreateResponse> {
    return new APIPromise(this.transport.request<JournalsCreateResponse>("POST", `/api/public/v1/entities/${pathParam(entityId)}/journals`, { body: params }, options));
  }

  /**
   * Attach files to an existing journal
   * Attaches one or more previously uploaded files to a journal. Files must already be uploaded to the entity via the file upload endpoint. Requires API key authentication and entity access.
   */
  attachFiles(entityId: string, journalId: string, params: JournalsAttachFilesParams, options: RequestOptions = {}): APIPromise<JournalsAttachFilesResponse> {
    return new APIPromise(this.transport.request<JournalsAttachFilesResponse>("POST", `/api/public/v1/entities/${pathParam(entityId)}/journals/${pathParam(journalId)}/attachments`, { body: params }, options));
  }

  /**
   * Void a journal
   * Voids a posted journal for the specified entity. Only posted journals can be voided. Requires API key authentication and entity access.
   */
  void(entityId: string, journalId: string, options: RequestOptions = {}): APIPromise<JournalsVoidResponse> {
    return new APIPromise(this.transport.request<JournalsVoidResponse>("PATCH", `/api/public/v1/entities/${pathParam(entityId)}/journals/${pathParam(journalId)}/void`, {}, options));
  }
}

export class LedgerResource {
  constructor(private readonly transport: Transport) {}
  /**
   * Get ledger entries
   * **Deprecated.** This was the original general ledger endpoint and has been replaced by the general ledger report endpoints. New integrations should use `GET /api/public/v1/entities/{entityId}/general-ledger/transaction` (flat entry list) or `GET /api/public/v1/entities/{entityId}/general-ledger/account` (grouped by account) instead. Returns paginated journal lines (ledger entries) for an entity with optional date range and account filtering. Only includes posted journals, excluding reversal entries.
   */
  list(entityId: string, params: LedgerListParams = {}, options: RequestOptions = {}): APIListPromise<LedgerListResponse> {
    return new APIListPromise(this.transport.request<LedgerListResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/ledger`, { query: params }, options), (page) => this.transport.request<LedgerListResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/ledger`, { query: { ...params, page } }, options));
  }
}

export class ReportsResource {
  constructor(private readonly transport: Transport) {}
  /**
   * Get balance sheet report
   * Returns a balance sheet report for the specified entity.
   */
  balanceSheet(entityId: string, params: ReportsBalanceSheetParams = {}, options: RequestOptions = {}): APIPromise<ReportsBalanceSheetResponse> {
    return new APIPromise(this.transport.request<ReportsBalanceSheetResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/reports/balance-sheet`, { query: params }, options));
  }

  /**
   * Get current accounts report
   * Returns a current accounts report for the specified entity.
   */
  currentAccounts(entityId: string, params: ReportsCurrentAccountsParams = {}, options: RequestOptions = {}): APIPromise<ReportsCurrentAccountsResponse> {
    return new APIPromise(this.transport.request<ReportsCurrentAccountsResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/reports/current-accounts`, { query: params }, options));
  }

  /**
   * Get depreciation schedule report
   * Returns a depreciation schedule report for the specified entity.
   */
  depreciationSchedule(entityId: string, params: ReportsDepreciationScheduleParams, options: RequestOptions = {}): APIPromise<ReportsDepreciationScheduleResponse> {
    return new APIPromise(this.transport.request<ReportsDepreciationScheduleResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/reports/depreciation-schedule`, { query: params }, options));
  }

  /**
   * Get profit & loss report
   * Returns a profit & loss report for the specified entity.
   */
  profitLoss(entityId: string, params: ReportsProfitLossParams = {}, options: RequestOptions = {}): APIPromise<ReportsProfitLossResponse> {
    return new APIPromise(this.transport.request<ReportsProfitLossResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/reports/profit-loss`, { query: params }, options));
  }

  /**
   * Get trial balance report
   * Returns a trial balance report for the specified entity. Supports cumulative
   * and movement modes, optional period comparisons, and flexible grouping.
   *
   * **Cumulative mode** (default): Balance sheet accounts show all-time cumulative
   * balances; P&L accounts show current financial year activity.
   *
   * **Movement mode**: Shows only journal activity within a specified date range
   * for all account types. Use `movementStartDate` and `movementEndDate` to specify
   * the range; when omitted the service defaults to the current financial year.
   *
   */
  trialBalance(entityId: string, params: ReportsTrialBalanceParams = {}, options: RequestOptions = {}): APIPromise<ReportsTrialBalanceResponse> {
    return new APIPromise(this.transport.request<ReportsTrialBalanceResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/trial-balance`, { query: params }, options));
  }
}

export class TransactionsResource {
  constructor(private readonly transport: Transport) {}
  /**
   * List bank transactions
   * Returns paginated bank transactions for the specified entity with optional date range filtering. Requires API key authentication and entity access.
   */
  list(entityId: string, params: TransactionsListParams = {}, options: RequestOptions = {}): APIListPromise<TransactionsListResponse> {
    return new APIListPromise(this.transport.request<TransactionsListResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/transactions`, { query: params }, options), (page) => this.transport.request<TransactionsListResponse>("GET", `/api/public/v1/entities/${pathParam(entityId)}/transactions`, { query: { ...params, page } }, options));
  }

  /**
   * Reconcile a bank transaction
   * Reconciles a single bank transaction by creating journal entries with automatic tax calculations.
   *
   * ## Tax Handling
   *
   * The system supports three tax modes:
   *
   * ### NO_TAX
   * - No tax calculations are performed
   * - Assignment amounts are used as-is in journal entries
   * - Use for transfers between accounts or tax-exempt transactions
   *
   * ### TAX_INCLUSIVE (Default for NZ)
   * - Assignment amounts **include** tax
   * - System automatically splits the amount into base and tax components
   * - **Formula**: `baseAmount = amount / (1 + rate)`, `taxAmount = amount - baseAmount`
   * - **Example**: $115 with GST 15% → $100 base + $15 GST
   * - Common for expenses where you know the total paid (including GST)
   *
   * ### TAX_EXCLUSIVE
   * - Assignment amounts **exclude** tax
   * - System adds tax on top of the specified amount
   * - **Formula**: `taxAmount = amount × rate`, `totalAmount = amount + taxAmount`
   * - **Example**: $1000 with GST 15% → $1000 base + $150 GST = $1150 total
   * - Common for income where you invoice a base amount plus GST
   *
   * ## Prerequisites — Finding Tax Codes and Account Codes
   *
   * Before reconciling, you need two pieces of information:
   *
   * - **Account codes**: Retrieve the entity's chart of accounts via `GET /api/public/v1/entities/{entityId}/charts`. Use the `code` field (e.g., "2030") in the assignment `code` field below.
   * - **Tax codes**: Retrieve the entity's tax rates via `GET /api/public/v1/entities` (filter by `entityId`). The `taxRates[].code` field (e.g., "GST15", "EXEMPT", "ZERO") is used in the assignment `taxCode` field below.
   *
   * ## Integration Flow
   *
   * 1. **GET `/entities`** - Retrieve entity with available `taxRates[]`
   * 2. **GET `/entities/{entityId}/transactions`** - List unreconciled transactions
   * 3. **POST `/entities/{entityId}/transactions/{transactionId}/reconcile`** - Reconcile with:
   *    - Select appropriate account (from entity's chart of accounts)
   *    - Select tax rate using `taxCode` from step 1
   *    - Specify `taxMode` based on whether your amounts include/exclude tax
   * 4. System validates and creates journal entries with tax lines automatically
   *
   * ## Important Notes
   *
   * - The transaction amount must equal the sum of assignment debits/credits
   * - Each assignment line requires a valid `taxCode` from the entity's tax rates
   * - Generated tax lines are automatically created and linked to parent lines
   * - Use the entity's `defaultTaxAccountId` (GST account) for tax collection/payment
   *
   */
  reconcile(entityId: string, transactionId: string, params: TransactionsReconcileParams, options: RequestOptions = {}): APIPromise<TransactionsReconcileResponse> {
    return new APIPromise(this.transport.request<TransactionsReconcileResponse>("POST", `/api/public/v1/entities/${pathParam(entityId)}/transactions/${pathParam(transactionId)}/reconcile`, { body: params }, options));
  }

  /**
   * Reverse a bank transaction reconciliation
   * Reverses a previously reconciled bank transaction, making it available for reconciliation again.
   *
   * ## Business Rules
   *
   * - Only reconciled transactions can be reversed
   * - Only bank reconciliation journals (AUTOMATIC type) can be reversed
   * - The journal must be in POSTED status
   * - The transaction must belong to the specified entity
   *
   * ## What Happens During Reversal
   *
   * 1. Creates a reversal journal entry that negates the original reconciliation
   * 2. Updates the reconciliation status to REVERSED
   * 3. Makes the bank transaction available for reconciliation again
   * 4. Maintains full audit trail of the reversal
   *
   * ## Integration Flow
   *
   * 1. **GET `/entities/{entityId}/transactions`** - Find reconciled transactions to reverse
   * 2. **POST `/entities/{entityId}/transactions/{transactionId}/reverse`** - Reverse the reconciliation
   * 3. The transaction becomes available for new reconciliation via the reconcile endpoint
   *
   */
  reverse(entityId: string, transactionId: string, params: TransactionsReverseParams = {}, options: RequestOptions = {}): APIPromise<TransactionsReverseResponse> {
    return new APIPromise(this.transport.request<TransactionsReverseResponse>("POST", `/api/public/v1/entities/${pathParam(entityId)}/transactions/${pathParam(transactionId)}/reverse`, { body: params }, options));
  }

  /**
   * Reconcile bank transactions (bulk or single)
   * Reconciles one or more bank transactions by creating journal entries with automatic tax calculations.
   * All requests are processed asynchronously via background jobs.
   *
   * ## Processing
   *
   * - All transactions are queued for background processing
   * - Returns `requestId` for tracking
   * - Transactions are grouped by entity automatically
   * - Separate jobs created per entity for parallel processing
   *
   * ## Entity Determination
   *
   * Unlike other endpoints, this endpoint does **not** require an `entityId` in the path.
   * Instead, entities are determined from the transactions themselves:
   * - Each transaction is associated with a bank account
   * - Each bank account belongs to an entity
   * - Transactions can span multiple entities (separate jobs per entity)
   *
   * ## Tax Handling
   *
   * The system supports three tax modes:
   *
   * ### NO_TAX
   * - No tax calculations are performed
   * - Assignment amounts are used as-is in journal entries
   * - Use for transfers between accounts or tax-exempt transactions
   *
   * ### TAX_INCLUSIVE (Default for NZ)
   * - Assignment amounts **include** tax
   * - System automatically splits the amount into base and tax components
   * - **Formula**: `baseAmount = amount / (1 + rate)`, `taxAmount = amount - baseAmount`
   * - **Example**: $115 with GST 15% → $100 base + $15 GST
   * - Common for expenses where you know the total paid (including GST)
   *
   * ### TAX_EXCLUSIVE
   * - Assignment amounts **exclude** tax
   * - System adds tax on top of the specified amount
   * - **Formula**: `taxAmount = amount × rate`, `totalAmount = amount + taxAmount`
   * - **Example**: $1000 with GST 15% → $1000 base + $150 GST = $1150 total
   * - Common for income where you invoice a base amount plus GST
   *
   * ## Important Notes
   *
   * - Maximum 500 transactions per request
   * - Each transaction amount must equal the sum of its assignment debits/credits
   * - Each assignment line requires a valid `taxCode` from the entity's tax rates
   * - Generated tax lines are automatically created and linked to parent lines
   * - Transactions already being processed will return a 409 conflict error
   *
   */
  reconcileBulk(params: TransactionsReconcileBulkParams, options: RequestOptions = {}): APIPromise<TransactionsReconcileBulkResponse> {
    return new APIPromise(this.transport.request<TransactionsReconcileBulkResponse>("POST", `/api/public/v1/transactions/reconcile`, { body: params }, options));
  }
}

export class ExtensionsResource {
  constructor(private readonly transport: Transport) {}
  /**
   * Make an outbound request through an extension connection
   * Performs one guarded HTTP request to a third party on behalf of an
   * extension. The credential for the named connection is attached
   * server-side — the caller never supplies or receives it.
   *
   * Requires a token minted for the extension named in the path. API keys
   * and ordinary user tokens are rejected.
   *
   * Requires an extension-scoped token whose ext_id matches extensionId. Ordinary API keys and user OAuth tokens cannot call this endpoint. The embedded status/ok describe the upstream response, which can fail inside HTTP 200.
   */
  request(extensionId: string, params: ExtensionsRequestParams, options: RequestOptions = {}): APIPromise<ExtensionsRequestResponse> {
    return new APIPromise(this.transport.request<ExtensionsRequestResponse>("POST", `/api/public/v1/extensions/${pathParam(extensionId)}/http`, { body: params }, options));
  }
}

export class GlobalAccountsResource {
  constructor(private readonly transport: Transport) {}
  /**
   * List all global accounts
   * Returns the full system account library (global accounts). These are the master accounts from which templates are built. Requires API key authentication.
   */
  list(options: RequestOptions = {}): APIListPromise<GlobalAccountsListResponse> {
    return new APIListPromise(this.transport.request<GlobalAccountsListResponse>("GET", `/api/public/v1/global-accounts`, {}, options));
  }
}

export class MeResource {
  constructor(private readonly transport: Transport) {}
  /**
   * Get current user information
   * Returns the authenticated user's information including their workspaces
   * and whether they have connected bank accounts.
   *
   * This endpoint is intended for the Expenses app to determine:
   * - User type (accountant vs individual) based on workspace roles
   * - Whether to prompt for bank account connection
   * - Which workspaces/clients the user has access to
   *
   */
  retrieve(options: RequestOptions = {}): APIPromise<MeRetrieveResponse> {
    return new APIPromise(this.transport.request<MeRetrieveResponse>("GET", `/api/public/v1/me`, {}, options));
  }
}

export class RulesResource {
  constructor(private readonly transport: Transport) {}
  /**
   * List rules
   * Returns rules in the workspace associated with the API key. By default returns only active rules.
   */
  list(params: RulesListParams = {}, options: RequestOptions = {}): APIListPromise<RulesListResponse> {
    return new APIListPromise(this.transport.request<RulesListResponse>("GET", `/api/public/v1/rules`, { query: params }, options), (page) => this.transport.request<RulesListResponse>("GET", `/api/public/v1/rules`, { query: { ...params, page } }, options));
  }

  /**
   * Create a rule
   * Creates a new rule in the workspace associated with the API key.
   */
  create(params: RulesCreateParams, options: RequestOptions = {}): APIPromise<RulesCreateResponse> {
    return new APIPromise(this.transport.request<RulesCreateResponse>("POST", `/api/public/v1/rules`, { body: params }, options));
  }

  /**
   * Soft-delete a rule
   */
  del(ruleId: string, options: RequestOptions = {}): APIPromise<RulesDelResponse> {
    return new APIPromise(this.transport.request<RulesDelResponse>("DELETE", `/api/public/v1/rules/${pathParam(ruleId)}`, {}, options));
  }

  /**
   * Get a rule by ID
   */
  retrieve(ruleId: string, options: RequestOptions = {}): APIPromise<RulesRetrieveResponse> {
    return new APIPromise(this.transport.request<RulesRetrieveResponse>("GET", `/api/public/v1/rules/${pathParam(ruleId)}`, {}, options));
  }

  /**
   * Update a rule
   */
  update(ruleId: string, params: RulesUpdateParams = {}, options: RequestOptions = {}): APIPromise<RulesUpdateResponse> {
    return new APIPromise(this.transport.request<RulesUpdateResponse>("PATCH", `/api/public/v1/rules/${pathParam(ruleId)}`, { body: params }, options));
  }
}

export class ScheduledTasksResource {
  constructor(private readonly transport: Transport) {}
  /**
   * List scheduled tasks
   * Returns the Prosaic AI scheduled tasks in the workspace associated with the API key, newest first.
   */
  list(options: RequestOptions = {}): APIListPromise<ScheduledTasksListResponse> {
    return new APIListPromise(this.transport.request<ScheduledTasksListResponse>("GET", `/api/public/v1/scheduled-tasks`, {}, options));
  }

  /**
   * Create a scheduled task
   * Creates a Prosaic AI scheduled task. The task runs its prompt unattended on the
   * given cadence, in Pacific/Auckland time.
   *
   * `emailTo` must be the address of a member of the same workspace — a task is a
   * standing instruction to send a workspace's books somewhere, so arbitrary
   * recipients are refused with 400.
   *
   */
  create(params: ScheduledTasksCreateParams, options: RequestOptions = {}): APIPromise<ScheduledTasksCreateResponse> {
    return new APIPromise(this.transport.request<ScheduledTasksCreateResponse>("POST", `/api/public/v1/scheduled-tasks`, { body: params }, options));
  }

  /**
   * Delete a scheduled task
   * Soft-deletes a Prosaic AI scheduled task and unregisters its schedule. The chat
   * sessions its past runs produced are kept — they are the record of what was spent
   * and what was changed.
   *
   */
  del(id: string, options: RequestOptions = {}): APIPromise<ScheduledTasksDelResponse> {
    return new APIPromise(this.transport.request<ScheduledTasksDelResponse>("DELETE", `/api/public/v1/scheduled-tasks/${pathParam(id)}`, {}, options));
  }

  /**
   * Get a scheduled task
   * Returns a single Prosaic AI scheduled task, including how its last run went.
   */
  retrieve(id: string, options: RequestOptions = {}): APIPromise<ScheduledTasksRetrieveResponse> {
    return new APIPromise(this.transport.request<ScheduledTasksRetrieveResponse>("GET", `/api/public/v1/scheduled-tasks/${pathParam(id)}`, {}, options));
  }

  /**
   * Update a scheduled task
   * Updates a Prosaic AI scheduled task. Every field is optional; omitted fields are
   * left as they are. Supplying `schedule` replaces the cadence, and `isEnabled`
   * is how a task is paused or resumed.
   *
   */
  update(id: string, params: ScheduledTasksUpdateParams = {}, options: RequestOptions = {}): APIPromise<ScheduledTasksUpdateResponse> {
    return new APIPromise(this.transport.request<ScheduledTasksUpdateResponse>("PATCH", `/api/public/v1/scheduled-tasks/${pathParam(id)}`, { body: params }, options));
  }

  /**
   * Run a scheduled task now
   * Queues one immediate run of the task without touching its schedule. The run is
   * enqueued rather than executed inline, so a 202 means "accepted", not "finished" —
   * poll the task and read `lastRunAt` / `lastStatus` to see how it went.
   *
   * Note the run executes with the task's own settings, which includes writing to the
   * books unattended when `autoApproveWrites` is true.
   *
   */
  run(id: string, options: RequestOptions = {}): APIPromise<ScheduledTasksRunResponse> {
    return new APIPromise(this.transport.request<ScheduledTasksRunResponse>("POST", `/api/public/v1/scheduled-tasks/${pathParam(id)}/run`, {}, options));
  }
}

export class Resources {
  readonly version: VersionResource;
  readonly charts: ChartsResource;
  readonly clients: ClientsResource;
  readonly contacts: ContactsResource;
  readonly entities: EntitiesResource;
  readonly changeSets: ChangeSetsResource;
  readonly entityAccounts: EntityAccountsResource;
  readonly dimensions: DimensionsResource;
  readonly files: FilesResource;
  readonly fixedAssetTypes: FixedAssetTypesResource;
  readonly fixedAssets: FixedAssetsResource;
  readonly generalLedger: GeneralLedgerResource;
  readonly gstReturns: GstReturnsResource;
  readonly invoices: InvoicesResource;
  readonly journals: JournalsResource;
  readonly ledger: LedgerResource;
  readonly reports: ReportsResource;
  readonly transactions: TransactionsResource;
  readonly extensions: ExtensionsResource;
  readonly globalAccounts: GlobalAccountsResource;
  readonly me: MeResource;
  readonly rules: RulesResource;
  readonly scheduledTasks: ScheduledTasksResource;
  constructor(transport: Transport) {
    this.version = new VersionResource(transport);
    this.charts = new ChartsResource(transport);
    this.clients = new ClientsResource(transport);
    this.contacts = new ContactsResource(transport);
    this.entities = new EntitiesResource(transport);
    this.changeSets = new ChangeSetsResource(transport);
    this.entityAccounts = new EntityAccountsResource(transport);
    this.dimensions = new DimensionsResource(transport);
    this.files = new FilesResource(transport);
    this.fixedAssetTypes = new FixedAssetTypesResource(transport);
    this.fixedAssets = new FixedAssetsResource(transport);
    this.generalLedger = new GeneralLedgerResource(transport);
    this.gstReturns = new GstReturnsResource(transport);
    this.invoices = new InvoicesResource(transport);
    this.journals = new JournalsResource(transport);
    this.ledger = new LedgerResource(transport);
    this.reports = new ReportsResource(transport);
    this.transactions = new TransactionsResource(transport);
    this.extensions = new ExtensionsResource(transport);
    this.globalAccounts = new GlobalAccountsResource(transport);
    this.me = new MeResource(transport);
    this.rules = new RulesResource(transport);
    this.scheduledTasks = new ScheduledTasksResource(transport);
  }
}
