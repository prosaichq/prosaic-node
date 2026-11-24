import type Prosaic from '../src/index.js';
import type { BillsCreateParams, BillsCreateResponse, BillsUpdateParams } from '../src/index.js';

/** Upload a supplier document and save a draft for a person to review. */
export async function captureSupplierBill(
  client: Prosaic,
  entityId: string,
  document: File,
  fields: Omit<BillsCreateParams, 'fileId'>,
): Promise<BillsCreateResponse> {
  const file = await client.files.upload(entityId, document);
  return client.bills.create(entityId, { ...fields, fileId: file.file.id });
}

/** Approve only after reviewing the supplier, document, dates and amounts. */
export async function approveReviewedBill(
  client: Prosaic,
  entityId: string,
  billId: string,
): Promise<void> {
  const { data: bill } = await client.bills.retrieve(entityId, billId);
  if (bill.status !== 'DRAFT') throw new Error('Only a draft can be approved');
  await client.bills.update(entityId, billId, { status: 'APPROVED' });
}

// Fictional input: use entity-specific supplier, account and tax code values.
const draft: BillsCreateParams = {
  issueDate: '2026-11-24',
  taxMode: 'NO_TAX',
  supplierName: 'Example supplier',
  lines: [
    {
      description: 'Supplier service',
      quantity: '1',
      unitPrice: '100.00',
      taxRate: '0',
      taxRateCode: 'NZ_GST_0_NONE',
    },
  ],
};
const approve: BillsUpdateParams = { status: 'APPROVED' };
void draft;
void approve;

// @ts-expect-error issueDate is required when creating a bill.
const missingDate: BillsCreateParams = { fileId: 'DOCUMENT_ID' };
// @ts-expect-error lifecycle status is restricted to supported transitions.
const invalidStatus: BillsUpdateParams = { status: 'PAID' };
void missingDate;
void invalidStatus;
