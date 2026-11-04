import Prosaic from '../src/index.js';

const apiKey = process.env.PROSAIC_API_KEY;
const entityId = process.env.PROSAIC_ENTITY_ID;
if (!apiKey || !entityId) throw new Error('Set PROSAIC_API_KEY and PROSAIC_ENTITY_ID');
const client = new Prosaic(apiKey, { baseUrl: process.env.PROSAIC_BASE_URL });

// Country comes from the authorised entity. Headings are structure, not choices.
const { data: taxonomy } = await client.reportCategories.list(entityId);
for (const group of taxonomy.groups.filter((group) => group.isAssignable)) {
  console.log(group.key, group.name, { allowGroupOnly: group.allowGroupOnly });
}

const { data: accounts } = await client.entityAccounts.list(entityId);
for (const account of accounts) {
  // A saved group with a null category is a valid group-only assignment.
  // subtype remains legacy compatibility data; use reportGroup for reporting.
  console.log(account.id, account.reportGroup?.key, account.reportCategory?.key);
}
