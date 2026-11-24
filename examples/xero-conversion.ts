import type { Prosaic } from '../src/index.js';

/**
 * Preview the business details, chart mapping, and trial balance for a conversion.
 *
 * @param api - Authenticated SDK client for the workspace
 * @param entityId - Prosaic entity whose trial balance will be compared
 * @param nzbn - New Zealand Business Number to look up in the register
 * @returns The business record, chart proposal, and trial balance comparison
 * @example
 * const preview = await previewConversion(prosaic, entityId, '9429000106078');
 */
export async function previewConversion(api: Prosaic, entityId: string, nzbn: string) {
  const business = await api.nzbn.retrieve(nzbn);
  const proposal = await api.charts.propose({
    country: 'NZ',
    accounts: [
      {
        code: '416',
        name: 'Entertainment',
        type: 'Expense',
        taxName: '15% GST on Expenses',
        reportCode: 'EXP.ENT',
      },
    ],
  });
  const comparison = await api.reports.compareTrialBalance(entityId, {
    reportMode: 'cumulative',
    asOfDate: '2026-03-31',
    rows: [{ code: '416', balance: '520.24' }],
    tolerance: '0.01',
  });
  return { business: business.data, proposal: proposal.data, comparison };
}
