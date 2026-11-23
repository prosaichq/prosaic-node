import type { Prosaic } from '../src/index.js';

/** Preview a conversion before any template or journal writes. */
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
