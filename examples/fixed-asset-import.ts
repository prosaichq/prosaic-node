import Prosaic from '../src/index.js';
import type { FixedAssetsImportParams } from '../src/index.js';

const apiKey = process.env.PROSAIC_API_KEY;
const entityId = process.env.PROSAIC_ENTITY_ID;
if (!apiKey || !entityId) throw new Error('Set PROSAIC_API_KEY and PROSAIC_ENTITY_ID');
const client = new Prosaic(apiKey, { baseUrl: process.env.PROSAIC_BASE_URL });

// Bringing a register over from another system. The entity's conversion date is
// the day Prosaic takes over, so depreciation starts then and the balance
// before it is opening accumulated depreciation.
const { data: entities } = await client.entities.list({ entityId });
const conversionDate = entities[0]?.conversionDate;
if (!conversionDate) throw new Error('Set the entity conversion date first');

// Asset types carry the accounts each asset posts to. Match on these rather
// than sending a name the entity may not have.
const { data: assetTypes } = await client.fixedAssetTypes.list(entityId);
const equipment = assetTypes.find((type) => type.name === 'Office Equipment');
if (!equipment) throw new Error('Create an Office Equipment asset type first');

// Each row is a draft. Nothing posts to the ledger: the purchase and the
// depreciation to date are already in the balance sheet being imported.
const { data: imported } = await client.fixedAssets.import(entityId, {
  filename: 'xero-fixed-asset-register.csv',
  assets: [
    {
      name: 'MacBook Pro',
      assetNumber: 'FA-0001',
      entityFixedAssetTypeId: equipment.id,
      purchaseDate: '2024-07-15',
      purchasePrice: 4200,
      // Depreciation picks up where the old system stopped, so the start date
      // is the day after the balance was measured.
      accumulatedDepreciationAsAt: '2026-03-31',
      startDate: conversionDate,
      initialAccumulatedDepreciation: 1890,
      depreciationMethod: 'diminishing_value',
      depreciationRate: 30,
    },
  ],
});

for (const row of imported.results) {
  // `exists` means an asset already carries that number, so a retried import
  // reports it instead of creating a second one.
  console.log(row.row, row.status, row.assetId ?? '');
  for (const problem of row.errors) console.error(`  ${problem.field}: ${problem.message}`);
  for (const warning of row.warnings) console.warn(`  ${warning}`);
}

// Check the register against the old one before activating: a draft does not
// depreciate, and `del` removes one that came out wrong.
const activatable = imported.results
  .filter((row) => row.status === 'created')
  .map((row) => row.assetId)
  .filter((assetId): assetId is string => Boolean(assetId));

// Activation is what starts depreciation. It posts no purchase journal.
const { data: activation } = await client.fixedAssets.activate(entityId, {
  assetIds: activatable,
});
console.log(`Activated ${activation.activated.length}, refused ${activation.failed.length}`);
for (const failure of activation.failed) console.error(failure.assetId, failure.error);

// A draft that was imported wrongly can be removed and imported again. Only
// drafts: an active asset has posted journals behind it and returns 409.
if (process.env.PROSAIC_DISCARD_ASSET_ID) {
  await client.fixedAssets.del(entityId, process.env.PROSAIC_DISCARD_ASSET_ID);
}

// What the types refuse, checked at compile time and never sent. A cost limit
// and an investment boost are not import fields: a boost is already inside the
// opening accumulated depreciation, so claiming it again at activation would
// count it twice.
const refused: FixedAssetsImportParams[] = [
  // @ts-expect-error - every row needs a name
  { assets: [{ assetNumber: 'FA-0002' }] },
  // @ts-expect-error - costLimit is not an import field
  { assets: [{ name: 'Ute', costLimit: 5000 }] },
  // @ts-expect-error - an investment boost is not an import field
  { assets: [{ name: 'Ute', immediateExpensePercentage: 20 }] },
];
void refused;
