import type Prosaic from '../src/index.js';
import type { ChartsCreateParams } from '../src/index.js';

/**
 * Create a chart from global accounts and include missing system accounts automatically.
 * @param client - Authenticated Prosaic client for the selected workspace
 * @param accounts - Global account selections to include in the chart
 * @returns The created chart ID
 * @example
 * ```typescript
 * const chartId = await createChartWithSystemAccounts(client, accounts);
 * ```
 */
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
