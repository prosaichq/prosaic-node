import type Prosaic from '../src/index.js';
import type {
  InvoicesCreateDraftParams,
  InvoicesUpdateParams,
  InvoicesUpdateResponse,
} from '../src/index.js';

/** Save an incomplete draft for review; this never finalises or emails it. */
export async function prepareInvoice(
  client: Prosaic,
  entityId: string,
  fields: InvoicesCreateDraftParams,
): Promise<string> {
  const { data: draft } = await client.invoices.createDraft(entityId, fields);
  return draft.id;
}

/** Finalise only after the caller has reviewed the saved draft and its intended number. */
export async function finaliseReviewedInvoice(
  client: Prosaic,
  entityId: string,
  invoiceId: string,
  confirmedInvoiceNumber?: string,
): Promise<InvoicesUpdateResponse> {
  return client.invoices.update(entityId, invoiceId, {
    status: 'FINALISED',
    ...(confirmedInvoiceNumber === undefined ? {} : { invoiceNumber: confirmedInvoiceNumber }),
  });
}

const draft: InvoicesCreateDraftParams = { taxMode: 'TAX_INCLUSIVE', issueDate: '2026-11-25' };
const edit: InvoicesUpdateParams = { contactId: null, recipientEmails: [], notes: null, lines: [] };
const revert: InvoicesUpdateParams = { status: 'DRAFT' };
// Unmatching payments is never implied: request it explicitly only after reviewing the effect.
const voidAndUnmatch: InvoicesUpdateParams = { status: 'VOIDED', unmatchPayments: true };
// @ts-expect-error Draft creation requires an issue date.
const missingDate: InvoicesCreateDraftParams = { taxMode: 'NO_TAX' };
// @ts-expect-error A posted invoice is settled by payments, not a status-only shortcut.
const invalidStatus: InvoicesUpdateParams = { status: 'PAID' };
void [draft, edit, revert, voidAndUnmatch, missingDate, invalidStatus];
