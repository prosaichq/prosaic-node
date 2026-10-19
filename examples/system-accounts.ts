import type Prosaic from '../src/index.js';
import type { ChartsCreateParams } from '../src/index.js';

/** Create a chart with an explicit account for each required system purpose. */
export async function createChartWithSystemAccounts(client: Prosaic): Promise<string> {
  const params: ChartsCreateParams = {
    name: 'Firm chart',
    accounts: [
      { code: '220', name: 'Tax control', type: 'Liability', systemRole: 'GST', isIncluded: true },
      {
        code: '110',
        name: 'Trade debtors',
        type: 'Asset',
        systemRole: 'ACCOUNTS_RECEIVABLE',
        isIncluded: true,
      },
      {
        code: '310',
        name: 'Prior profits',
        type: 'Equity',
        systemRole: 'RETAINED_EARNINGS',
        isIncluded: true,
      },
      {
        code: '320',
        name: 'Current profit',
        type: 'Equity',
        systemRole: 'CURRENT_YEAR_EARNINGS',
        isIncluded: true,
      },
      {
        code: '230',
        name: 'Opening adjustments',
        type: 'Liability',
        systemRole: 'HISTORICAL_ADJUSTMENT',
        isIncluded: true,
      },
      {
        code: '240',
        name: 'Rounding',
        type: 'Liability',
        systemRole: 'ROUNDING',
        isIncluded: true,
      },
    ],
  };
  const { data: chart } = await client.charts.create(params);
  return chart.id;
}
