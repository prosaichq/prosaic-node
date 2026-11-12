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
  const { data: taxonomy } = await client.reportCategories.listForWorkspace();
  // Activated charts need explicit pairs and all required role choices.
  // This helper never manufactures classification or review approval.
  if (
    taxonomy.reportingInputsEnabled &&
    accounts.some((row) => row.isIncluded && (!row.groupKey || row.categoryKey === undefined))
  ) {
    throw new Error('Choose a report group and explicit category for every included row');
  }
  const { data: chart } = await client.charts.create({
    name: 'Firm chart',
    includeSystemAccounts: !taxonomy.reportingInputsEnabled,
    accounts,
  });
  return chart.id;
}
