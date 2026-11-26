# Prosaic Node.js SDK

Build accounting integrations with Prosaic in TypeScript or JavaScript. Read transactions, create journals and work with financial reports through typed resource methods, with automatic pagination and OAuth helpers built in.

[Developer documentation](https://developer.prosaic.works/) · [API resource reference](docs/api-reference.md) · [Examples](examples) · [One-page quickstart](docs/sdk-quickstart.pdf)

**Node.js 22+ · TypeScript types included · ESM and CommonJS · No runtime dependencies**

> **Alpha — `0.1.0-alpha.3`.** Alpha releases are published under the `next` tag.

## Installation

```sh
npm install prosaic-node@next
# or
yarn add prosaic-node@next
```

## Your first API request

Use an API key for your own server-side integration. See the [developer documentation](https://developer.prosaic.works/) for API authentication and setup. Keep the key in your server environment.

Save this as `quickstart.mts`:

```ts
import Prosaic from 'prosaic-node';

const apiKey = process.env.PROSAIC_API_KEY;
if (!apiKey) throw new Error('Set PROSAIC_API_KEY before running this example.');

const prosaic = new Prosaic(apiKey);

// Confirm that authentication works.
const { data: me } = await prosaic.me.retrieve();
console.log(`Connected as ${me.name}`);

// Find the entity IDs to use in subsequent requests.
for await (const entity of prosaic.entities.list()) {
  console.log(entity.id, entity.name);
}
```

With `PROSAIC_API_KEY` set, run it using `tsx`:

```sh
yarn add --dev tsx
yarn tsx quickstart.mts
```

The client connects to `https://app.prosaic.works` by default. CommonJS applications can use `const { Prosaic } = require('prosaic-node')` inside their existing async code.

## Examples

These examples use the `prosaic` client above. Replace `YOUR_ENTITY_ID` with an ID from `entities.list()`.

### Read transactions across every page

```ts
for await (const transaction of prosaic.transactions.list('YOUR_ENTITY_ID', {
  dateFrom: '2026-04-01',
  dateTo: '2026-04-30',
  pageSize: 100,
})) {
  console.log(transaction.id, transaction.date, transaction.amount);
}
```

`for await` fetches subsequent pages as you need them. To collect a bounded number of results into an array:

```ts
const transactions = await prosaic.transactions
  .list('YOUR_ENTITY_ID')
  .autoPagingToArray({ limit: 50 });
```

Awaiting `prosaic.transactions.list(...)` directly returns one page, including its response envelope. You can also use `autoPagingEach()` and return `false` to stop early. Pagination does not provide a fixed snapshot: records can change while you iterate.

### Create a balanced draft journal

This creates a **draft** with `autoPost: false`. Use account codes from `entityAccounts.list(entityId)` and a tax rate ID appropriate to your entity. Replace all placeholders before running it against a test entity.

```ts
import type { JournalsCreateParams } from 'prosaic-node';

const params: JournalsCreateParams = {
  date: '2026-04-01',
  narration: 'Opening balance',
  taxMode: 'NO_TAX',
  autoPost: false,
  lines: [
    {
      entityAccountCode: 'YOUR_DEBIT_ACCOUNT_CODE',
      taxRateId: 'YOUR_TAX_RATE_ID',
      debit: '10.25',
    },
    {
      entityAccountCode: 'YOUR_CREDIT_ACCOUNT_CODE',
      taxRateId: 'YOUR_TAX_RATE_ID',
      credit: '10.25',
    },
  ],
};

const journal = await prosaic.journals.create('YOUR_ENTITY_ID', params);
console.log(journal.id, journal.status);
```

Journal creation returns the journal directly. Most other resources return a `{ data }` envelope. The SDK preserves the API's response shape; exported TypeScript types show what each method returns.

### Prepare and finalise an invoice separately

Use `invoices.createDraft()` when a person needs to review or complete an invoice before finalisation. Existing `invoices.create()` continues to create a finalised invoice; neither method emails it.

```ts
const { data: draft } = await prosaic.invoices.createDraft('YOUR_ENTITY_ID', {
  taxMode: 'NO_TAX',
  issueDate: '2026-11-25',
});
await prosaic.invoices.update('YOUR_ENTITY_ID', draft.id, {
  contactId: 'YOUR_CUSTOMER_CONTACT_ID',
  recipientName: 'Example customer',
  lines: [
    {
      description: 'Service',
      quantity: '1',
      unitPrice: '100.00',
      taxRateCode: 'YOUR_NO_TAX_RATE_CODE',
      entityAccountId: 'YOUR_REVENUE_ACCOUNT_ID',
    },
  ],
});
// Only finalise after reviewing a complete draft. The API refuses incomplete invoices.
await prosaic.invoices.update('YOUR_ENTITY_ID', draft.id, { status: 'FINALISED' });
```

`invoices.update()` accepts partial content **or** a lifecycle action: `FINALISED`, `DRAFT` (revert), or `VOIDED`. Supply `invoiceNumber` with finalisation to confirm a number already reviewed. A stale number returns `INVOICE_NUMBER_CHANGED`; review the new value before resubmitting. Omitted content fields stay unchanged, null clears nullable fields, and `lines` replaces all lines. `invoices.del()` deletes drafts only. Voiding leaves payments matched unless `unmatchPayments: true` is explicitly supplied. Existing period locks and payment protections still apply; these writes require staff and the appropriate entity permission. See the [invoice lifecycle example](examples/invoice-lifecycle.ts).

## Authentication and workspaces

Keep API keys and confidential-client secrets on your server, outside browser bundles and source control. API keys and OAuth access tokens are sent as Bearer credentials.

To select a workspace, set `workspaceId` on the client or override it on an individual request:

```ts
const workspaceClient = new Prosaic(apiKey, {
  workspaceId: 'YOUR_WORKSPACE_ID',
});

const { data: me } = await workspaceClient.me.retrieve({
  workspaceId: 'ANOTHER_WORKSPACE_ID',
});
```

Workspace selection does not grant permissions or override a token pinned to a different workspace.

### Connect users with OAuth

Use OAuth when users authorise your application to access Prosaic on their behalf. Register an OAuth application first, then begin an authorisation-code flow with PKCE:

```ts
import { OAuth } from 'prosaic-node';

const clientId = process.env.PROSAIC_CLIENT_ID;
if (!clientId) throw new Error('Set PROSAIC_CLIENT_ID before starting OAuth.');

const oauth = new OAuth({
  clientId,
  clientSecret: process.env.PROSAIC_CLIENT_SECRET, // Omit for a public client.
});

const authorization = oauth.createAuthorization({
  redirectUri: 'https://your-app.example/oauth/callback',
});

// Store authorization in the initiating user's server-side session.
// Redirect their browser to authorization.url.
```

On the callback, consume the stored authorisation once and enforce a short expiry. `oauth.completeAuthorization(callbackUrl, authorization)` checks the redirect destination and state before exchanging the code. Persist the returned tokens securely, including `expires_at` and the refresh token.

Pass `oauth.createTokenProvider(tokens, persistTokens)` as the client's `accessToken` option to refresh expiring tokens automatically. Your `persistTokens` callback must atomically save the updated tokens and return a promise. See the [OAuth example](examples/oauth.ts) for a typed callback helper that connects these steps.

The default scopes are `openid profile email offline_access`. Create one token provider per user grant; applications with multiple processes must coordinate refresh-token rotation across them. An `invalid_grant` error requires the user to authorise again. The SDK returns ID tokens unchanged and does not verify them for application login.

## Errors and request options

Catch `APIError` for HTTP errors and use its status, code and request ID to diagnose a failed request:

```ts
import { APIError } from 'prosaic-node';

try {
  const { data: payload, requestId } = await prosaic.me.retrieve().withResponse();
  console.log(payload.data.name, requestId);
} catch (error) {
  if (error instanceof APIError) {
    console.error(error.status, error.code, error.requestId);
  } else {
    throw error;
  }
}
```

Typed errors include `AuthenticationError`, `PermissionError`, `NotFoundError`, `ValidationError`, `ConflictError` and `RateLimitError`. Transport failures use `ConnectionError`, `TimeoutError` or `InvalidResponseError`; OAuth failures use `OAuthError`. Validation details are available in `error.details` when the API supplies them. Keep those details out of public logs because they may contain application data.

| Option              | Default                     | Purpose                                                    |
| ------------------- | --------------------------- | ---------------------------------------------------------- |
| `baseUrl`           | `https://app.prosaic.works` | Server origin, without `/api/public/v1`.                   |
| `timeout`           | `30000`                     | Total request deadline in milliseconds, including retries. |
| `maxNetworkRetries` | `2`                         | Maximum retries for transient GET/HEAD failures.           |
| `workspaceId`       | Unset                       | Workspace to select for requests.                          |

Set defaults in the second argument to `new Prosaic(apiKey, options)`. Override `timeout`, `maxNetworkRetries` or `workspaceId` in a method's final request-options argument; pass `signal` there to cancel a request. For local development, `baseUrl: 'http://localhost:3024'` is supported. Other non-loopback origins require HTTPS.

Retries respect `Retry-After` within the request deadline. **Writes and OAuth token requests are never automatically retried.** There is no general idempotency-key contract, so check the outcome of a failed mutation before trying it again. Credential-bearing redirects are not followed.

## Working with financial data

- **Amounts:** preserve values as returned. Many financial decimals are strings; some endpoints, including invoice responses, return numbers. Use Decimal.js for calculations. Invoice line quantities, unit prices and tax rates are decimal strings on input.
- **Dates:** supply financial calendar dates as `YYYY-MM-DD`. The SDK leaves date strings unchanged; avoid converting calendar dates through your machine's timezone.
- **Responses:** most methods return `{ data }`; journal creation, reports and uploads return plain objects. Request and response types are exported, including `JournalsCreateParams`, `InvoicesCreateParams` and `EntitiesListResponse`.

<details>
<summary>Endpoint-specific details</summary>

- `charts.listAccounts(chartId)` lists a template's accounts. With `includeHidden: true`, the response is unpaginated.
- Chart reads expose display tax labels; writes need machine tax codes from entity tax rates.
- Chart writes follow the selected workspace capability. Discover `reportCategories.listForWorkspace()` before creating a template. Activated included rows need `groupKey`, explicit `categoryKey` (nullable when eligible), and appropriate `systemRole` choices. Full replacement carries stable IDs, each row’s `expectedUpdatedAt`, and the template `expectedUpdatedAt`. Template account reporting edits use `expectedTemplateUpdatedAt` plus row `expectedUpdatedAt`. Metadata-only updates preserve classification. Validated API saves are ready to use immediately and follow the editor’s propagation rules. Call `charts.listAccounts(chartId, { summary: true })` to read `templateUpdatedAt` without downloading account rows. Use `{ editable: true }` to get the versioned update payload. See [Chart of accounts](https://developer.prosaic.works/docs/ledger/chart-of-accounts) and the [system-account example](examples/system-accounts.ts).
- `reportCategories.listForWorkspace()` returns the authorised workspace’s country taxonomy, `workspaceId` and `reportingInputsEnabled`, before an entity exists. `reportCategories.list(entityId)` exposes capability across all active workspaces and returns the complete taxonomy for the authorised entity's country. Headings are structure only (`isAssignable: false`). A group's `allowGroupOnly` permission does not remove category requirements for bank or asset-account functions. See the [discovery example](examples/report-categories.ts).
- Chart accounts expose saved `reportGroup` and nullable `reportCategory` summaries. A non-null group with a null category is a group-only assignment; a null group means unassigned. Use these fields for current reporting. `subtype` preserves legacy compatibility values and can differ from current report placement.
- `journals.void()` and `journals.attachFiles()` take `logicalJournalId`, not the journal version's `id`.
- `journals.createBulk()` records up to 100 journals and 1,000 lines in one transaction: all of them or none. `autoPost` is required. Send an `idempotencyKey` to make a retry safe, because the SDK never retries it for you. A rejected set throws an `APIError` whose `details.problems` lists each problem with its journal's position in the request.
- `fixedAssets.update()` changes a draft fixed asset. Send only the fields to change: omitted fields keep their stored values, and `null` clears a field that can be empty. `depreciationRate` is a percentage, and it overrides the asset type's default rate. Setting a rate clears a stored useful life, and the reverse. An active or disposed asset returns `409`.
- `bills.hold(entityId, billId, { reason? })` and `bills.release(entityId, billId)` change only an approved bill’s hold metadata. They leave the posted liability and payments intact; neither is an accounting reversal or client payment consent. The reason is optional/nullable and limited to 500 characters.
- `files.upload(entityId, file)` accepts a `File` or `Blob`. Use a named `File`, or pass a `filename` request option for a `Blob`.
- `bills.update(entityId, billId, { status: 'IN_REVIEW', reviewerId? })` submits a complete draft for review without posting it, optionally naming a reviewer (a staff or Standard user who can see the entity; `null` for nobody in particular). On a bill already in review it changes the reviewer. `{ status: 'DRAFT', reason }` sends a bill in review back to draft and needs a reason of up to 500 characters; on an approved bill the same move unapproves it. Approving still works from draft or review. Reads include `reviewerId`.
- `bills.create(entityId, { issueDate, fileId, ... })` saves a draft with one optional document returned by `files.upload()`. Review it before `bills.update(entityId, billId, { status: 'APPROVED' })` posts it to payables. Editing draft fields and changing status are separate requests. `DRAFT` unapproves and `VOIDED` voids; live payments and accounting period locks can refuse a move. All bill methods require workspace staff, entity permission and the bills feature flag. Monetary inputs are decimal strings; monetary outputs are numbers except list `amountPaid`/`amountDue`, which are decimal strings (null `amountDue` for drafts and voided bills). See the [supplier bill example](examples/supplier-bills.ts).
- Scheduled-task input `schedule` is a cadence/time object; its response `schedule` is display text.
- `extensions.request()` requires an extension-scoped token. Ordinary API keys and user OAuth tokens cannot call it. An upstream error is represented by embedded `status`/`ok` fields inside an HTTP 200 response.

</details>

## API coverage

This alpha includes 103 operations across 28 resource groups, generated from the checked-in [API contract](openapi/prosaic.json).

| Area                         | Resources                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------ |
| Identity and setup           | `me`, `version`, `entities`, `clients`, `nzbn`, `industryCodes`                |
| Accounts and dimensions      | `charts`, `entityAccounts`, `globalAccounts`, `dimensions`, `reportCategories` |
| Transactions and journals    | `transactions`, `bankAccounts`, `journals`, `changeSets`                       |
| Financial reporting          | `ledger`, `generalLedger`, `reports`, `gstReturns`                             |
| Contacts, invoices and bills | `contacts`, `invoices`, `bills`                                                |
| Assets and files             | `fixedAssets`, `fixedAssetTypes`, `files`                                      |
| Automation and extensions    | `rules`, `scheduledTasks`, `extensions`                                        |

Use the [API resource reference](docs/api-reference.md) to find a method, and the [developer documentation](https://developer.prosaic.works/) for the wider API.

### Alpha compatibility

The checked-in contract includes supplier bills, invoice draft and lifecycle operations, and Xero conversion operations. The developer documentation may describe newer API capabilities. This release updates `/api/public/v1` in place. The SDK package version does not select a write mode.

- **Generated code:** `yarn generate:check` confirms that code matches the checked-in snapshot. It does not verify compatibility with later server changes.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the development workflow and API contract updates.

```sh
yarn install --immutable
yarn test
yarn typecheck
yarn generate:check
yarn lint
yarn format:check
yarn test:package
```

The package smoke test builds the SDK and checks installation in ESM and CommonJS consumers. See [local API testing](docs/local-testing.md), [release instructions](docs/releasing.md) and the [SDK skill](skills/prosaic-sdk/SKILL.md) for agent-assisted integrations.

Found an SDK bug? [Open an issue](https://github.com/prosaichq/prosaic-node/issues) with a minimal reproduction, SDK version and request ID where available. Remove credentials and customer data before sharing.

## License

[MIT](LICENSE).
