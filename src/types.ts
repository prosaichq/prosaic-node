export interface paths {
    "/api/public/v1/charts/{chartId}/accounts/{accountId}/delete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Delete a single account from a chart of accounts template
         * @description Removes one account from a chart of accounts template without resending the full account list.
         *     The removal propagates to every entity using the template. Accounts that have journal entries,
         *     child accounts, or are system accounts cannot be removed. `accountId` is the TemplateAccount ID
         *     from `GET /charts/{chartId}`. Requires API key authentication.
         */
        post: operations["charts.deleteAccount"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/charts/{chartId}/accounts/{accountId}/update": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Update a single account in a chart of accounts template
         * @description Updates one account in a chart of accounts template without resending the full account list.
         *     Supports `name`, `description`, `taxCode`, `mappedCode` and `code` (rename, kept under the same
         *     parent). A code rename cascades non-destructively to every entity account derived from this
         *     template account (balances and customizations are preserved). Changes propagate to all entities
         *     using the template. Omitted fields preserve their existing values; send `description: null` to
         *     clear the description. `accountId` is the TemplateAccount ID from `GET /charts/{chartId}`.
         *     Requires API key authentication.
         */
        post: operations["charts.updateAccount"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/charts/{chartId}/accounts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Add a single account to a chart of accounts template
         * @description Adds one account to a chart of accounts template without resending the full account list. To
         *     add a top-level (parent) account, provide its global account `code`; to add a custom child
         *     account, provide `code`, `name`, and `parentCode` (the child code must be `{parentCode}.{digits}`).
         *     The addition propagates to every entity using the template. Requires API key authentication.
         */
        post: operations["charts.createAccount"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/charts/{chartId}/delete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Delete a chart of accounts template
         * @description Deletes a chart of accounts template. Cannot delete templates with assigned entities. Requires API key authentication.
         */
        post: operations["charts.del"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/charts/{chartId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get chart of accounts template accounts
         * @description Returns paginated accounts from a chart-of-accounts **template** (the read-only blueprint entities are provisioned from). When `includeHidden=true`, also returns global accounts not in the template with `isIncluded=false`. Requires API key authentication.
         *
         *     **Important**: The `id` values returned by this endpoint are *template account* IDs (`TemplateAccount.id`). They are **not** the IDs of an entity's actual GL accounts — do not use them to post journals or look up reconciliation activity.
         *
         *     To fetch the chart of accounts for a specific entity (including bank-account-linked accounts and any custom accounts), use `GET /api/public/v1/entities/{entityId}/charts`. The bank-account-to-GL linkage is also embedded on each entity's bank account at `bankAccounts[].entityAccount` in the `GET /api/public/v1/entities` response.
         *
         *     **Tax codes**: The `taxCode` field is returned as the human-readable tax *name* (e.g. `"15% GST on Income"`, or `"No GST"` when unset), not the machine code. When creating or updating a template you must pass the machine *code* instead (`NZ_GST_15_INC`, `NZ_GST_15_EXP`, `NZ_GST_0_NONE`, `NZ_GST_0_ZERO`), so convert the name back to its code before writing.
         */
        get: operations["charts.listAccounts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/charts/{chartId}/update": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Update a chart of accounts template
         * @description Updates a chart of accounts template. When `accounts` is provided it fully replaces the
         *     template's account list (delegates to updateAccountTemplateAccounts and propagates to all
         *     entities). When `accounts` is omitted, only the provided template metadata (`name`,
         *     `description`) is updated and accounts are left untouched. Omit a metadata field to preserve
         *     its existing value, or send `description: null` to clear the description. A full replacement
         *     list must still contain every
         *     system account (`GET /api/public/v1/global-accounts`, `isSystem: true`) with
         *     `isIncluded: true` — otherwise the request fails with `SYSTEM_ACCOUNT_VALIDATION` listing
         *     all missing accounts. Set `includeSystemAccounts: true` to carry over any omitted system
         *     accounts automatically. For surgical single-account changes use the
         *     `/charts/{chartId}/accounts` endpoints instead. Requires API key authentication.
         *
         *     **Tax codes**: The `taxCode` field expects the machine code, not the human-readable tax name.
         *     Passing a name (e.g. `"15% GST on Income"`) is stored verbatim and resolves to null wherever the
         *     code is looked up. Valid codes are `NZ_GST_15_INC` (15% GST on Income), `NZ_GST_15_EXP`
         *     (15% GST on Expenses), `NZ_GST_0_NONE` (No GST), and `NZ_GST_0_ZERO` (Zero-rated GST). Note that
         *     `GET /api/public/v1/charts/{chartId}` returns the human-readable name on read — convert it back to
         *     the machine code before writing.
         *
         *     **Field preserve/clear semantics**: For each account, omitting a field (`description`, `taxCode`,
         *     `mappedCode`) preserves its existing value, while an explicit null clears it (taxCode clears to
         *     `NZ_GST_0_NONE`).
         */
        post: operations["charts.update"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/charts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List all chart of accounts templates
         * @description Returns all chart of accounts templates in the workspace. Requires API key authentication.
         */
        get: operations["charts.list"];
        put?: never;
        /**
         * Create a chart of accounts template
         * @description Creates a new chart of accounts template in the workspace. Every system global
         *     account (see `GET /api/public/v1/global-accounts`, `isSystem: true`) must be present
         *     in `accounts` with `isIncluded: true` — otherwise the request fails with
         *     `SYSTEM_ACCOUNT_VALIDATION` listing all missing accounts. Set
         *     `includeSystemAccounts: true` to have any omitted system accounts added
         *     automatically from their global definitions. Requires API key authentication.
         *
         *     **Tax codes**: The `taxCode` field expects the machine code, not the human-readable tax name.
         *     Passing a name (e.g. `"15% GST on Income"`) is stored verbatim and resolves to null wherever the
         *     code is looked up. Valid codes are `NZ_GST_15_INC` (15% GST on Income), `NZ_GST_15_EXP`
         *     (15% GST on Expenses), `NZ_GST_0_NONE` (No GST), and `NZ_GST_0_ZERO` (Zero-rated GST). Omit
         *     `taxCode` or set it to null to default to `NZ_GST_0_NONE` (No GST).
         *
         *     **Description defaults**: `description` is optional per account; omitting it (or null) leaves
         *     the account description empty.
         */
        post: operations["charts.create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/clients/{clientId}/bank-accounts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List client's bank accounts
         * @description Returns all bank accounts belonging to the specified client.
         *
         *     Access control:
         *     - Authenticated user must be the client themselves, OR
         *     - Authenticated user must be in the same workspace as the client (accountant/advisor)
         */
        get: operations["clients.listBankAccounts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/clients/{clientId}/onboarding": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** clients.createOnboardingLink */
        post: operations["clients.createOnboardingLink"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/clients/{clientId}/transactions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List client's bank transactions
         * @description Returns paginated bank transactions for the specified client.
         *
         *     Access control:
         *     - Authenticated user must be the client themselves, OR
         *     - Authenticated user must be in the same workspace as the client (accountant/advisor)
         *
         *     Supports filtering by:
         *     - Bank account IDs (comma-separated)
         *     - Date range (dateFrom, dateTo)
         *     - Reconciliation status (reconciled | unreconciled)
         */
        get: operations["clients.listTransactions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/clients": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List clients
         * @description Returns client users (`client` and `standard_user` roles) in the workspace tied to the token.
         *     Callers authenticated as client or standard_user only ever receive their own client record,
         *     even within a shared workspace. Accountant-style roles receive the full list (subject to filters).
         */
        get: operations["clients.list"];
        put?: never;
        /**
         * Create a client
         * @description Creates a new client in the workspace associated with the API key. If a client with the same email already exists, returns the existing client.
         */
        post: operations["clients.create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/change-sets": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Submit a change-set (proposed financial writes) for an entity
         * @description Records an agent-proposed set of write operations (`journal.post` and/or `reconcile`) as a PENDING change-set. Idempotent on the content hash — re-submitting identical content returns the existing change-set. The set is NOT committed here; an admin approves it (L1) before it hits the ledger. The read-only box token is permitted on this single write path and remains pinned to its entity.
         */
        post: operations["changeSets.create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/charts/{accountId}/delete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Delete or hide an entity account
         * @description Deletes a custom child account or hides a template-based account by creating an exclusion. Parent accounts cannot be deleted.
         */
        post: operations["entityAccounts.del"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/charts/{accountId}/reset": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Reset an entity account to template defaults
         * @description Resets all customized fields on a template-based entity account back to the template values and clears customization flags. No request body required.
         */
        post: operations["entityAccounts.reset"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/charts/{accountId}/update": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Update an entity account
         * @description Updates an entity account's editable fields. Parent accounts can only update taxCode and mappedCode. Bank account-linked accounts have additional restrictions.
         */
        post: operations["entityAccounts.update"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/charts/excluded/{templateAccountId}/restore": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Restore a hidden/excluded template account
         * @description Restores an excluded template account by removing the exclusion and recreating the entity account from the template. No request body required.
         */
        post: operations["entityAccounts.restore"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/charts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List chart of accounts for an entity
         * @description Returns chart account codes configured for the specified entity. Supports filtering by system accounts and excluded accounts. Requires API key authentication and entity access.
         */
        get: operations["entityAccounts.list"];
        put?: never;
        /**
         * Create a child account in the chart of accounts
         * @description Creates a new child (sub) account under an existing parent account. Only 2-level hierarchy is supported (parent → child, no grandchildren).
         *     Parent account can be referenced by ID, code, or mappedCode to support external system integrations.
         */
        post: operations["entityAccounts.create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/dimensions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List dimensions
         * @description Returns the entity's active dimensions (tracking categories such as Property or
         *     Department) with their active options. Use each option's `id` as a value in
         *     `dimensionOptionIds` when creating journals
         *     (`POST /api/public/v1/entities/{entityId}/journals`) or reconciling transactions
         *     (`POST /api/public/v1/entities/{entityId}/transactions/{transactionId}/reconcile`).
         *
         *     Archived dimensions and archived options are excluded. Requires API key
         *     authentication and entity access.
         */
        get: operations["dimensions.list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/files/upload": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Upload a file
         * @description Uploads a file for an entity. Files must be validated against size (20MB) and type restrictions. Returns a fileId that can be used when creating or attaching to journals. Requires API key authentication and entity access.
         */
        post: operations["files.upload"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/fixed-asset-types": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List fixed asset types (categories) for an entity
         * @description Returns all fixed asset types (categories) configured for the specified entity.
         *     Asset types define default depreciation settings and account mappings.
         *     Includes mappedCode on accounts to support external system integrations (e.g., Xero).
         */
        get: operations["fixedAssetTypes.list"];
        put?: never;
        /**
         * Create a new fixed asset type (category)
         * @description Creates a new fixed asset type for the specified entity.
         *     Asset types define default depreciation settings and account mappings for fixed assets.
         */
        post: operations["fixedAssetTypes.create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/fixed-assets/{assetId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a single fixed asset by ID
         * @description Returns a single fixed asset by its ID for the specified entity.
         *     Includes asset details, depreciation information, and current book value.
         */
        get: operations["fixedAssets.retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/fixed-assets": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List fixed assets for an entity
         * @description Returns paginated fixed assets for the specified entity.
         *     Includes asset details, depreciation information, and current book values.
         */
        get: operations["fixedAssets.list"];
        put?: never;
        /**
         * Create a new fixed asset
         * @description Creates a new fixed asset for the specified entity.
         *     Can create the asset as either a draft or immediately as active.
         *     When creating as active, all required fields must be provided and pass validation.
         */
        post: operations["fixedAssets.create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/general-ledger/account": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get general ledger grouped by account
         * @description Returns journal entries grouped by account with running balances and period totals. Supports various period presets and custom date ranges.
         */
        get: operations["generalLedger.byAccount"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/general-ledger/transaction": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get general ledger as flat entry list
         * @description Returns a flat list of journal entries with embedded account metadata. Entries are ordered by date, createdAt, and id for deterministic results.
         */
        get: operations["generalLedger.byTransaction"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/gst-returns/{gstReturnId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a single GST return with its IRD box amounts
         * @description Returns one GST return, including the IRD return boxes 5 to 15.
         *
         *     **Where the numbers come from depends on the return's status**, and `amountsSource`
         *     says which. A `draft` return has no persisted totals, so the boxes are calculated
         *     live from posted journal lines and will move as coding changes — `amountsSource` is
         *     `calculated`. Every other status reads the snapshot taken at finalisation, which is
         *     what was, or will be, filed with IRD — `amountsSource` is `finalised`.
         *
         *     **Period and due dates are New Zealand calendar days** (`YYYY-MM-DD`), not UTC instants.
         *
         *     IRD submission keys, raw IRD response payloads and amendment original values are
         *     internal and are never returned.
         */
        get: operations["gstReturns.retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/gst-returns": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List GST returns for an entity
         * @description Returns paginated GST returns for the specified entity, newest period first.
         *
         *     Each row carries the return's lifecycle status, its period, its filing due date,
         *     its net GST position (IRD Box 15) and a count of bank transactions in the period
         *     that are not yet reconciled.
         *
         *     **Box 15 is only present once the return has been calculated.** A draft that has
         *     never been finalised reports `netGstPosition: null`. Use the detail endpoint to get
         *     live, calculated box amounts for a draft.
         *
         *     **Period and due dates are New Zealand calendar days** (`YYYY-MM-DD`), not UTC
         *     instants. A GST period runs from the first moment of `dateFrom` to the last moment
         *     of `dateTo`, both in NZ time.
         *
         *     By default, draft returns whose period has not started yet are hidden, matching
         *     what the Prosaic UI shows. Pass `includeFutureDrafts=true` to see them.
         */
        get: operations["gstReturns.listForEntity"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/invoices/{invoiceId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get an invoice by ID for an entity */
        get: operations["invoices.retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/invoices": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a finalised invoice
         * @description Creates a complete, finalised invoice for the specified entity. The
         *     entity is taken from the URL; `status` cannot be supplied. Finalised
         *     invoices are not automatically delivered to the recipient.
         */
        post: operations["invoices.create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/journals/{journalId}/attachments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Attach files to an existing journal
         * @description Attaches one or more previously uploaded files to a journal. Files must already be uploaded to the entity via the file upload endpoint. Requires API key authentication and entity access.
         */
        post: operations["journals.attachFiles"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/journals/{journalId}/void": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Void a journal
         * @description Voids a posted journal for the specified entity. Only posted journals can be voided. Requires API key authentication and entity access.
         */
        patch: operations["journals.void"];
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/journals": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List manual journals
         * @description Returns paginated manual journals for the specified entity with optional date range filtering. Requires API key authentication and entity access. Only returns journals of type MANUAL (excludes automatic and reversal journals).
         */
        get: operations["journals.list"];
        put?: never;
        /**
         * Create a manual journal
         * @description Creates a new manual journal in either draft or posted status. By default, journals are automatically posted (status=POSTED).
         *     Set `autoPost: false` to create in draft status (status=DRAFT), which allows for review before posting.
         *
         *     The journal must have balanced debits and credits. Lines are validated against the entity's chart of accounts and tax rates.
         *     Requires API key authentication and entity access.
         *
         *     ## Prerequisites — Finding Tax Codes and Account Codes
         *
         *     Before creating a journal, you need two pieces of information:
         *
         *     - **Account codes**: Retrieve the entity's chart of accounts via `GET /api/public/v1/entities/{entityId}/charts`. Use the account `code` field (e.g., "2030") as the `entityAccountCode` in journal lines.
         *     - **Tax rate IDs**: Retrieve the entity's tax rates via `GET /api/public/v1/entities` (filter by `entityId`). Use the `taxRates[].id` field as the `taxRateId` in journal lines. Common tax codes include GST15, EXEMPT, and ZERO.
         *
         *     ## Dimensions (optional)
         *
         *     Lines can be tagged with dimensions (tracking categories such as Property or Department) by passing
         *     `dimensionOptionIds` on each line — an array of dimension option UUIDs, at most one option per
         *     dimension. Retrieve the entity's dimensions and option ids via
         *     `GET /api/public/v1/entities/{entityId}/dimensions`. Options must belong to the entity;
         *     unknown option ids or two options from the same dimension are rejected with a 400. Tagged lines
         *     drive the dimension filter and "Segment by" columns on financial reports.
         */
        post: operations["journals.create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/ledger": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get ledger entries
         * @deprecated
         * @description **Deprecated.** This was the original general ledger endpoint and has been replaced by the general ledger report endpoints. New integrations should use `GET /api/public/v1/entities/{entityId}/general-ledger/transaction` (flat entry list) or `GET /api/public/v1/entities/{entityId}/general-ledger/account` (grouped by account) instead. Returns paginated journal lines (ledger entries) for an entity with optional date range and account filtering. Only includes posted journals, excluding reversal entries.
         */
        get: operations["ledger.list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/reports/balance-sheet": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get balance sheet report
         * @description Returns a balance sheet report for the specified entity.
         */
        get: operations["reports.balanceSheet"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/reports/current-accounts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get current accounts report
         * @description Returns a current accounts report for the specified entity.
         */
        get: operations["reports.currentAccounts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/reports/depreciation-schedule": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get depreciation schedule report
         * @description Returns a depreciation schedule report for the specified entity.
         */
        get: operations["reports.depreciationSchedule"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/reports/profit-loss": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get profit & loss report
         * @description Returns a profit & loss report for the specified entity.
         */
        get: operations["reports.profitLoss"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/transactions/{transactionId}/reconcile": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Reconcile a bank transaction
         * @description Reconciles a single bank transaction by creating journal entries with automatic tax calculations.
         *
         *     ## Tax Handling
         *
         *     The system supports three tax modes:
         *
         *     ### NO_TAX
         *     - No tax calculations are performed
         *     - Assignment amounts are used as-is in journal entries
         *     - Use for transfers between accounts or tax-exempt transactions
         *
         *     ### TAX_INCLUSIVE (Default for NZ)
         *     - Assignment amounts **include** tax
         *     - System automatically splits the amount into base and tax components
         *     - **Formula**: `baseAmount = amount / (1 + rate)`, `taxAmount = amount - baseAmount`
         *     - **Example**: $115 with GST 15% → $100 base + $15 GST
         *     - Common for expenses where you know the total paid (including GST)
         *
         *     ### TAX_EXCLUSIVE
         *     - Assignment amounts **exclude** tax
         *     - System adds tax on top of the specified amount
         *     - **Formula**: `taxAmount = amount × rate`, `totalAmount = amount + taxAmount`
         *     - **Example**: $1000 with GST 15% → $1000 base + $150 GST = $1150 total
         *     - Common for income where you invoice a base amount plus GST
         *
         *     ## Prerequisites — Finding Tax Codes and Account Codes
         *
         *     Before reconciling, you need two pieces of information:
         *
         *     - **Account codes**: Retrieve the entity's chart of accounts via `GET /api/public/v1/entities/{entityId}/charts`. Use the `code` field (e.g., "2030") in the assignment `code` field below.
         *     - **Tax codes**: Retrieve the entity's tax rates via `GET /api/public/v1/entities` (filter by `entityId`). The `taxRates[].code` field (e.g., "GST15", "EXEMPT", "ZERO") is used in the assignment `taxCode` field below.
         *
         *     ## Integration Flow
         *
         *     1. **GET `/entities`** - Retrieve entity with available `taxRates[]`
         *     2. **GET `/entities/{entityId}/transactions`** - List unreconciled transactions
         *     3. **POST `/entities/{entityId}/transactions/{transactionId}/reconcile`** - Reconcile with:
         *        - Select appropriate account (from entity's chart of accounts)
         *        - Select tax rate using `taxCode` from step 1
         *        - Specify `taxMode` based on whether your amounts include/exclude tax
         *     4. System validates and creates journal entries with tax lines automatically
         *
         *     ## Important Notes
         *
         *     - The transaction amount must equal the sum of assignment debits/credits
         *     - Each assignment line requires a valid `taxCode` from the entity's tax rates
         *     - Generated tax lines are automatically created and linked to parent lines
         *     - Use the entity's `defaultTaxAccountId` (GST account) for tax collection/payment
         */
        post: operations["transactions.reconcile"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/transactions/{transactionId}/reverse": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Reverse a bank transaction reconciliation
         * @description Reverses a previously reconciled bank transaction, making it available for reconciliation again.
         *
         *     ## Business Rules
         *
         *     - Only reconciled transactions can be reversed
         *     - Only bank reconciliation journals (AUTOMATIC type) can be reversed
         *     - The journal must be in POSTED status
         *     - The transaction must belong to the specified entity
         *
         *     ## What Happens During Reversal
         *
         *     1. Creates a reversal journal entry that negates the original reconciliation
         *     2. Updates the reconciliation status to REVERSED
         *     3. Makes the bank transaction available for reconciliation again
         *     4. Maintains full audit trail of the reversal
         *
         *     ## Integration Flow
         *
         *     1. **GET `/entities/{entityId}/transactions`** - Find reconciled transactions to reverse
         *     2. **POST `/entities/{entityId}/transactions/{transactionId}/reverse`** - Reverse the reconciliation
         *     3. The transaction becomes available for new reconciliation via the reconcile endpoint
         */
        post: operations["transactions.reverse"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/transactions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List bank transactions
         * @description Returns paginated bank transactions for the specified entity with optional date range filtering. Requires API key authentication and entity access.
         */
        get: operations["transactions.list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities/{entityId}/trial-balance": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get trial balance report
         * @description Returns a trial balance report for the specified entity. Supports cumulative
         *     and movement modes, optional period comparisons, and flexible grouping.
         *
         *     **Cumulative mode** (default): Balance sheet accounts show all-time cumulative
         *     balances; P&L accounts show current financial year activity.
         *
         *     **Movement mode**: Shows only journal activity within a specified date range
         *     for all account types. Use `movementStartDate` and `movementEndDate` to specify
         *     the range; when omitted the service defaults to the current financial year.
         */
        get: operations["reports.trialBalance"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/entities": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List entities
         * @description Returns all entities that the authenticated user has access to within their workspace. Optionally filter by entity ID or client ID.
         *
         *     **Important**: This endpoint is the primary source for entity-level reference data including:
         *     - `taxRates[]` — Available tax rates (GST codes) for each entity. Use `taxRates[].code` when reconciling transactions or creating chart accounts.
         *     - `bankAccounts[]` — Linked bank accounts for each entity. Each bank account includes its linked GL account at `bankAccounts[].entityAccount` (use `entityAccount.id` when posting journals or reconciling against the bank).
         *     - `clients[]` — Client users associated with each entity.
         *
         *     **Chart of accounts**: The `currentTemplateId` field references the *template* the entity was provisioned from — it is **not** the entity's actual chart of accounts. To fetch the entity's GL accounts (including bank-account-linked accounts and any custom accounts), call `GET /api/public/v1/entities/{entityId}/charts`.
         */
        get: operations["entities.list"];
        put?: never;
        /**
         * Create an entity
         * @description Creates a new entity in the workspace associated with the API key. Supports full entity configuration including GST settings, client assignment, and bank account linking.
         */
        post: operations["entities.create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/extensions/{extensionId}/http": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Make an outbound request through an extension connection
         * @description Performs one guarded HTTP request to a third party on behalf of an
         *     extension. The credential for the named connection is attached
         *     server-side — the caller never supplies or receives it.
         *
         *     Requires a token minted for the extension named in the path. API keys
         *     and ordinary user tokens are rejected.
         *
         *     Requires an extension-scoped token whose ext_id matches extensionId. Ordinary API keys and user OAuth tokens cannot call this endpoint. The embedded status/ok describe the upstream response, which can fail inside HTTP 200.
         */
        post: operations["extensions.request"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/global-accounts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List all global accounts
         * @description Returns the full system account library (global accounts). These are the master accounts from which templates are built. Requires API key authentication.
         */
        get: operations["globalAccounts.list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/gst-returns": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List GST returns across the workspace
         * @description Returns paginated GST returns for every entity in the workspace the
         *     caller can see, newest period first. The entity-scoped endpoint
         *     (`/entities/{entityId}/gst-returns`) returns the same rows for one
         *     entity; use `entityId` here to narrow without changing endpoint.
         *
         *     Each row carries the return's lifecycle status, its period, its filing due date,
         *     its net GST position (IRD Box 15) and a count of bank transactions in the period
         *     that are not yet reconciled.
         *
         *     **Box 15 is only present once the return has been calculated.** A draft that has
         *     never been finalised reports `netGstPosition: null`. Use the entity detail endpoint
         *     to get live, calculated box amounts for a draft.
         *
         *     **Period and due dates are New Zealand calendar days** (`YYYY-MM-DD`), not UTC
         *     instants. A GST period runs from the first moment of `dateFrom` to the last moment
         *     of `dateTo`, both in NZ time.
         *
         *     By default, draft returns whose period has not started yet are hidden, matching
         *     what the Prosaic UI shows. Pass `includeFutureDrafts=true` to see them.
         */
        get: operations["gstReturns.list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/invoices": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List invoices
         * @description Returns invoices in the active workspace that the authenticated user can
         *     access. Results are paginated and can be narrowed by client or entity.
         *     When both filters are supplied, an invoice must match both.
         */
        get: operations["invoices.list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get current user information
         * @description Returns the authenticated user's information including their workspaces
         *     and whether they have connected bank accounts.
         *
         *     This endpoint is intended for the Expenses app to determine:
         *     - User type (accountant vs individual) based on workspace roles
         *     - Whether to prompt for bank account connection
         *     - Which workspaces/clients the user has access to
         */
        get: operations["me.retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * API version information
         * @description Returns information about the Prosaic Public API v1
         */
        get: operations["version.retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/rules/{ruleId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a rule by ID */
        get: operations["rules.retrieve"];
        put?: never;
        post?: never;
        /** Soft-delete a rule */
        delete: operations["rules.del"];
        options?: never;
        head?: never;
        /** Update a rule */
        patch: operations["rules.update"];
        trace?: never;
    };
    "/api/public/v1/rules": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List rules
         * @description Returns rules in the workspace associated with the API key. By default returns only active rules.
         */
        get: operations["rules.list"];
        put?: never;
        /**
         * Create a rule
         * @description Creates a new rule in the workspace associated with the API key.
         */
        post: operations["rules.create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/scheduled-tasks/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a scheduled task
         * @description Returns a single Prosaic AI scheduled task, including how its last run went.
         */
        get: operations["scheduledTasks.retrieve"];
        put?: never;
        post?: never;
        /**
         * Delete a scheduled task
         * @description Soft-deletes a Prosaic AI scheduled task and unregisters its schedule. The chat
         *     sessions its past runs produced are kept — they are the record of what was spent
         *     and what was changed.
         */
        delete: operations["scheduledTasks.del"];
        options?: never;
        head?: never;
        /**
         * Update a scheduled task
         * @description Updates a Prosaic AI scheduled task. Every field is optional; omitted fields are
         *     left as they are. Supplying `schedule` replaces the cadence, and `isEnabled`
         *     is how a task is paused or resumed.
         */
        patch: operations["scheduledTasks.update"];
        trace?: never;
    };
    "/api/public/v1/scheduled-tasks/{id}/run": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Run a scheduled task now
         * @description Queues one immediate run of the task without touching its schedule. The run is
         *     enqueued rather than executed inline, so a 202 means "accepted", not "finished" —
         *     poll the task and read `lastRunAt` / `lastStatus` to see how it went.
         *
         *     Note the run executes with the task's own settings, which includes writing to the
         *     books unattended when `autoApproveWrites` is true.
         */
        post: operations["scheduledTasks.run"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/scheduled-tasks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List scheduled tasks
         * @description Returns the Prosaic AI scheduled tasks in the workspace associated with the API key, newest first.
         */
        get: operations["scheduledTasks.list"];
        put?: never;
        /**
         * Create a scheduled task
         * @description Creates a Prosaic AI scheduled task. The task runs its prompt unattended on the
         *     given cadence, in Pacific/Auckland time.
         *
         *     `emailTo` must be the address of a member of the same workspace — a task is a
         *     standing instruction to send a workspace's books somewhere, so arbitrary
         *     recipients are refused with 400.
         */
        post: operations["scheduledTasks.create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/public/v1/transactions/reconcile": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Reconcile bank transactions (bulk or single)
         * @description Reconciles one or more bank transactions by creating journal entries with automatic tax calculations.
         *     All requests are processed asynchronously via background jobs.
         *
         *     ## Processing
         *
         *     - All transactions are queued for background processing
         *     - Returns `requestId` for tracking
         *     - Transactions are grouped by entity automatically
         *     - Separate jobs created per entity for parallel processing
         *
         *     ## Entity Determination
         *
         *     Unlike other endpoints, this endpoint does **not** require an `entityId` in the path.
         *     Instead, entities are determined from the transactions themselves:
         *     - Each transaction is associated with a bank account
         *     - Each bank account belongs to an entity
         *     - Transactions can span multiple entities (separate jobs per entity)
         *
         *     ## Tax Handling
         *
         *     The system supports three tax modes:
         *
         *     ### NO_TAX
         *     - No tax calculations are performed
         *     - Assignment amounts are used as-is in journal entries
         *     - Use for transfers between accounts or tax-exempt transactions
         *
         *     ### TAX_INCLUSIVE (Default for NZ)
         *     - Assignment amounts **include** tax
         *     - System automatically splits the amount into base and tax components
         *     - **Formula**: `baseAmount = amount / (1 + rate)`, `taxAmount = amount - baseAmount`
         *     - **Example**: $115 with GST 15% → $100 base + $15 GST
         *     - Common for expenses where you know the total paid (including GST)
         *
         *     ### TAX_EXCLUSIVE
         *     - Assignment amounts **exclude** tax
         *     - System adds tax on top of the specified amount
         *     - **Formula**: `taxAmount = amount × rate`, `totalAmount = amount + taxAmount`
         *     - **Example**: $1000 with GST 15% → $1000 base + $150 GST = $1150 total
         *     - Common for income where you invoice a base amount plus GST
         *
         *     ## Important Notes
         *
         *     - Maximum 500 transactions per request
         *     - Each transaction amount must equal the sum of its assignment debits/credits
         *     - Each assignment line requires a valid `taxCode` from the entity's tax rates
         *     - Generated tax lines are automatically created and linked to parent lines
         *     - Transactions already being processed will return a 409 conflict error
         */
        post: operations["transactions.reconcileBulk"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        ApiSuccessResponse: {
            /** @description The response data */
            data?: Record<string, never>;
            meta?: {
                /** @description Total number of items returned */
                count?: number;
            };
        };
        ApiErrorResponse: {
            /** @description Error message */
            error?: string;
            /** @description Error code for programmatic handling */
            code?: string;
        };
        /**
         * Format: date
         * @description Calendar date in YYYY-MM-DD format (ISO 8601). An optional time suffix (for example `T00:00:00.000Z`) is accepted. Regional formats such as DD-MM-YYYY are rejected.
         * @example 2024-04-01
         */
        IsoDateString: string;
        GeneralLedgerEntry: {
            /**
             * Format: uuid
             * @description Journal line ID
             */
            id?: string;
            /**
             * Format: uuid
             * @description Physical journal ID
             */
            journalId?: string;
            /**
             * Format: uuid
             * @description Logical journal ID for deep linking
             */
            logicalJournalId?: string;
            /**
             * Format: date
             * @description Journal date as an NZ calendar date (YYYY-MM-DD). Matches the NZ-timezone period filtering, so a transaction always appears under the same NZ date it is filtered by.
             * @example 2026-05-31
             */
            date?: string;
            /** @description Journal-level narration */
            narration?: string;
            /** @description Line-level description */
            description?: string;
            /** @enum {string} */
            lineType?: "user" | "generated-bank-line" | "generated-tax-line";
            /**
             * Format: uuid
             * @description Parent line ID for tax lines
             */
            parentId?: string | null;
            /** @description Human-readable source label (Bank Rec, Manual Journal, System, Reversal) */
            source?: string;
            /** @description Journal status (posted, voided) */
            journalStatus?: string;
            /** @description Debit amount (5 decimal places) */
            debit?: string;
            /** @description Credit amount (5 decimal places) */
            credit?: string;
            /** @description Net amount (debit - credit, 5 decimal places) */
            net?: string;
            /** @description Gross amount including GST */
            gross?: string;
            /** @description Cumulative account balance after this line, debits minus credits. Positive is a debit balance, negative a credit balance, for every account type. */
            runningBalance?: string;
            /** @description GST amount (positive for expenses, negative for revenue) */
            gstAmount?: string;
            taxRate?: {
                /** Format: uuid */
                id?: string;
                name?: string;
                rate?: string;
            } | null;
            bankTransaction?: {
                /** Format: uuid */
                id?: string;
                /** Format: date */
                date?: string;
                amount?: string;
                /** @enum {string} */
                type?: "DEBIT" | "CREDIT";
                description?: string;
                particulars?: string;
                code?: string;
                merchant?: {
                    id?: string;
                    name?: string;
                    provider?: string;
                    identifier?: string;
                };
                category?: {
                    id?: string;
                    name?: string;
                    groupName?: string;
                    provider?: string;
                };
                bankAccount?: {
                    name?: string;
                    accountNumber?: string;
                    institution?: string;
                };
            } | null;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    "charts.deleteAccount": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                chartId: string;
                accountId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            success: boolean;
                            entitiesUpdated: number;
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Account has journal entries, has children, or is a system account */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Chart or account not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "charts.updateAccount": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                chartId: string;
                accountId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name?: string;
                    description?: string | null;
                    /** @enum {string|null} */
                    taxCode?: "NZ_GST_15_INC" | "NZ_GST_15_EXP" | "NZ_GST_0_NONE" | "NZ_GST_0_ZERO" | "AU_GST_10_INC" | "AU_GST_10_EXP" | "AU_GST_0_NONE" | "AU_GST_0_INPUT" | "AU_GST_0_EXPORT" | null;
                    mappedCode?: string | null;
                    code?: string;
                };
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            entitiesUpdated: number;
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Validation error or business rule violation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Chart or account not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The new code conflicts with an existing template or entity account */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "charts.createAccount": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                chartId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    code: string;
                    name?: string | null;
                    parentCode?: string | null;
                    /** @enum {string|null} */
                    taxCode?: "NZ_GST_15_INC" | "NZ_GST_15_EXP" | "NZ_GST_0_NONE" | "NZ_GST_0_ZERO" | "AU_GST_10_INC" | "AU_GST_10_EXP" | "AU_GST_0_NONE" | "AU_GST_0_INPUT" | "AU_GST_0_EXPORT" | null;
                    description?: string | null;
                    mappedCode?: string | null;
                };
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string | null;
                            code: string;
                            entitiesUpdated: number;
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Validation error or business rule violation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Chart not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description An account with this code already exists, or the code conflicts with a custom entity account */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "charts.del": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                chartId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            success: boolean;
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Chart not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Cannot delete template with assigned entities */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "charts.listAccounts": {
        parameters: {
            query?: {
                /** @description When true, includes global accounts not in the template (with isIncluded=false). Disables pagination. */
                includeHidden?: boolean;
                /** @description Page number (starts at 1). Ignored when includeHidden=true. */
                page?: number;
                /** @description Number of items per page. Ignored when includeHidden=true. */
                pageSize?: number;
            };
            header?: never;
            path: {
                chartId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            code: string;
                            name: string;
                            type: string;
                            subtype: string;
                            taxCode: string;
                            description: string | null;
                            mappedCode: string | null;
                            isSystem: boolean;
                            parentId?: string | null;
                            isExcluded?: boolean;
                            isIncluded?: boolean;
                            /** @enum {string} */
                            source?: "template" | "overridden" | "custom";
                        }[];
                        pagination: {
                            currentPage: number;
                            pageSize: number;
                            totalCount: number;
                            totalPages: number;
                            hasNextPage: boolean;
                            hasPreviousPage: boolean;
                        };
                    };
                };
            };
            /** @description Bad request - missing or invalid parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden - No access to the specified chart */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Chart not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "charts.update": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                chartId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name?: string;
                    description?: string | null;
                    includeSystemAccounts?: boolean;
                    accounts?: {
                        code: string;
                        isIncluded: boolean;
                        name?: string;
                        description?: string | null;
                        /** @enum {string|null} */
                        taxCode?: "NZ_GST_15_INC" | "NZ_GST_15_EXP" | "NZ_GST_0_NONE" | "NZ_GST_0_ZERO" | "AU_GST_10_INC" | "AU_GST_10_EXP" | "AU_GST_0_NONE" | "AU_GST_0_INPUT" | "AU_GST_0_EXPORT" | null;
                        mappedCode?: string | null;
                        parentCode?: string | null;
                    }[];
                };
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            name: string;
                            description: string | null;
                            entitiesUpdated: number;
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Validation error or business rule violation. `SYSTEM_ACCOUNT_VALIDATION` includes `details.missingAccounts` listing every required system account absent from the payload. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Chart not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Account code conflict - new template account codes conflict with custom accounts in entities using this template */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "Account code conflict",
                     *       "code": "ACCOUNT_CODE_CONFLICT",
                     *       "details": {
                     *         "accountCode": "1100",
                     *         "accountCodes": [
                     *           "1100",
                     *           "1200"
                     *         ],
                     *         "conflictingEntityIds": [
                     *           "550e8400-e29b-41d4-a716-446655440001"
                     *         ],
                     *         "conflictingEntities": [
                     *           {
                     *             "entityId": "550e8400-e29b-41d4-a716-446655440001",
                     *             "entityName": "Acme Ltd",
                     *             "conflictingAccountCodes": [
                     *               "1100",
                     *               "1200"
                     *             ]
                     *           }
                     *         ]
                     *       }
                     *     }
                     */
                    "application/json": {
                        /** @example Account code conflict */
                        error: string;
                        /** @enum {string} */
                        code: "ACCOUNT_CODE_CONFLICT";
                        details?: {
                            /** @description (deprecated) Use accountCodes[0] for backward compatibility */
                            accountCode?: string;
                            /** @description All new account codes that conflict with entity custom accounts */
                            accountCodes?: string[];
                            /** @description Entity IDs that have conflicting custom accounts */
                            conflictingEntityIds?: string[];
                            conflictingEntities?: {
                                /** Format: uuid */
                                entityId?: string;
                                entityName?: string;
                                /** @description Account codes in this entity that conflict */
                                conflictingAccountCodes?: string[];
                            }[];
                        };
                    };
                };
            };
        };
    };
    "charts.list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            name: string;
                            description: string | null;
                            accountCount: number;
                        }[];
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "charts.create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name: string;
                    accounts: {
                        code: string;
                        name: string;
                        type: string;
                        isIncluded: boolean;
                        subtype?: string | null;
                        /** @enum {string|null} */
                        taxCode?: "NZ_GST_15_INC" | "NZ_GST_15_EXP" | "NZ_GST_0_NONE" | "NZ_GST_0_ZERO" | "AU_GST_10_INC" | "AU_GST_10_EXP" | "AU_GST_0_NONE" | "AU_GST_0_INPUT" | "AU_GST_0_EXPORT" | null;
                        description?: string | null;
                        mappedCode?: string | null;
                        parentCode?: string | null;
                    }[];
                    description?: string;
                    includeSystemAccounts?: boolean;
                };
            };
        };
        responses: {
            /** @description Successful response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            name: string;
                            description: string | null;
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Validation error. `SYSTEM_ACCOUNT_VALIDATION` includes `details.missingAccounts` listing every required system account absent from the payload. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @example Missing required system accounts: 8500 (GST), 8950 (Rounding). All system accounts must be included in the template with isIncluded: true. */
                        error: string;
                        /** @example SYSTEM_ACCOUNT_VALIDATION */
                        code: string;
                        details?: {
                            missingAccounts?: {
                                /** @example 8500 */
                                code?: string;
                                /** @example GST */
                                name?: string;
                            }[];
                        };
                    };
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "clients.listBankAccounts": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                clientId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            entityId: string | null;
                            externalId: string;
                            name: string;
                            alias: string | null;
                            institution: string | null;
                            accountNumber: string | null;
                            logoUrl: string | null;
                            type: string;
                            entityAccount: {
                                id: string;
                                code: string;
                                name: string;
                                type: string;
                                subtype: string;
                                taxCode: string;
                                description: string | null;
                                mappedCode: string | null;
                                isSystem: boolean;
                                parentId?: string | null;
                                isExcluded?: boolean;
                                isIncluded?: boolean;
                                /** @enum {string} */
                                source?: "template" | "overridden" | "custom";
                            } | null;
                        }[];
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key/token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Forbidden - User does not have access to this client */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Client not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
    "clients.createOnboardingLink": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                clientId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    integrationId?: string;
                    callbackURL?: string;
                    state?: string;
                };
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            magicLink: string;
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
        };
    };
    "clients.listTransactions": {
        parameters: {
            query?: {
                /**
                 * @description Comma-separated list of bank account IDs to filter by
                 * @example uuid1,uuid2,uuid3
                 */
                bankAccountIds?: string[];
                /**
                 * @description Start date for filtering transactions (ISO 8601 format)
                 * @example 2024-04-01
                 */
                dateFrom?: string;
                /**
                 * @description End date for filtering transactions (ISO 8601 format)
                 * @example 2025-03-31
                 */
                dateTo?: string;
                /** @description Filter by reconciliation status */
                reconciliationStatus?: "reconciled" | "unreconciled";
                /** @description Page number (starts at 1) */
                page?: number;
                /** @description Number of items per page */
                pageSize?: number;
            };
            header?: never;
            path: {
                clientId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            entityId: string | null;
                            /** @enum {string} */
                            reconciliationStatus: "reconciled" | "unreconciled";
                            journalId: string | null;
                            bankAccount: {
                                id: string;
                                entityId: string | null;
                                externalId: string;
                                name: string;
                                alias: string | null;
                                institution: string | null;
                                accountNumber: string | null;
                                logoUrl: string | null;
                                type: string;
                                entityAccount: {
                                    id: string;
                                    code: string;
                                    name: string;
                                    type: string;
                                    subtype: string;
                                    taxCode: string;
                                    description: string | null;
                                    mappedCode: string | null;
                                    isSystem: boolean;
                                    parentId?: string | null;
                                    isExcluded?: boolean;
                                    isIncluded?: boolean;
                                    /** @enum {string} */
                                    source?: "template" | "overridden" | "custom";
                                } | null;
                            };
                            merchant: {
                                id: string;
                                name: string;
                                provider: string | null;
                                identifier: string;
                            } | null;
                            category: {
                                id: string;
                                name: string;
                                identifier: string;
                            } | null;
                            user: {
                                id: string;
                                email: string;
                                name: string | null;
                                tradingName: string | null;
                                /** Format: date-time */
                                createdAt: string;
                            };
                            suggestions?: {
                                id: string;
                                sourceType: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                confidence: string;
                                status: string;
                                ruleId: string | null;
                                ruleName: string | null;
                                lines: {
                                    id: string;
                                    /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                    proportion: string | null;
                                    /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                    credit: string;
                                    /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                    debit: string;
                                    entityAccountId: string;
                                    entityAccount: {
                                        id: string;
                                        code: string;
                                        name: string;
                                    };
                                    taxRateId: string | null;
                                    taxRate: {
                                        id: string;
                                        code: string;
                                        name: string;
                                        description: string | null;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        rate: string;
                                    } | null;
                                }[];
                            }[];
                            id: string;
                            /** Format: date-time */
                            date: string;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            amount: string;
                            description: string;
                            type: string;
                            particulars: string | null;
                            code: string | null;
                            reference: string | null;
                        }[];
                        pagination: {
                            currentPage: number;
                            pageSize: number;
                            totalCount: number;
                            totalPages: number;
                            hasNextPage: boolean;
                            hasPreviousPage: boolean;
                        };
                    };
                };
            };
            /** @description Bad request - invalid parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key/token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Forbidden - User does not have access to this client */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Client not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
    "clients.list": {
        parameters: {
            query?: {
                /** @description Filter by specific client ID */
                clientId?: string;
                /** @description Filter by client email address */
                email?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            email: string;
                            name: string | null;
                            tradingName: string | null;
                            /** Format: date-time */
                            createdAt: string;
                            bankAccounts: {
                                id: string;
                                name: string;
                            }[];
                        }[];
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Workspace not found or access denied */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
    "clients.create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name: string;
                    email: string;
                    tradingName?: string;
                    sendInvite?: boolean;
                    message?: string;
                };
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            email: string;
                            name: string | null;
                            tradingName: string | null;
                            /** Format: date-time */
                            createdAt: string;
                            bankAccounts: {
                                id: string;
                                name: string;
                            }[];
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Validation failed */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                        details?: Record<string, never>[];
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Workspace not found or access denied */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
    "changeSets.create": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    operations: ({
                        /** @enum {string} */
                        type: "journal.post";
                        payload: {
                            narration: string;
                            date: string;
                            lines: {
                                entityAccountId: string;
                                credit: number;
                                debit: number;
                                taxRateId: string;
                                description?: string;
                            }[];
                            /** @enum {string} */
                            taxMode?: "NO_TAX" | "TAX_INCLUSIVE" | "TAX_EXCLUSIVE";
                        };
                    } | {
                        /** @enum {string} */
                        type: "reconcile";
                        payload: {
                            transactionId: string;
                            assignment: {
                                code: string;
                                name: string;
                                taxCode: string;
                                credit?: number;
                                debit?: number;
                                description?: string;
                            }[];
                            narration?: string;
                            /** @enum {string} */
                            taxMode?: "NO_TAX" | "TAX_INCLUSIVE" | "TAX_EXCLUSIVE";
                            confidence?: number;
                            reasoning?: string;
                        };
                    })[];
                    sessionId?: string;
                    agentSessionId?: string;
                };
            };
        };
        responses: {
            /** @description Successful response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {boolean} */
                        success: true;
                        data: {
                            id: string;
                            status: string;
                            contentHash: string;
                        };
                    };
                };
            };
            /** @description Invalid body */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description TOKEN_READ_ONLY / TOKEN_ENTITY_MISMATCH / ENTITY_ACCESS_DENIED */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Entity has no workspace */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description CHANGE_SET_INVALID — an operation failed validation (e.g. amounts do not sum */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Failed to record the change-set */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "entityAccounts.del": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
                accountId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            success: boolean;
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Cannot delete parent accounts or accounts with journal entries */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Account not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "entityAccounts.reset": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
                accountId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            success: boolean;
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Account not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "entityAccounts.update": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
                accountId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name?: string;
                    description?: string | null;
                    taxCode?: string;
                    mappedCode?: string | null;
                    code?: string;
                };
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            code: string;
                            name: string;
                            type: string;
                            subtype: string;
                            taxCode: string;
                            description: string | null;
                            mappedCode: string | null;
                            isSystem: boolean;
                            parentId?: string | null;
                            isExcluded?: boolean;
                            isIncluded?: boolean;
                            /** @enum {string} */
                            source?: "template" | "overridden" | "custom";
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Validation error or business rule violation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Account not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "entityAccounts.restore": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
                templateAccountId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            success: boolean;
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Parent account must be restored first */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Template account no longer exists (chart template may have been updated) */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "entityAccounts.list": {
        parameters: {
            query?: {
                /** @description Include system-generated accounts (GST, Rounding, Retained Earnings, etc.) in the response. Defaults to true so all account codes are available for mapping (e.g. importing a trial balance or journals). Pass includeSystem=false to exclude system accounts. */
                includeSystem?: string;
                /** @description Include accounts that have been excluded from the entity's chart. When true, excluded accounts are returned with isExcluded=true flag, and their data comes from the template account. */
                includeExcluded?: string;
            };
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            code: string;
                            name: string;
                            type: string;
                            subtype: string;
                            taxCode: string;
                            description: string | null;
                            mappedCode: string | null;
                            isSystem: boolean;
                            parentId?: string | null;
                            isExcluded?: boolean;
                            isIncluded?: boolean;
                            /** @enum {string} */
                            source?: "template" | "overridden" | "custom";
                        }[];
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Bad request - missing or invalid parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
    "entityAccounts.create": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    code: string;
                    name: string;
                    taxCode: string;
                    parentAccountId?: string;
                    parentAccountCode?: string;
                    parentMappedCode?: string;
                    description?: string | null;
                    mappedCode?: string | null;
                };
            };
        };
        responses: {
            /** @description Successful response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            code: string;
                            name: string;
                            type: string;
                            subtype: string;
                            taxCode: string;
                            description: string | null;
                            mappedCode: string | null;
                            isSystem: boolean;
                            parentId?: string | null;
                            isExcluded?: boolean;
                            isIncluded?: boolean;
                            /** @enum {string} */
                            source?: "template" | "overridden" | "custom";
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Bad request - validation error or business rule violation */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Error message */
                        error?: string;
                        /** @description Error code */
                        code?: string;
                        /** @description Additional error details (for template conflicts) */
                        details?: {
                            templateAccountId?: string;
                            isExcluded?: boolean;
                        };
                    };
                };
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Parent account not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "Parent account not found",
                     *       "code": "PARENT_NOT_FOUND"
                     *     }
                     */
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Conflict - account code already exists */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "Account with code 2030.100 already exists in this entity",
                     *       "code": "DUPLICATE_CODE"
                     *     }
                     */
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
    "dimensions.list": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            name: string;
                            typeKey: string;
                            enforcement: string;
                            options: {
                                id: string;
                                name: string;
                                code: string | null;
                            }[];
                        }[];
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description API key does not have access to this entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "files.upload": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": {
                    /**
                     * Format: binary
                     * @description The file to upload (max 20MB). Accepted types — PDF, JPEG, PNG, GIF, WebP, CSV, plain text, Excel (XLS/XLSX), Word (DOC/DOCX), Outlook MSG.
                     */
                    file: string;
                };
            };
        };
        responses: {
            /** @description Successful response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        success: boolean;
                        file: {
                            id: string;
                            filename: string;
                            name: string;
                            contentType: string;
                            size: number;
                            createdAt: string;
                        };
                    };
                };
            };
            /** @description Bad request - validation failed */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Internal server error - Upload failed */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
        };
    };
    "fixedAssetTypes.list": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            name: string;
                            depreciationMethod: string;
                            usefulLifeYears: number | null;
                            depreciationRate: number | null;
                            assetAccount: {
                                id: string;
                                code: string;
                                name: string;
                                mappedCode: string | null;
                            };
                            accumulatedDepreciationAccount: {
                                id: string;
                                code: string;
                                name: string;
                                mappedCode: string | null;
                            };
                            depreciationExpenseAccount: {
                                id: string;
                                code: string;
                                name: string;
                                mappedCode: string | null;
                            };
                            privateUseAccount: {
                                id: string;
                                code: string;
                                name: string;
                                mappedCode: string | null;
                            } | null;
                        }[];
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Bad request - missing or invalid parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
    "fixedAssetTypes.create": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name: string;
                    depreciationMethod: string;
                    assetAccountId: string;
                    accumulatedDepreciationAccountId: string;
                    depreciationExpenseAccountId: string;
                    privateUseAccountId: string | null;
                    usefulLifeYears?: number | null;
                    depreciationRate?: number | null;
                };
            };
        };
        responses: {
            /** @description Successful response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            name: string;
                            depreciationMethod: string;
                            usefulLifeYears: number | null;
                            depreciationRate: number | null;
                            assetAccount: {
                                id: string;
                                code: string;
                                name: string;
                                mappedCode: string | null;
                            };
                            accumulatedDepreciationAccount: {
                                id: string;
                                code: string;
                                name: string;
                                mappedCode: string | null;
                            };
                            depreciationExpenseAccount: {
                                id: string;
                                code: string;
                                name: string;
                                mappedCode: string | null;
                            };
                            privateUseAccount: {
                                id: string;
                                code: string;
                                name: string;
                                mappedCode: string | null;
                            } | null;
                        };
                    };
                };
            };
            /** @description Bad request - validation failed */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
    "fixedAssets.retrieve": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
                assetId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            name: string;
                            assetNumber: string | null;
                            description: string | null;
                            status: string;
                            purchaseDate: string | null;
                            startDate: string | null;
                            purchasePrice: number | null;
                            costLimit: number | null;
                            residualValue: number | null;
                            businessUsePercentage: number | null;
                            initialAccumulatedDepreciation: number | null;
                            depreciationMethod: string | null;
                            usefulLifeYears: number | null;
                            depreciationRate: number | null;
                            methodParams: unknown;
                            disposalDate: string | null;
                            disposalProceeds: number | null;
                            bookValue: number | null;
                            assetType: {
                                id: string;
                                name: string;
                            } | null;
                            mostRecentDepreciationRun: {
                                year: number;
                                month: number;
                                accumulatedDepreciation: number;
                            } | null;
                            createdAt: string;
                            updatedAt: string | null;
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Bad request - missing or invalid parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Forbidden - No access to the specified entity or asset */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Not found - Asset not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
    "fixedAssets.list": {
        parameters: {
            query?: {
                /** @description Page number (starts at 1) */
                page?: number;
                /** @description Number of items per page */
                pageSize?: number;
                /** @description Filter by asset status */
                status?: "draft" | "active" | "disposed";
            };
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            name: string;
                            assetNumber: string | null;
                            description: string | null;
                            status: string;
                            purchaseDate: string | null;
                            startDate: string | null;
                            purchasePrice: number | null;
                            costLimit: number | null;
                            residualValue: number | null;
                            businessUsePercentage: number | null;
                            initialAccumulatedDepreciation: number | null;
                            depreciationMethod: string | null;
                            usefulLifeYears: number | null;
                            depreciationRate: number | null;
                            methodParams: unknown;
                            disposalDate: string | null;
                            disposalProceeds: number | null;
                            bookValue: number | null;
                            assetType: {
                                id: string;
                                name: string;
                            } | null;
                            mostRecentDepreciationRun: {
                                year: number;
                                month: number;
                                accumulatedDepreciation: number;
                            } | null;
                            createdAt: string;
                            updatedAt: string | null;
                        }[];
                        pagination: {
                            currentPage: number;
                            pageSize: number;
                            totalCount: number;
                            totalPages: number;
                            hasNextPage: boolean;
                            hasPreviousPage: boolean;
                        };
                    };
                };
            };
            /** @description Bad request - missing or invalid parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                        field?: string;
                        value?: string;
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
    "fixedAssets.create": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name: string;
                    entityFixedAssetTypeId: unknown;
                    purchaseDate: string;
                    startDate: string;
                    purchasePrice: unknown;
                    depreciationMethod: string;
                    assetNumber?: string;
                    description?: string;
                    costLimit?: unknown;
                    residualValue?: unknown;
                    businessUsePercentage?: number;
                    initialAccumulatedDepreciation?: unknown;
                    usefulLifeYears?: number;
                    depreciationRate?: number | null;
                    immediateExpensePercentage?: number;
                    /** @enum {string} */
                    status: "active";
                } | {
                    name: string;
                    entityFixedAssetTypeId?: string | null;
                    assetNumber?: string;
                    description?: string;
                    purchaseDate?: string;
                    startDate?: string;
                    purchasePrice?: unknown;
                    costLimit?: unknown;
                    residualValue?: unknown;
                    businessUsePercentage?: number;
                    initialAccumulatedDepreciation?: unknown;
                    depreciationMethod?: string | null;
                    usefulLifeYears?: number;
                    depreciationRate?: number | null;
                    immediateExpensePercentage?: number;
                    /** @enum {string} */
                    status?: "draft";
                };
            };
        };
        responses: {
            /** @description Successful response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            name: string;
                            assetNumber: string | null;
                            description: string | null;
                            status: string;
                            purchaseDate: string | null;
                            startDate: string | null;
                            purchasePrice: number | null;
                            costLimit: number | null;
                            residualValue: number | null;
                            businessUsePercentage: number | null;
                            initialAccumulatedDepreciation: number | null;
                            depreciationMethod: string | null;
                            usefulLifeYears: number | null;
                            depreciationRate: number | null;
                            methodParams: unknown;
                            disposalDate: string | null;
                            disposalProceeds: number | null;
                            bookValue: number | null;
                            assetType: {
                                id: string;
                                name: string;
                            } | null;
                            mostRecentDepreciationRun: {
                                year: number;
                                month: number;
                                accumulatedDepreciation: number;
                            } | null;
                            createdAt: string;
                            updatedAt: string | null;
                        };
                    };
                };
            };
            /** @description Bad request - validation failed */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                        errors?: {
                            field?: string;
                            message?: string;
                        }[];
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Asset type not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
    "generalLedger.byAccount": {
        parameters: {
            query?: {
                /** @description Period preset for date range filtering */
                periodType?: "custom" | "this-month" | "last-month" | "this-quarter" | "last-quarter" | "this-financial-year" | "last-financial-year" | "month-to-date" | "quarter-to-date" | "year-to-date";
                /** @description Start date. Required when periodType is `custom`. */
                startDate?: string;
                /** @description End date. Required when periodType is `custom`. */
                endDate?: string;
                /** @description Comma-separated list of entity account IDs to filter by */
                accountIds?: string[];
                /** @description Include voided journals (default false) */
                includeVoided?: boolean;
            };
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        metadata: {
                            entityId: string;
                            entityName: string;
                            periodDescription: string;
                            startDate: string;
                            endDate: string;
                            generatedAt: string;
                            currency: string;
                        };
                        accounts: {
                            accountId: string;
                            accountCode: string;
                            accountMappedCode: string | null;
                            accountName: string;
                            accountType: string;
                            accountSubtype: string;
                            beginningBalance: string;
                            endingBalance: string;
                            totalDebits: string;
                            totalCredits: string;
                            netMovement: string;
                            entries: {
                                id: string;
                                journalId: string;
                                logicalJournalId: string;
                                date: string;
                                narration: string;
                                description: string;
                                lineType: string;
                                parentId: string | null;
                                source: string;
                                journalStatus: string;
                                debit: string;
                                credit: string;
                                net: string;
                                gross: string;
                                runningBalance: string;
                                gstAmount: string;
                                taxRate?: {
                                    id: string;
                                    name: string;
                                    rate: string;
                                };
                                bankTransaction?: {
                                    id: string;
                                    date: string;
                                    amount: string;
                                    type: string;
                                    description: string;
                                    particulars?: string;
                                    code?: string;
                                    merchant?: {
                                        id: string;
                                        name: string;
                                        provider?: string;
                                        identifier?: string;
                                    };
                                    category?: {
                                        id: string;
                                        name: string;
                                        groupName?: string;
                                        provider?: string;
                                    };
                                    bankAccount: {
                                        name: string;
                                        accountNumber?: string;
                                        institution?: string;
                                    };
                                };
                            }[];
                        }[];
                        totals: {
                            totalDebits: string;
                            totalCredits: string;
                            netMovement: string;
                        };
                    };
                };
            };
            /** @description Bad request - invalid parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "generalLedger.byTransaction": {
        parameters: {
            query?: {
                /** @description Period preset for date range filtering */
                periodType?: "custom" | "this-month" | "last-month" | "this-quarter" | "last-quarter" | "this-financial-year" | "last-financial-year" | "month-to-date" | "quarter-to-date" | "year-to-date";
                /** @description Start date. Required when periodType is `custom`. */
                startDate?: string;
                /** @description End date. Required when periodType is `custom`. */
                endDate?: string;
                /** @description Comma-separated list of entity account IDs to filter by */
                accountIds?: string[];
                /** @description Include voided journals (default false) */
                includeVoided?: boolean;
            };
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        metadata: {
                            entityId: string;
                            entityName: string;
                            periodDescription: string;
                            startDate: string;
                            endDate: string;
                            generatedAt: string;
                            currency: string;
                        };
                        entries: {
                            account: {
                                accountId: string;
                                accountCode: string;
                                accountMappedCode: string | null;
                                accountName: string;
                                accountType: string;
                                accountSubtype: string;
                            };
                            id: string;
                            journalId: string;
                            logicalJournalId: string;
                            date: string;
                            narration: string;
                            description: string;
                            lineType: string;
                            parentId: string | null;
                            source: string;
                            journalStatus: string;
                            debit: string;
                            credit: string;
                            net: string;
                            gross: string;
                            runningBalance: string;
                            gstAmount: string;
                            taxRate?: {
                                id: string;
                                name: string;
                                rate: string;
                            };
                            bankTransaction?: {
                                id: string;
                                date: string;
                                amount: string;
                                type: string;
                                description: string;
                                particulars?: string;
                                code?: string;
                                merchant?: {
                                    id: string;
                                    name: string;
                                    provider?: string;
                                    identifier?: string;
                                };
                                category?: {
                                    id: string;
                                    name: string;
                                    groupName?: string;
                                    provider?: string;
                                };
                                bankAccount: {
                                    name: string;
                                    accountNumber?: string;
                                    institution?: string;
                                };
                            };
                        }[];
                        totals: {
                            totalDebits: string;
                            totalCredits: string;
                            netMovement: string;
                        };
                    };
                };
            };
            /** @description Bad request - invalid parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "gstReturns.retrieve": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
                gstReturnId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            /** @enum {string} */
                            amountsSource: "finalised" | "calculated";
                            totalSalesAndIncome: number | null;
                            zeroRatedSupplies: number | null;
                            netGstSalesAndIncome: number | null;
                            totalGstSalesAndIncome: number | null;
                            debitAdjustments: number | null;
                            lateClaimsAmount: number | null;
                            /** @enum {string|null} */
                            lateClaimsType: "sales" | "purchases" | null;
                            totalDebitAdjustments: number | null;
                            totalGstCollected: number | null;
                            totalPurchasesAndExpenses: number | null;
                            totalGstCreditsOnPurchasesAndExpenses: number | null;
                            creditAdjustments: number | null;
                            totalCreditAdjustments: number | null;
                            totalGstCredit: number | null;
                            id: string;
                            entityId: string;
                            name: string;
                            description: string;
                            /** @enum {string} */
                            status: "draft" | "finalised" | "filed" | "filed_externally" | "accepted" | "rejected" | "awaiting_payment" | "completed";
                            dateFrom: string;
                            dateTo: string;
                            dueDate: string;
                            isOverdue: boolean;
                            netGstPosition: number | null;
                            unreconciledTransactionCount: number;
                            hasAmendment: boolean;
                            finalisedAt: string | null;
                            irdFiledAt: string | null;
                            updatedAt: string;
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Malformed GST return id */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiErrorResponse"];
                };
            };
            /** @description Unauthorized - invalid or missing credentials */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiErrorResponse"];
                };
            };
            /** @description No such GST return for this entity */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiErrorResponse"];
                };
            };
        };
    };
    "gstReturns.listForEntity": {
        parameters: {
            query?: {
                /**
                 * @description Return only GST returns in these lifecycle statuses. Repeatable, and
                 *     a comma-separated list means the same thing — `?status=draft&status=filed`
                 *     and `?status=draft,filed` are equivalent. Omit for every status;
                 *     nothing is filtered out by default, so completed returns appear
                 *     alongside outstanding ones. To see only live work, list the seven
                 *     statuses other than `completed`.
                 */
                status?: string[];
                /** @description Return only GST returns whose period ends on or after this NZ date */
                dateFrom?: string;
                /** @description Return only GST returns whose period starts on or before this NZ date */
                dateTo?: string;
                /** @description Return only GST returns due on or after this NZ date */
                dueAfter?: string;
                /** @description Return only GST returns due on or before this NZ date */
                dueBefore?: string;
                /** @description Include draft returns whose period has not started yet (default false) */
                includeFutureDrafts?: "false" | "true";
                /** @description Page number (default 1) */
                page?: number;
                /** @description Items per page (default 100) */
                pageSize?: number;
            };
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            entityId: string;
                            name: string;
                            description: string;
                            /** @enum {string} */
                            status: "draft" | "finalised" | "filed" | "filed_externally" | "accepted" | "rejected" | "awaiting_payment" | "completed";
                            dateFrom: string;
                            dateTo: string;
                            dueDate: string;
                            isOverdue: boolean;
                            netGstPosition: number | null;
                            unreconciledTransactionCount: number;
                            hasAmendment: boolean;
                            finalisedAt: string | null;
                            irdFiledAt: string | null;
                            updatedAt: string;
                        }[];
                        pagination: {
                            currentPage: number;
                            pageSize: number;
                            totalCount: number;
                            totalPages: number;
                            hasNextPage: boolean;
                            hasPreviousPage: boolean;
                        };
                    };
                };
            };
            /** @description Invalid query parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiErrorResponse"];
                };
            };
            /** @description Unauthorized - invalid or missing credentials */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiErrorResponse"];
                };
            };
            /** @description Entity not found or not accessible with these credentials */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiErrorResponse"];
                };
            };
        };
    };
    "invoices.retrieve": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
                invoiceId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            entityId: string;
                            workspaceId: string;
                            fileId: string | null;
                            invoiceNumber: string | null;
                            status: string;
                            taxMode: string;
                            /** Format: date-time */
                            issueDate: string;
                            /** Format: date-time */
                            dueDate: string | null;
                            /** Format: date-time */
                            sentAt: string | null;
                            recipientName: string;
                            recipientEmail: string | null;
                            recipientAddress: string | null;
                            bankAccountId: string | null;
                            subtotal: number;
                            taxTotal: number;
                            total: number;
                            notes: string | null;
                            /** Format: date-time */
                            createdAt: string;
                            /** Format: date-time */
                            updatedAt: string;
                            lines: {
                                id: string;
                                description: string;
                                quantity: number;
                                unitPrice: number;
                                taxRate: number;
                                taxRateCode: string | null;
                                entityAccountId: string | null;
                                amount: number;
                                taxAmount: number;
                                position: number;
                            }[];
                        };
                    };
                };
            };
            /** @description Invalid invoice ID. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Invoice, entity, or workspace not found. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error. */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "invoices.create": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @enum {string} */
                    taxMode: "NO_TAX" | "TAX_INCLUSIVE" | "TAX_EXCLUSIVE";
                    issueDate: string;
                    recipientName: string;
                    lines: {
                        description: string;
                        quantity: string;
                        unitPrice: string;
                        taxRateCode: string;
                        entityAccountId: string;
                        taxRate?: string;
                    }[];
                    bankAccountId?: string | null;
                    dueDate?: string | null;
                    invoiceNumber?: string;
                    recipientEmail?: string | null;
                    recipientAddress?: string | null;
                    notes?: string | null;
                    contactId?: string | null;
                    recipientEmails?: string[];
                };
            };
        };
        responses: {
            /** @description Successful response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            entityId: string;
                            workspaceId: string;
                            fileId: string | null;
                            invoiceNumber: string | null;
                            status: string;
                            taxMode: string;
                            /** Format: date-time */
                            issueDate: string;
                            /** Format: date-time */
                            dueDate: string | null;
                            /** Format: date-time */
                            sentAt: string | null;
                            recipientName: string;
                            recipientEmail: string | null;
                            recipientAddress: string | null;
                            bankAccountId: string | null;
                            subtotal: number;
                            taxTotal: number;
                            total: number;
                            notes: string | null;
                            /** Format: date-time */
                            createdAt: string;
                            /** Format: date-time */
                            updatedAt: string;
                            lines: {
                                id: string;
                                description: string;
                                quantity: number;
                                unitPrice: number;
                                taxRate: number;
                                taxRateCode: string | null;
                                entityAccountId: string | null;
                                amount: number;
                                taxAmount: number;
                                position: number;
                            }[];
                        };
                    };
                };
            };
            /** @description Invalid request or invoice input. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Entity or workspace not found. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Invoice creation failed. */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "journals.attachFiles": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
                journalId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    fileIds: string[];
                };
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {boolean} */
                        success: true;
                        attachments: {
                            id: string;
                            fileId: string;
                            /** Format: date-time */
                            createdAt: string;
                        }[];
                    };
                };
            };
            /** @description Bad request - validation failed or files not found */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        details?: Record<string, never>[];
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Not found - Journal not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
        };
    };
    "journals.void": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
                journalId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        originalJournal: {
                            id: string;
                            status: string;
                            /** Format: date-time */
                            voidedAt: string | null;
                            voidedBy: string | null;
                        };
                        reversalJournal: {
                            id: string;
                            status: string;
                            /** Format: date-time */
                            postedAt: string;
                            postedBy: string;
                            voidedJournalId: string;
                        };
                        /** Format: date-time */
                        voidedAt: string;
                    };
                };
            };
            /** @description Journal is not in a voidable state */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Journal not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "journals.list": {
        parameters: {
            query?: {
                /** @description Page number (starts at 1) */
                page?: number;
                /** @description Number of items per page */
                pageSize?: number;
                /** @description Start date for filtering journals (ISO 8601 format) */
                dateFrom?: string;
                /** @description End date for filtering journals (ISO 8601 format) */
                dateTo?: string;
            };
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            logicalJournalId: string | null;
                            /** Format: date-time */
                            postedAt: string | null;
                            postedBy: string | null;
                            poster?: {
                                id: string;
                                email: string;
                                name: string | null;
                                tradingName: string | null;
                                /** Format: date-time */
                                createdAt: string;
                            } | null;
                            lines: {
                                id: string;
                                journalId: string;
                                parentId: string | null;
                                entityAccountId: string;
                                lineNumber: number;
                                type: string;
                                description: string | null;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                credit: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                debit: string;
                                taxRateId: string | null;
                                entityAccount: {
                                    id: string;
                                    code: string;
                                    name: string;
                                };
                                taxRate: {
                                    id: string;
                                    code: string;
                                    name: string;
                                    description: string | null;
                                    /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                    rate: string;
                                } | null;
                            }[];
                            id: string;
                            narration: string;
                            /** Format: date-time */
                            date: string;
                            status: string;
                            type: string;
                            /** Format: date-time */
                            createdAt: string;
                            /** Format: date-time */
                            updatedAt: string;
                            reconciliations?: {
                                bankTransaction: {
                                    id: string;
                                    description: string;
                                    merchant: {
                                        id: string;
                                        name: string;
                                    } | null;
                                };
                            }[];
                        }[];
                        pagination: {
                            currentPage: number;
                            pageSize: number;
                            totalCount: number;
                            totalPages: number;
                            hasNextPage: boolean;
                            hasPreviousPage: boolean;
                        };
                    };
                };
            };
            /** @description Bad request - missing or invalid parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                        field?: string;
                        value?: string;
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
    "journals.create": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    narration: string;
                    date: string;
                    lines: {
                        entityAccountCode?: string;
                        entityAccountName?: string;
                        taxRateName?: string;
                        description?: string;
                        credit?: string | number;
                        debit?: string | number;
                        taxRateId?: string;
                        dimensionOptionIds?: string[];
                    }[];
                    editReason?: string;
                    /** @enum {string} */
                    taxMode?: "NO_TAX" | "TAX_INCLUSIVE" | "TAX_EXCLUSIVE";
                    fileIds?: string[];
                    autoPost?: boolean;
                };
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        logicalJournalId: string | null;
                        /** Format: date-time */
                        postedAt: string | null;
                        postedBy: string | null;
                        poster?: {
                            id: string;
                            email: string;
                            name: string | null;
                            tradingName: string | null;
                            /** Format: date-time */
                            createdAt: string;
                        } | null;
                        lines: {
                            id: string;
                            journalId: string;
                            parentId: string | null;
                            entityAccountId: string;
                            lineNumber: number;
                            type: string;
                            description: string | null;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            credit: string;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            debit: string;
                            taxRateId: string | null;
                            entityAccount: {
                                id: string;
                                code: string;
                                name: string;
                            };
                            taxRate: {
                                id: string;
                                code: string;
                                name: string;
                                description: string | null;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                rate: string;
                            } | null;
                        }[];
                        id: string;
                        narration: string;
                        /** Format: date-time */
                        date: string;
                        status: string;
                        type: string;
                        /** Format: date-time */
                        createdAt: string;
                        /** Format: date-time */
                        updatedAt: string;
                        reconciliations?: {
                            bankTransaction: {
                                id: string;
                                description: string;
                                merchant: {
                                    id: string;
                                    name: string;
                                } | null;
                            };
                        }[];
                    };
                };
            };
            /** @description Bad request - validation failed, invalid account codes, or unbalanced journal */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                        details?: Record<string, never>[];
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Not found - Entity not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
        };
    };
    "ledger.list": {
        parameters: {
            query?: {
                /** @description Page number (starts at 1) */
                page?: number;
                /** @description Number of items per page */
                pageSize?: number;
                /** @description Start date for filtering ledger entries (ISO 8601 format YYYY-MM-DD, interpreted in NZ timezone) */
                dateFrom?: string;
                /** @description End date for filtering ledger entries (ISO 8601 format YYYY-MM-DD, interpreted in NZ timezone) */
                dateTo?: string;
                /** @description Comma-separated list of entity account IDs to filter by */
                accountIds?: string[];
                /** @description Filter by journal ID to get all ledger entries for a specific journal */
                journalId?: string;
            };
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            narration: string;
                            journalType: string;
                            bankTransactionId: string | null;
                            gst: string;
                            entityAccount: {
                                id: string;
                                name: string;
                                code: string;
                            };
                            id: string;
                            description: string | null;
                            /** Format: date-time */
                            createdAt: string;
                            /** Format: date-time */
                            updatedAt: string;
                            parentId: string | null;
                            journalId: string;
                            entityAccountId: string;
                            taxRateId: string;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            credit: string;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            debit: string;
                            taxRate: {
                                id: string;
                                name: string;
                                description: string | null;
                                code: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                rate: string;
                            };
                            accountVersion: number | null;
                            lineNumber: number;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            sumAccountCredits: string | null;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            sumAccountDebits: string | null;
                        }[];
                        pagination: {
                            currentPage: number;
                            pageSize: number;
                            totalCount: number;
                            totalPages: number;
                            hasNextPage: boolean;
                            hasPreviousPage: boolean;
                        };
                    };
                };
            };
            /** @description Bad request - invalid parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                        field?: string;
                        value?: string;
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
    "reports.balanceSheet": {
        parameters: {
            query?: {
                /** @description As-of date for the report. Defaults to today. */
                asOfDate?: string;
                /** @description Include accounts with zero balances */
                includeZeroBalances?: "false" | "true";
                /** @description Whether to include comparison columns */
                comparison?: "none" | "periods";
                /** @description Type of comparison period */
                comparisonType?: "year" | "month";
                /** @description Number of comparison periods (1-12) */
                comparisonPeriods?: string;
            };
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        metadata: {
                            entityId: string;
                            entityName: string;
                            generatedAt: string;
                            currency: string;
                            /** @enum {string} */
                            reportType: "balance-sheet";
                            asOfDate: string;
                        };
                        sections: {
                            assets: {
                                /** @enum {string} */
                                type: "Equity" | "Assets" | "Liabilities";
                                name: string;
                                groups: {
                                    type: string;
                                    name: string;
                                    accounts: {
                                        accountId: string;
                                        accountCode: string;
                                        accountName: string;
                                        /** @enum {string} */
                                        accountType: "Equity" | "Asset" | "Liability";
                                        accountSubtype: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        balance: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        totalCredit: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        totalDebit: string;
                                    }[];
                                    /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                    subtotal: string;
                                }[];
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                total: string;
                            };
                            liabilities: {
                                /** @enum {string} */
                                type: "Equity" | "Assets" | "Liabilities";
                                name: string;
                                groups: {
                                    type: string;
                                    name: string;
                                    accounts: {
                                        accountId: string;
                                        accountCode: string;
                                        accountName: string;
                                        /** @enum {string} */
                                        accountType: "Equity" | "Asset" | "Liability";
                                        accountSubtype: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        balance: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        totalCredit: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        totalDebit: string;
                                    }[];
                                    /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                    subtotal: string;
                                }[];
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                total: string;
                            };
                            equity: {
                                /** @enum {string} */
                                type: "Equity" | "Assets" | "Liabilities";
                                name: string;
                                groups: {
                                    type: string;
                                    name: string;
                                    accounts: {
                                        accountId: string;
                                        accountCode: string;
                                        accountName: string;
                                        /** @enum {string} */
                                        accountType: "Equity" | "Asset" | "Liability";
                                        accountSubtype: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        balance: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        totalCredit: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        totalDebit: string;
                                    }[];
                                    /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                    subtotal: string;
                                }[];
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                total: string;
                            };
                        };
                        totals: {
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            totalAssets: string;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            totalLiabilities: string;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            totalEquity: string;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            netAssets: string;
                            isBalanced: boolean;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            variance: string;
                        };
                        earningsBreakdown?: {
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            currentYearEarnings: string;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            retainedEarnings: string;
                        };
                    } | {
                        metadata: {
                            entityId: string;
                            entityName: string;
                            generatedAt: string;
                            currency: string;
                            /** @enum {string} */
                            reportType: "balance-sheet-comparison";
                            asOfDate: string;
                            comparisonPeriods: string[];
                            comparisonPeriodDates?: string[];
                            comparisonType: string;
                        };
                        sections: {
                            assets: {
                                /** @enum {string} */
                                type: "Equity" | "Assets" | "Liabilities";
                                name: string;
                                groups: {
                                    type: string;
                                    name: string;
                                    accounts: {
                                        comparisonPeriods: {
                                            [key: string]: {
                                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                                balance: string;
                                            };
                                        };
                                        accountId: string;
                                        accountCode: string;
                                        accountName: string;
                                        /** @enum {string} */
                                        accountType: "Equity" | "Asset" | "Liability";
                                        accountSubtype: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        balance: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        totalCredit: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        totalDebit: string;
                                    }[];
                                    /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                    subtotal: string;
                                    comparisonSubtotals: {
                                        [key: string]: string;
                                    };
                                }[];
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                total: string;
                                comparisonTotals: {
                                    [key: string]: string;
                                };
                            };
                            liabilities: {
                                /** @enum {string} */
                                type: "Equity" | "Assets" | "Liabilities";
                                name: string;
                                groups: {
                                    type: string;
                                    name: string;
                                    accounts: {
                                        comparisonPeriods: {
                                            [key: string]: {
                                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                                balance: string;
                                            };
                                        };
                                        accountId: string;
                                        accountCode: string;
                                        accountName: string;
                                        /** @enum {string} */
                                        accountType: "Equity" | "Asset" | "Liability";
                                        accountSubtype: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        balance: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        totalCredit: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        totalDebit: string;
                                    }[];
                                    /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                    subtotal: string;
                                    comparisonSubtotals: {
                                        [key: string]: string;
                                    };
                                }[];
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                total: string;
                                comparisonTotals: {
                                    [key: string]: string;
                                };
                            };
                            equity: {
                                /** @enum {string} */
                                type: "Equity" | "Assets" | "Liabilities";
                                name: string;
                                groups: {
                                    type: string;
                                    name: string;
                                    accounts: {
                                        comparisonPeriods: {
                                            [key: string]: {
                                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                                balance: string;
                                            };
                                        };
                                        accountId: string;
                                        accountCode: string;
                                        accountName: string;
                                        /** @enum {string} */
                                        accountType: "Equity" | "Asset" | "Liability";
                                        accountSubtype: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        balance: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        totalCredit: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        totalDebit: string;
                                    }[];
                                    /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                    subtotal: string;
                                    comparisonSubtotals: {
                                        [key: string]: string;
                                    };
                                }[];
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                total: string;
                                comparisonTotals: {
                                    [key: string]: string;
                                };
                            };
                        };
                        totals: {
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            totalAssets: string;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            totalLiabilities: string;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            totalEquity: string;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            netAssets: string;
                            isBalanced: boolean;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            variance: string;
                        };
                        comparisonTotals: {
                            [key: string]: {
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                totalAssets: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                totalLiabilities: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                totalEquity: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                netAssets: string;
                                isBalanced: boolean;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                variance: string;
                            };
                        };
                        earningsBreakdown?: {
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            currentYearEarnings: string;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            retainedEarnings: string;
                            comparisonEarnings: {
                                [key: string]: {
                                    /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                    currentYearEarnings: string;
                                    /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                    retainedEarnings: string;
                                };
                            };
                        };
                    };
                };
            };
            /** @description Bad request - invalid query parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "reports.currentAccounts": {
        parameters: {
            query?: {
                /** @description Period type for the report. Matches the presets available in the Prosaic UI. Relative periods (this-month, this-quarter, etc.) are resolved to full NZ calendar periods, so omit startDate/endDate when using them. Use custom to supply explicit startDate and endDate. */
                periodType?: "custom" | "this-month" | "last-month" | "this-quarter" | "last-quarter" | "this-financial-year" | "last-financial-year";
                /** @description Start date for custom period. Required when periodType is `custom`. */
                startDate?: string;
                /** @description End date for custom period. Required when periodType is `custom`. */
                endDate?: string;
                /** @description Whether to include comparison columns */
                comparison?: "none" | "periods";
                /** @description Granularity of each comparison period. For UI-consistent results, pair month with this-month/last-month, quarter with this-quarter/last-quarter, and year with the financial-year periods. */
                comparisonType?: "custom" | "year" | "month" | "quarter";
                /** @description Number of comparison periods (1-12) */
                comparisonPeriods?: string;
            };
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        metadata: {
                            entityId: string;
                            entityName: string;
                            entityType: string;
                            generatedAt: string;
                            currency: string;
                            reportType: string;
                            startDate: string;
                            endDate: string;
                            periodDescription: string;
                            reportTitle: string;
                            comparisonPeriods?: string[];
                            comparisonPeriodRanges?: {
                                label: string;
                                startDate: string;
                                endDate: string;
                            }[];
                        };
                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                        openingBalance: string;
                        openingBalanceComparison?: {
                            [key: string]: string;
                        };
                        increases: {
                            accounts: {
                                accountId: string;
                                accountCode: string;
                                accountName: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                amount: string;
                                comparisonPeriods?: {
                                    [key: string]: {
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        amount: string;
                                    };
                                };
                            }[];
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            total: string;
                            comparisonTotals?: {
                                [key: string]: string;
                            };
                        };
                        decreases: {
                            accounts: {
                                accountId: string;
                                accountCode: string;
                                accountName: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                amount: string;
                                comparisonPeriods?: {
                                    [key: string]: {
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        amount: string;
                                    };
                                };
                            }[];
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            total: string;
                            comparisonTotals?: {
                                [key: string]: string;
                            };
                        };
                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                        closingBalance: string;
                        closingBalanceComparison?: {
                            [key: string]: string;
                        };
                    };
                };
            };
            /** @description Bad request - invalid query parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "reports.depreciationSchedule": {
        parameters: {
            query: {
                /** @description Start date for the schedule. */
                startDate: string;
                /** @description End date for the schedule. */
                endDate: string;
            };
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        metadata: {
                            entityId: string;
                            entityName: string;
                            startDate: string;
                            endDate: string;
                            generatedAt: string;
                            periodDescription: string;
                        };
                        assets: {
                            assetId: string;
                            name: string;
                            assetTypeName: string | null;
                            costAccountName: string | null;
                            expenseAccountName: string | null;
                            method: string;
                            rate: number | null;
                            privateUsePercentage: number;
                            purchaseDate: string | null;
                            cost: number;
                            openingValue: number;
                            purchases: number;
                            disposals: number;
                            depreciation: number;
                            accumulatedDepreciation: number;
                            closingValue: number;
                            privateUseAmount: number;
                        }[];
                        totals: {
                            cost: number;
                            openingValue: number;
                            purchases: number;
                            disposals: number;
                            depreciation: number;
                            accumulatedDepreciation: number;
                            closingValue: number;
                            privateUseAmount: number;
                        };
                    };
                };
            };
            /** @description Bad request - invalid or missing query parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "reports.profitLoss": {
        parameters: {
            query?: {
                /** @description Period type for the report. Matches the presets available in the Prosaic UI. Relative periods (this-month, this-quarter, etc.) are resolved to full NZ calendar periods, so omit startDate/endDate when using them. Use custom to supply explicit startDate and endDate. */
                periodType?: "custom" | "this-month" | "last-month" | "this-quarter" | "last-quarter" | "this-financial-year" | "last-financial-year";
                /** @description Start date for custom period. Required when periodType is `custom`. */
                startDate?: string;
                /** @description End date for custom period. Required when periodType is `custom`. */
                endDate?: string;
                /** @description Whether to include comparison columns */
                comparison?: "none" | "periods";
                /** @description Granularity of each comparison period. For UI-consistent results, pair month with this-month/last-month, quarter with this-quarter/last-quarter, and year with the financial-year periods. */
                comparisonType?: "custom" | "year" | "month" | "quarter";
                /** @description Number of comparison periods (1-12) */
                comparisonPeriods?: string;
                /** @description Include accounts with zero balances */
                includeZeroBalances?: "false" | "true";
            };
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        metadata: {
                            entityId: string;
                            entityName: string;
                            generatedAt: string;
                            currency: string;
                            /** @enum {string} */
                            reportType: "profit-loss";
                            startDate: string;
                            endDate: string;
                            periodDescription: string;
                            comparisonPeriods?: string[];
                            comparisonPeriodRanges?: {
                                label: string;
                                startDate: string;
                                endDate: string;
                            }[];
                        };
                        tradingIncome: {
                            header: string;
                            totalLabel: string;
                            accounts: {
                                accountId: string;
                                accountCode: string;
                                accountName: string;
                                /** @enum {string} */
                                accountType: "Revenue" | "Expense";
                                accountSubtype: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                totalCredit: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                totalDebit: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                balance: string;
                                comparisonPeriods?: {
                                    [key: string]: {
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        balance: string;
                                    };
                                };
                                segments?: {
                                    [key: string]: {
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        balance: string;
                                    };
                                };
                            }[];
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            total: string;
                            comparisonTotals: {
                                [key: string]: string;
                            };
                            segmentTotals?: {
                                [key: string]: string;
                            };
                        };
                        costOfSales: {
                            header: string;
                            totalLabel: string;
                            accounts: {
                                accountId: string;
                                accountCode: string;
                                accountName: string;
                                /** @enum {string} */
                                accountType: "Revenue" | "Expense";
                                accountSubtype: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                totalCredit: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                totalDebit: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                balance: string;
                                comparisonPeriods?: {
                                    [key: string]: {
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        balance: string;
                                    };
                                };
                                segments?: {
                                    [key: string]: {
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        balance: string;
                                    };
                                };
                            }[];
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            total: string;
                            comparisonTotals: {
                                [key: string]: string;
                            };
                            segmentTotals?: {
                                [key: string]: string;
                            };
                        };
                        otherIncome: {
                            header: string;
                            totalLabel: string;
                            accounts: {
                                accountId: string;
                                accountCode: string;
                                accountName: string;
                                /** @enum {string} */
                                accountType: "Revenue" | "Expense";
                                accountSubtype: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                totalCredit: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                totalDebit: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                balance: string;
                                comparisonPeriods?: {
                                    [key: string]: {
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        balance: string;
                                    };
                                };
                                segments?: {
                                    [key: string]: {
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        balance: string;
                                    };
                                };
                            }[];
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            total: string;
                            comparisonTotals: {
                                [key: string]: string;
                            };
                            segmentTotals?: {
                                [key: string]: string;
                            };
                        };
                        operatingExpenses: {
                            header: string;
                            totalLabel: string;
                            accounts: {
                                accountId: string;
                                accountCode: string;
                                accountName: string;
                                /** @enum {string} */
                                accountType: "Revenue" | "Expense";
                                accountSubtype: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                totalCredit: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                totalDebit: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                balance: string;
                                comparisonPeriods?: {
                                    [key: string]: {
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        balance: string;
                                    };
                                };
                                segments?: {
                                    [key: string]: {
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        balance: string;
                                    };
                                };
                            }[];
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            total: string;
                            comparisonTotals: {
                                [key: string]: string;
                            };
                            segmentTotals?: {
                                [key: string]: string;
                            };
                        };
                        hasTradingSection: boolean;
                        totals: {
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            grossProfit: string;
                            grossProfitComparison: {
                                [key: string]: string;
                            };
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            netProfit: string;
                            netProfitComparison: {
                                [key: string]: string;
                            };
                        };
                        segmentColumns?: {
                            key: string;
                            label: string;
                            isArchived: boolean;
                            dimensionId: string;
                            dimensionName: string;
                        }[];
                    };
                };
            };
            /** @description Bad request - invalid query parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "transactions.reconcile": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
                transactionId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    assignment: {
                        code: string;
                        name: string;
                        taxCode: string;
                        credit?: number;
                        debit?: number;
                        description?: string;
                        dimensionOptionIds?: string[];
                    }[];
                    narration?: string;
                    /** @enum {string} */
                    taxMode?: "NO_TAX" | "TAX_INCLUSIVE" | "TAX_EXCLUSIVE";
                    fileIds?: string[];
                };
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {boolean} */
                        success: true;
                        data: {
                            transactionId: string;
                            journalId: string;
                            logicalJournalId: string;
                        };
                    };
                };
            };
            /** @description Bad request - validation error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Transaction not found or already reconciled */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
    "transactions.reverse": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
                transactionId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    reverseReason?: string;
                };
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {boolean} */
                        success: true;
                        data: {
                            transactionId: string;
                            logicalJournalId: string;
                            reversalJournalId: string;
                            /** Format: date-time */
                            reversedAt: string;
                            reverseReason: string;
                        };
                    };
                };
            };
            /** @description Bad request - validation error or transaction cannot be reversed */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Transaction not found or access denied */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
    "transactions.list": {
        parameters: {
            query?: {
                /** @description Page number (starts at 1) */
                page?: number;
                /** @description Number of items per page */
                pageSize?: number;
                /** @description Start date for filtering transactions (ISO 8601 format) */
                dateFrom?: string;
                /** @description End date for filtering transactions (ISO 8601 format) */
                dateTo?: string;
                /** @description Filter by journal ID to get transactions reconciled to a specific journal */
                journalId?: string;
            };
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            entityId: string | null;
                            /** @enum {string} */
                            reconciliationStatus: "reconciled" | "unreconciled";
                            journalId: string | null;
                            bankAccount: {
                                id: string;
                                entityId: string | null;
                                externalId: string;
                                name: string;
                                alias: string | null;
                                institution: string | null;
                                accountNumber: string | null;
                                logoUrl: string | null;
                                type: string;
                                entityAccount: {
                                    id: string;
                                    code: string;
                                    name: string;
                                    type: string;
                                    subtype: string;
                                    taxCode: string;
                                    description: string | null;
                                    mappedCode: string | null;
                                    isSystem: boolean;
                                    parentId?: string | null;
                                    isExcluded?: boolean;
                                    isIncluded?: boolean;
                                    /** @enum {string} */
                                    source?: "template" | "overridden" | "custom";
                                } | null;
                            };
                            merchant: {
                                id: string;
                                name: string;
                                provider: string | null;
                                identifier: string;
                            } | null;
                            category: {
                                id: string;
                                name: string;
                                identifier: string;
                            } | null;
                            user: {
                                id: string;
                                email: string;
                                name: string | null;
                                tradingName: string | null;
                                /** Format: date-time */
                                createdAt: string;
                            };
                            suggestions?: {
                                id: string;
                                sourceType: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                confidence: string;
                                status: string;
                                ruleId: string | null;
                                ruleName: string | null;
                                lines: {
                                    id: string;
                                    /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                    proportion: string | null;
                                    /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                    credit: string;
                                    /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                    debit: string;
                                    entityAccountId: string;
                                    entityAccount: {
                                        id: string;
                                        code: string;
                                        name: string;
                                    };
                                    taxRateId: string | null;
                                    taxRate: {
                                        id: string;
                                        code: string;
                                        name: string;
                                        description: string | null;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        rate: string;
                                    } | null;
                                }[];
                            }[];
                            id: string;
                            /** Format: date-time */
                            date: string;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            amount: string;
                            description: string;
                            type: string;
                            particulars: string | null;
                            code: string | null;
                            reference: string | null;
                        }[];
                        pagination: {
                            currentPage: number;
                            pageSize: number;
                            totalCount: number;
                            totalPages: number;
                            hasNextPage: boolean;
                            hasPreviousPage: boolean;
                        };
                    };
                };
            };
            /** @description Bad request - missing or invalid parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                        field?: string;
                        value?: string;
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
    "reports.trialBalance": {
        parameters: {
            query?: {
                /** @description As-of date for cumulative mode. Defaults to today. */
                asOfDate?: string;
                /** @description Report calculation mode */
                reportMode?: "cumulative" | "movement";
                /** @description Start date for movement mode. */
                movementStartDate?: string;
                /** @description End date for movement mode. */
                movementEndDate?: string;
                /** @description How to group accounts in the response */
                groupBy?: "type" | "subtype" | "none";
                /** @description Include accounts with zero balances */
                includeZeroBalances?: "false" | "true";
                /** @description Whether to include comparison columns */
                comparison?: "none" | "periods";
                /** @description Type of comparison period. Used when comparison=periods. */
                comparisonType?: "year" | "month";
                /** @description Number of comparison periods (1-12). Used when comparison=periods. */
                comparisonPeriods?: string;
                /** @description Snap comparison dates to end of month */
                compareToEndOfMonth?: "false" | "true";
                /** @description Snap comparison dates to end of financial year (31 March) */
                compareToEndOfFinancialYear?: "false" | "true";
            };
            header?: never;
            path: {
                entityId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        metadata: {
                            entityId: string;
                            entityName: string;
                            generatedAt: string;
                            currency: string;
                            /** @enum {string} */
                            reportType: "trial-balance";
                            asOfDate: string;
                            movementStartDate?: string;
                            movementEndDate?: string;
                        };
                        totals: {
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            totalDebits: string;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            totalCredits: string;
                            isBalanced: boolean;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            variance: string;
                        };
                        accountGroups: {
                            type: string;
                            name: string;
                            accounts: {
                                accountId: string;
                                accountCode: string;
                                accountName: string;
                                /** @enum {string} */
                                accountType: "Equity" | "Revenue" | "Expense" | "Asset" | "Liability";
                                accountSubtype: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                debitBalance: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                creditBalance: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                netBalance: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                totalCredit: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                totalDebit: string;
                                isSystemGenerated?: boolean;
                                /** @enum {string|null} */
                                earningsType?: "retained" | null;
                            }[];
                            subtotal: {
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                debits: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                credits: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                net: string;
                            };
                        }[];
                    } | {
                        metadata: {
                            entityId: string;
                            entityName: string;
                            generatedAt: string;
                            currency: string;
                            /** @enum {string} */
                            reportType: "trial-balance-comparison";
                            asOfDate: string;
                            comparisonPeriods: string[];
                            comparisonPeriodDates?: string[];
                            comparisonType: string;
                        };
                        totals: {
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            totalDebits: string;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            totalCredits: string;
                            isBalanced: boolean;
                            /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                            variance: string;
                        };
                        comparisonTotals: {
                            [key: string]: {
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                totalDebits: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                totalCredits: string;
                                isBalanced: boolean;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                variance: string;
                            };
                        };
                        accountGroups: {
                            type: string;
                            name: string;
                            accounts: {
                                comparisonPeriods: {
                                    [key: string]: {
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        debitBalance: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        creditBalance: string;
                                        /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                        netBalance: string;
                                    };
                                };
                                accountId: string;
                                accountCode: string;
                                accountName: string;
                                /** @enum {string} */
                                accountType: "Equity" | "Revenue" | "Expense" | "Asset" | "Liability";
                                accountSubtype: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                debitBalance: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                creditBalance: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                netBalance: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                totalCredit: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                totalDebit: string;
                                isSystemGenerated?: boolean;
                                /** @enum {string|null} */
                                earningsType?: "retained" | null;
                            }[];
                            subtotal: {
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                debits: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                credits: string;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                net: string;
                            };
                            comparisonSubtotals: {
                                [key: string]: {
                                    /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                    debits: string;
                                    /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                    credits: string;
                                    /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                    net: string;
                                };
                            };
                        }[];
                    };
                };
            };
            /** @description Bad request - invalid query parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden - No access to the specified entity */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "entities.list": {
        parameters: {
            query?: {
                /** @description Filter entities by specific entity ID */
                entityId?: string;
                /** @description Filter entities by client user ID (returns entities where the user is a member) */
                clientId?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            name: string;
                            type: string;
                            currentTemplateId: string | null;
                            defaultTaxAccountId: string | null;
                            /** Format: date-time */
                            createdAt: string;
                            bankAccounts: {
                                id: string;
                                entityId: string | null;
                                externalId: string;
                                name: string;
                                alias: string | null;
                                institution: string | null;
                                accountNumber: string | null;
                                logoUrl: string | null;
                                type: string;
                                entityAccount: {
                                    id: string;
                                    code: string;
                                    name: string;
                                    type: string;
                                    subtype: string;
                                    taxCode: string;
                                    description: string | null;
                                    mappedCode: string | null;
                                    isSystem: boolean;
                                    parentId?: string | null;
                                    isExcluded?: boolean;
                                    isIncluded?: boolean;
                                    /** @enum {string} */
                                    source?: "template" | "overridden" | "custom";
                                } | null;
                            }[];
                            clients: {
                                id: string;
                                email: string;
                                name: string | null;
                                tradingName: string | null;
                                /** Format: date-time */
                                createdAt: string;
                            }[];
                            taxRates: {
                                id: string;
                                code: string;
                                name: string;
                                description: string | null;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                rate: string;
                            }[];
                        }[];
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
    "entities.create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    accountTemplateId: string;
                    /** @enum {string} */
                    type: "individual" | "company" | "trust" | "partnership" | "rental" | "other";
                    name: string;
                    workspaceDimensionIds?: string[];
                    isGstRegistered?: boolean;
                    areGstReportsAutomated?: boolean;
                    gstNumber?: string;
                    irdNumber?: string;
                    /** @enum {string} */
                    gstPeriod?: "1" | "2" | "3" | "6" | "12";
                    gstFilingStartDate?: string;
                    nzbn?: string;
                    industryCode?: string;
                    conversionDate?: string | null;
                    clientIds?: string[];
                    bankAccountIds?: string[];
                    isDemo?: boolean;
                    demoType?: string;
                    parties?: {
                        name: string;
                        roles: ("other" | "director" | "shareholder" | "trustee" | "partner" | "beneficiary" | "settlor" | "owner")[];
                        isOrganisation?: boolean;
                        nzbn?: string;
                        shares?: number;
                        /** @enum {string} */
                        source?: "manual" | "nzbn";
                    }[];
                    registeredAddress?: string;
                    postalAddress?: string;
                    email?: string;
                    phone?: string;
                    website?: string;
                    tradingNames?: string[];
                    registrationDate?: string;
                    entityStatus?: string;
                    entityTypeDescription?: string;
                    companyNumber?: string;
                };
            };
        };
        responses: {
            /** @description Successful response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            name: string;
                            type: string;
                            currentTemplateId: string | null;
                            defaultTaxAccountId: string | null;
                            /** Format: date-time */
                            createdAt: string;
                            bankAccounts: {
                                id: string;
                                entityId: string | null;
                                externalId: string;
                                name: string;
                                alias: string | null;
                                institution: string | null;
                                accountNumber: string | null;
                                logoUrl: string | null;
                                type: string;
                                entityAccount: {
                                    id: string;
                                    code: string;
                                    name: string;
                                    type: string;
                                    subtype: string;
                                    taxCode: string;
                                    description: string | null;
                                    mappedCode: string | null;
                                    isSystem: boolean;
                                    parentId?: string | null;
                                    isExcluded?: boolean;
                                    isIncluded?: boolean;
                                    /** @enum {string} */
                                    source?: "template" | "overridden" | "custom";
                                } | null;
                            }[];
                            clients: {
                                id: string;
                                email: string;
                                name: string | null;
                                tradingName: string | null;
                                /** Format: date-time */
                                createdAt: string;
                            }[];
                            taxRates: {
                                id: string;
                                code: string;
                                name: string;
                                description: string | null;
                                /** @description Exact decimal serialized as a string. Use Decimal.js for arithmetic. */
                                rate: string;
                            }[];
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Validation failed */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                        details?: Record<string, never>[];
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /**
             * @description Forbidden. Either the token is scoped to a single entity
             *     (`TOKEN_ENTITY_SCOPE`), or the token's workspace role is not a firm
             *     staff role — advisor, admin or workspace owner (`INSUFFICIENT_ROLE`).
             */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Workspace not found or access denied */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /**
             * @description One or more of the supplied `bankAccountIds` is already linked to a
             *     different entity (`BANK_ACCOUNT_ASSIGNED_TO_DIFFERENT_ENTITY`). Bank
             *     accounts may only be linked while unassigned.
             */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
    "extensions.request": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                extensionId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    connection: string;
                    path: string;
                    method?: string;
                    headers?: {
                        [key: string]: string;
                    };
                    body?: unknown;
                    timeoutMs?: number;
                    entityId?: string;
                };
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        status: number;
                        ok: boolean;
                        headers: {
                            [key: string]: string;
                        };
                        body: unknown;
                    };
                };
            };
            /** @description The token is not for this extension, or the host is not allowed */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The connection is not connected */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "globalAccounts.list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            code: string;
                            name: string;
                            description: string | null;
                            type: string;
                            subtype: string;
                            isSystem: boolean;
                            taxCode: string | null;
                            metadata: unknown;
                        }[];
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "gstReturns.list": {
        parameters: {
            query?: {
                /** @description Return only GST returns for this entity */
                entityId?: string;
                /**
                 * @description Return only GST returns in these lifecycle statuses. Repeatable, and
                 *     a comma-separated list means the same thing — `?status=draft&status=filed`
                 *     and `?status=draft,filed` are equivalent. Omit for every status;
                 *     nothing is filtered out by default, so completed returns appear
                 *     alongside outstanding ones. To see only live work, list the seven
                 *     statuses other than `completed`.
                 */
                status?: string[];
                /** @description Return only GST returns whose period ends on or after this NZ date */
                dateFrom?: string;
                /** @description Return only GST returns whose period starts on or before this NZ date */
                dateTo?: string;
                /** @description Return only GST returns due on or after this NZ date */
                dueAfter?: string;
                /** @description Return only GST returns due on or before this NZ date */
                dueBefore?: string;
                /** @description Include draft returns whose period has not started yet (default false) */
                includeFutureDrafts?: "false" | "true";
                /** @description Page number (default 1) */
                page?: number;
                /** @description Items per page (default 100) */
                pageSize?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            entityId: string;
                            name: string;
                            description: string;
                            /** @enum {string} */
                            status: "draft" | "finalised" | "filed" | "filed_externally" | "accepted" | "rejected" | "awaiting_payment" | "completed";
                            dateFrom: string;
                            dateTo: string;
                            dueDate: string;
                            isOverdue: boolean;
                            netGstPosition: number | null;
                            unreconciledTransactionCount: number;
                            hasAmendment: boolean;
                            finalisedAt: string | null;
                            irdFiledAt: string | null;
                            updatedAt: string;
                        }[];
                        pagination: {
                            currentPage: number;
                            pageSize: number;
                            totalCount: number;
                            totalPages: number;
                            hasNextPage: boolean;
                            hasPreviousPage: boolean;
                        };
                    };
                };
            };
            /** @description Invalid query parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiErrorResponse"];
                };
            };
            /** @description Unauthorized - invalid or missing credentials */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiErrorResponse"];
                };
            };
            /** @description An entity-scoped token asked for an entity it is not pinned to */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiErrorResponse"];
                };
            };
            /** @description Workspace not found or not accessible with these credentials */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiErrorResponse"];
                };
            };
        };
    };
    "invoices.list": {
        parameters: {
            query?: {
                /** @description Return invoices for one entity. */
                entityId?: string;
                /** @description Return invoices whose entity is associated with this client user. */
                clientId?: string;
                /** @description Filter by persisted invoice lifecycle status. */
                status?: "DRAFT" | "FINALISED" | "PAID" | "VOIDED";
                /** @description Return invoices updated on or after this ISO 8601 timestamp. */
                updatedSince?: string;
                page?: number;
                pageSize?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            entityId: string;
                            workspaceId: string;
                            fileId: string | null;
                            invoiceNumber: string | null;
                            status: string;
                            taxMode: string;
                            /** Format: date-time */
                            issueDate: string;
                            /** Format: date-time */
                            dueDate: string | null;
                            /** Format: date-time */
                            sentAt: string | null;
                            recipientName: string;
                            recipientEmail: string | null;
                            recipientAddress: string | null;
                            bankAccountId: string | null;
                            subtotal: number;
                            taxTotal: number;
                            total: number;
                            notes: string | null;
                            /** Format: date-time */
                            createdAt: string;
                            /** Format: date-time */
                            updatedAt: string;
                            lines: {
                                id: string;
                                description: string;
                                quantity: number;
                                unitPrice: number;
                                taxRate: number;
                                taxRateCode: string | null;
                                entityAccountId: string | null;
                                amount: number;
                                taxAmount: number;
                                position: number;
                            }[];
                        }[];
                        pagination: {
                            currentPage: number;
                            pageSize: number;
                            totalCount: number;
                            totalPages: number;
                            hasNextPage: boolean;
                            hasPreviousPage: boolean;
                        };
                    };
                };
            };
            /** @description Invalid query parameters. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Insufficient role. */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Workspace not found. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error. */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "me.retrieve": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            email: string;
                            name: string | null;
                            workspaces: {
                                id: string;
                                name: string;
                                /** @enum {string} */
                                role: "client" | "standard_user" | "admin" | "accountant" | "advisor" | "workspace_owner";
                            }[];
                            hasConnectedBankAccounts: boolean;
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key/token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description User not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
    "version.retrieve": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        version: string;
                        name: string;
                        status: string;
                    };
                };
            };
        };
    };
    "rules.retrieve": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                ruleId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            name: string;
                            description: string | null;
                            isActive: boolean;
                            targetType: string;
                            /** Format: date-time */
                            createdAt: string;
                            /** Format: date-time */
                            updatedAt: string;
                            conditions: {
                                id: string;
                                field: string;
                                operator: string;
                                value: string;
                                secondValue: string | null;
                            }[];
                            actions: {
                                id: string;
                                actionType: string;
                                payload: unknown;
                            }[];
                            scopes: {
                                id: string;
                                scopeType: string;
                                entity: {
                                    id: string;
                                    name: string;
                                } | null;
                                bankAccount: {
                                    id: string;
                                    name: string;
                                } | null;
                                accountTemplate: {
                                    id: string;
                                    name: string;
                                } | null;
                            }[];
                        };
                    };
                };
            };
            /** @description Invalid rule ID */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Insufficient role */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Rule or workspace not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "rules.del": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                ruleId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            /** @enum {boolean} */
                            success: true;
                        };
                    };
                };
            };
            /** @description Invalid rule ID */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Insufficient role */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Rule or workspace not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "rules.update": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                ruleId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name?: string;
                    description?: string | null;
                    isActive?: boolean;
                    conditions?: {
                        /** @enum {string} */
                        field: "description" | "type" | "date" | "amount" | "category" | "merchant";
                        /** @enum {string} */
                        operator: "endsWith" | "startsWith" | "is" | "equals" | "contains" | "gt" | "gte" | "lt" | "lte" | "between";
                        value: string;
                        secondValue?: string | null;
                    }[];
                    /** @enum {string} */
                    targetType?: "bank_transaction";
                    actions?: {
                        /** @enum {string} */
                        actionType: "post_journal" | "tag_dimensions";
                        payload: unknown;
                    }[];
                    scopes?: ({
                        /** @enum {string} */
                        scopeType: "workspace";
                    } | {
                        /** @enum {string} */
                        scopeType: "template";
                        accountTemplateId: string;
                    } | {
                        /** @enum {string} */
                        scopeType: "entity";
                        entityId: string;
                    } | {
                        /** @enum {string} */
                        scopeType: "bank_account";
                        bankAccountId: string;
                    })[];
                };
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            name: string;
                            description: string | null;
                            isActive: boolean;
                            targetType: string;
                            /** Format: date-time */
                            createdAt: string;
                            /** Format: date-time */
                            updatedAt: string;
                            conditions: {
                                id: string;
                                field: string;
                                operator: string;
                                value: string;
                                secondValue: string | null;
                            }[];
                            actions: {
                                id: string;
                                actionType: string;
                                payload: unknown;
                            }[];
                            scopes: {
                                id: string;
                                scopeType: string;
                                entity: {
                                    id: string;
                                    name: string;
                                } | null;
                                bankAccount: {
                                    id: string;
                                    name: string;
                                } | null;
                                accountTemplate: {
                                    id: string;
                                    name: string;
                                } | null;
                            }[];
                        };
                    };
                };
            };
            /**
             * @description Validation failed. Covers both shape errors (missing/invalid fields)
             *     and action-payload semantic errors caught by the request schema
             *     (e.g. proportion lines must sum to 1).
             */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Insufficient role */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Rule or workspace not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /**
             * @description Rule failed service-level validation against workspace data
             *     (e.g. unknown tax rate codes, account codes not allowed by the
             *     action type). Distinct from 400, which is raised by the request
             *     schema before the service is called.
             */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "rules.list": {
        parameters: {
            query?: {
                /**
                 * @description Filter rules by active status. `true` (default) returns only active rules,
                 *     `false` returns only inactive rules, `all` returns both.
                 */
                isActive?: "false" | "true" | "all";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            name: string;
                            description: string | null;
                            isActive: boolean;
                            targetType: string;
                            /** Format: date-time */
                            createdAt: string;
                            /** Format: date-time */
                            updatedAt: string;
                            conditions: {
                                id: string;
                                field: string;
                                operator: string;
                                value: string;
                                secondValue: string | null;
                            }[];
                            actions: {
                                id: string;
                                actionType: string;
                                payload: unknown;
                            }[];
                            scopes: {
                                id: string;
                                scopeType: string;
                                entity: {
                                    id: string;
                                    name: string;
                                } | null;
                                bankAccount: {
                                    id: string;
                                    name: string;
                                } | null;
                                accountTemplate: {
                                    id: string;
                                    name: string;
                                } | null;
                            }[];
                        }[];
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Validation failed */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Insufficient role */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Workspace not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "rules.create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name: string;
                    conditions: {
                        /** @enum {string} */
                        field: "description" | "type" | "date" | "amount" | "category" | "merchant";
                        /** @enum {string} */
                        operator: "endsWith" | "startsWith" | "is" | "equals" | "contains" | "gt" | "gte" | "lt" | "lte" | "between";
                        value: string;
                        secondValue?: string | null;
                    }[];
                    actions: {
                        /** @enum {string} */
                        actionType: "post_journal" | "tag_dimensions";
                        payload: unknown;
                    }[];
                    scopes: ({
                        /** @enum {string} */
                        scopeType: "workspace";
                    } | {
                        /** @enum {string} */
                        scopeType: "template";
                        accountTemplateId: string;
                    } | {
                        /** @enum {string} */
                        scopeType: "entity";
                        entityId: string;
                    } | {
                        /** @enum {string} */
                        scopeType: "bank_account";
                        bankAccountId: string;
                    })[];
                    description?: string | null;
                    isActive?: boolean;
                    /** @enum {string} */
                    targetType?: "bank_transaction";
                    /** @enum {string} */
                    source?: "manual" | "ai" | "duplicate" | "transactions_filters" | "transactions_reconcile" | "dimension_proposal" | "demo_seed";
                };
            };
        };
        responses: {
            /** @description Successful response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            name: string;
                            description: string | null;
                            isActive: boolean;
                            targetType: string;
                            /** Format: date-time */
                            createdAt: string;
                            /** Format: date-time */
                            updatedAt: string;
                            conditions: {
                                id: string;
                                field: string;
                                operator: string;
                                value: string;
                                secondValue: string | null;
                            }[];
                            actions: {
                                id: string;
                                actionType: string;
                                payload: unknown;
                            }[];
                            scopes: {
                                id: string;
                                scopeType: string;
                                entity: {
                                    id: string;
                                    name: string;
                                } | null;
                                bankAccount: {
                                    id: string;
                                    name: string;
                                } | null;
                                accountTemplate: {
                                    id: string;
                                    name: string;
                                } | null;
                            }[];
                        };
                    };
                };
            };
            /**
             * @description Validation failed. Covers both shape errors (missing/invalid fields)
             *     and action-payload semantic errors caught by the request schema
             *     (e.g. proportion lines must sum to 1).
             */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Insufficient role */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Workspace not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /**
             * @description Rule failed service-level validation against workspace data
             *     (e.g. unknown tax rate codes, account codes not allowed by the
             *     action type). Distinct from 400, which is raised by the request
             *     schema before the service is called.
             */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "scheduledTasks.retrieve": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            name: string;
                            prompt: string;
                            entityId: string | null;
                            cron: string;
                            schedule: string;
                            timezone: string;
                            isEnabled: boolean;
                            autoApproveWrites: boolean;
                            emailTo: string | null;
                            /** Format: date-time */
                            lastRunAt: string | null;
                            lastStatus: string | null;
                            lastError: string | null;
                            runCount: number;
                            /** Format: date-time */
                            createdAt: string;
                            /** Format: date-time */
                            updatedAt: string;
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Insufficient role */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Task not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "scheduledTasks.del": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            deleted: boolean;
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Insufficient role */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Task not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "scheduledTasks.update": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name?: string;
                    prompt?: string;
                    entityId?: string | null;
                    schedule?: {
                        /** @enum {string} */
                        cadence: "daily" | "weekdays" | "weekly" | "monthly";
                        hour: number;
                        minute: number;
                        weekday?: number;
                        dayOfMonth?: number;
                    };
                    isEnabled?: boolean;
                    autoApproveWrites?: boolean;
                    emailTo?: string | null;
                };
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            name: string;
                            prompt: string;
                            entityId: string | null;
                            cron: string;
                            schedule: string;
                            timezone: string;
                            isEnabled: boolean;
                            autoApproveWrites: boolean;
                            emailTo: string | null;
                            /** Format: date-time */
                            lastRunAt: string | null;
                            lastStatus: string | null;
                            lastError: string | null;
                            runCount: number;
                            /** Format: date-time */
                            createdAt: string;
                            /** Format: date-time */
                            updatedAt: string;
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Validation failed, or the email recipient is not a workspace member */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Entity is outside the caller's access */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Task not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "scheduledTasks.run": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            queued: boolean;
                        };
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Invalid task ID */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Insufficient role */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Task not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "scheduledTasks.list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            name: string;
                            prompt: string;
                            entityId: string | null;
                            cron: string;
                            schedule: string;
                            timezone: string;
                            isEnabled: boolean;
                            autoApproveWrites: boolean;
                            emailTo: string | null;
                            /** Format: date-time */
                            lastRunAt: string | null;
                            lastStatus: string | null;
                            lastError: string | null;
                            runCount: number;
                            /** Format: date-time */
                            createdAt: string;
                            /** Format: date-time */
                            updatedAt: string;
                        }[];
                        meta?: {
                            count: number;
                        };
                    };
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Insufficient role */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Workspace not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "scheduledTasks.create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name: string;
                    prompt: string;
                    schedule: {
                        /** @enum {string} */
                        cadence: "daily" | "weekdays" | "weekly" | "monthly";
                        hour: number;
                        minute: number;
                        weekday?: number;
                        dayOfMonth?: number;
                    };
                    entityId?: string | null;
                    isEnabled?: boolean;
                    autoApproveWrites?: boolean;
                    emailTo?: string | null;
                };
            };
        };
        responses: {
            /** @description Successful response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            id: string;
                            name: string;
                            prompt: string;
                            entityId: string | null;
                            cron: string;
                            schedule: string;
                            timezone: string;
                            isEnabled: boolean;
                            autoApproveWrites: boolean;
                            emailTo: string | null;
                            /** Format: date-time */
                            lastRunAt: string | null;
                            lastStatus: string | null;
                            lastError: string | null;
                            runCount: number;
                            /** Format: date-time */
                            createdAt: string;
                            /** Format: date-time */
                            updatedAt: string;
                        };
                    };
                };
            };
            /** @description Validation failed, or the email recipient is not a workspace member */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Entity is outside the caller's access */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Workspace not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Workspace is at its scheduled-task limit */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "transactions.reconcileBulk": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    updates: {
                        id: string;
                        invoiceId?: string;
                        narration?: string;
                        /** @enum {string} */
                        taxMode?: "NO_TAX" | "TAX_INCLUSIVE" | "TAX_EXCLUSIVE";
                        fileIds?: string[];
                        destinationEntityId?: string;
                        assignment?: {
                            code: string;
                            name: string;
                            taxCode: string;
                            credit?: number;
                            debit?: number;
                            description?: string;
                            destinationEntityId?: string;
                            dimensionOptionIds?: string[];
                        }[];
                    }[];
                };
            };
        };
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {boolean} */
                        success: true;
                        data: {
                            requestId: string;
                            transactionIds: string[];
                            status: string;
                            entityJobs: {
                                entityId: string;
                                jobId: string;
                                transactionCount: number;
                            }[];
                        };
                        message: string;
                    };
                };
            };
            /** @description Bad request - validation error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Unauthorized - Invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                    };
                };
            };
            /** @description Transaction(s) not found, already reconciled, or access denied */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Conflict - transactions already being processed */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "Some transactions are already being processed: 550e8400-e29b-41d4-a716-446655440001, 550e8400-e29b-41d4-a716-446655440002",
                     *       "code": "TRANSACTIONS_ALREADY_PROCESSING"
                     *     }
                     */
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        code?: string;
                    };
                };
            };
        };
    };
}
