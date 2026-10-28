import type Prosaic from '../src/index.js';
import type { ChartsCreateParams } from '../src/index.js';

/** Create a chart from global accounts and include missing system accounts automatically. */
export async function createChartWithSystemAccounts(
  client: Prosaic,
  accounts: ChartsCreateParams['accounts'],
): Promise<string> {
  // Obtain account codes, names and types from globalAccounts.list().
  const { data: chart } = await client.charts.create({
    name: 'Firm chart',
    includeSystemAccounts: true,
    accounts,
  });
  return chart.id;
}
