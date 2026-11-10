# Migrate chart writes

This release deliberately changes chart writes under `/api/public/v1` in place. The SDK package version, API URL version and workspace capability are separate. Install the release only when the matching server support is deployed. This release is prepared as `0.1.0-alpha.3`; publication is pending.

## Discover before writing

```ts
import Prosaic, { APIError } from 'prosaic-node';
const client = new Prosaic(process.env.PROSAIC_API_KEY!, {
  workspaceId: process.env.PROSAIC_WORKSPACE_ID!,
});
const { data: workspace } = await client.reportCategories.listForWorkspace();
// No entity or arbitrary country parameter is required.
const entityId = process.env.PROSAIC_ENTITY_ID!;
const { data: taxonomy } = await client.reportCategories.list(entityId);
```

Country comes from the authorised workspace or entity. `reportingInputsEnabled` is an observation; every write checks policy again. For an entity it is true only when all its active workspaces are ready. Selecting a workspace does not grant permission or override token scope.

With inputs disabled, retain legacy parent requests and omit reporting fields. With inputs enabled, include an explicit group and category choice; omit parent inputs and retired `mode`/`reportingMode` fields. A null category is valid only for an assignable group that permits group-only accounts and an account function that does not require a category. Headings, including `exp`, cannot hold accounts; use an assignable group such as `exp.operating`. A category must allow the exact selected group. Account type derives from group.

`code: '4100.100'` is the account's local identity. `groupKey: 'exp.operating'` selects a taxonomy placement. The group key does not replace the account code.

## Create an entity account

Before:

```ts
await client.entityAccounts.create(entityId, {
  parentAccountCode: '4100',
  code: '4100.100',
  name: 'Office supplies',
  taxCode: 'YOUR_ENTITY_TAX_CODE',
});
```

After activation:

```ts
if (!taxonomy.reportingInputsEnabled) throw new Error('Workspace is not activated');
const group = taxonomy.groups.find(
  (g) => g.key === 'exp.operating' && g.isAssignable && g.allowGroupOnly,
);
if (!group) throw new Error('Choose an available group');
await client.entityAccounts.create(entityId, {
  code: '4100.100',
  name: 'Office supplies',
  taxCode: 'YOUR_ENTITY_TAX_CODE',
  reporting: { groupKey: group.key, categoryKey: null },
});
```

Use an entity machine tax code from its tax rates. Bank and fixed-asset account functions can require a category even when the group permits null.

For a new template, call `charts.create({ name, accounts })`. Each included account needs `code`, `name`, `isIncluded: true`, `groupKey`, explicit `categoryKey`, and `systemRole` where applicable. Include all six required roles: `GST`, `ACCOUNTS_RECEIVABLE`, `RETAINED_EARNINGS`, `CURRENT_YEAR_EARNINGS`, `HISTORICAL_ADJUSTMENT`, and `ROUNDING`. Choose pairs from workspace discovery appropriate to each role. Activated templates cannot manufacture unreviewed system accounts from omitted global defaults. Template writes need the applicable owner/admin permissions. After first use, permanent role locks prevent reassignment.

## Patch metadata without classification

```ts
await client.entityAccounts.update(entityId, 'ACCOUNT_ID', { name: 'Office consumables' });
await client.charts.update('CHART_ID', { description: 'Updated description' });
await client.charts.updateAccount('CHART_ID', 'TEMPLATE_ACCOUNT_ID', { description: null });
```

Omitted reporting fields preserve the saved pair. Metadata patches do not require a new classification or confirm review.

## Change to a null category with an expected pair

```ts
const { data: accounts } = await client.entityAccounts.list(entityId);
const account = accounts.find((row) => row.code === '4100.100');
if (!account?.reportGroup) throw new Error('Choose a classified account');
try {
  await client.entityAccounts.update(entityId, account.id, {
    reporting: {
      groupKey: 'exp.operating',
      categoryKey: null,
      expected: {
        groupKey: account.reportGroup.key,
        categoryKey: account.reportCategory?.key ?? null,
      },
    },
  });
} catch (error) {
  if (!(error instanceof APIError) || error.status !== 409) throw error;
  const capability = await client.reportCategories.list(entityId);
  const fresh = await client.entityAccounts.list(entityId);
  // Present fresh.data and capability.data for a new decision. Do not resubmit automatically.
  console.log(capability.data.reportingInputsEnabled, fresh.data.length);
}
```

Use `expected: null` only when the saved account has no group. A stale pair returns `CHART_INPUT_CONFLICT` (409).

## Read, edit and replace a template

A full replacement must contain every included row, stable existing IDs and both template and row versions. An account rename retains its ID. Read every page before replacing; reject a snapshot assembled across different template versions.

```ts
const chartId = 'CHART_ID';
const first = await client.charts.listAccounts(chartId, { page: 1, pageSize: 500 });
if (!('templateUpdatedAt' in first) || !('pagination' in first))
  throw new Error('Expected paginated template response');
const templateVersion = first.templateUpdatedAt;
const rows = [...first.data];
for (let page = 2; page <= first.pagination.totalPages; page++) {
  const next = await client.charts.listAccounts(chartId, { page, pageSize: 500 });
  if (!('templateUpdatedAt' in next) || next.templateUpdatedAt !== templateVersion)
    throw new Error('Reload template');
  rows.push(...next.data);
}
await client.charts.update(chartId, {
  expectedUpdatedAt: templateVersion,
  accounts: rows.map((row) => {
    if (!row.updatedAt || !row.reportGroup) throw new Error('Resolve unclassified rows first');
    return {
      id: row.id,
      expectedUpdatedAt: row.updatedAt,
      code: row.code,
      name: row.name,
      isIncluded: true,
      groupKey: row.reportGroup.key,
      categoryKey: row.reportCategory?.key ?? null,
      systemRole: row.systemRole,
      // Omit taxCode to preserve it: display tax labels are not machine tax codes.
    };
  }),
});
```

A single template-account reporting edit uses `expectedTemplateUpdatedAt` for the template and `expectedUpdatedAt` for the row. A single addition or deletion uses `expectedUpdatedAt` for the template. Refresh before a new operation.

Changed template pairs remain unreviewed. API keys, OAuth tokens and agents cannot confirm human template review or approve propagation. Existing review and role restrictions still apply.

## Recover from a refusal

`VALIDATION_ERROR` (400) means a missing, invalid or mixed assignment. Correct the request using discovery. `CHART_INPUT_CONTRACT_MISMATCH` (409) means the current workspace capability rejects this otherwise valid shape. Rediscover and ask for a deliberate new submission. `CHART_INPUT_CONFLICT` (409) means the saved pair or version changed. Reload and resolve the difference. `CHART_INPUT_POLICY_UNAVAILABLE` (503) means policy could not be evaluated; do not fall back to a legacy write.

The SDK never retries mutations automatically. Saved `reportGroup` and `reportCategory` describe reporting placement. Stored `subtype` response values and trial-balance `groupBy=subtype` remain available for compatibility; this write migration does not promise subtype-derived report output.
