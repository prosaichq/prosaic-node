import { describe, expect, it, vi } from 'vitest';
import Prosaic from './index.js';

describe('invoice lifecycle', () => {
  it('creates an explicit draft on its own endpoint and preserves its review fields', async () => {
    const body = { taxMode: 'TAX_INCLUSIVE' as const, issueDate: '2026-11-25' };
    const payload = {
      data: { id: 'invoice/id', status: 'DRAFT', contactId: null, recipientEmails: [] },
    };
    const fetcher = vi.fn<typeof fetch>(async (input, init) => {
      expect(new URL(String(input)).pathname).toBe(
        '/api/public/v1/entities/entity%2Fid/invoices/drafts',
      );
      expect(init?.method).toBe('POST');
      expect(new Headers(init?.headers).get('authorization')).toBe('Bearer test-key');
      expect(JSON.parse(String(init?.body))).toEqual(body);
      return Response.json(payload);
    });
    const client = new Prosaic('test-key', { fetch: fetcher });
    expect(await client.invoices.createDraft('entity/id', body)).toEqual(payload);
    expect(fetcher).toHaveBeenCalledOnce();
  });

  it('patches invoice content with explicit nulls and a replacement line array', async () => {
    const body = { notes: null, dueDate: null, lines: [] };
    const fetcher = vi.fn<typeof fetch>(async (input, init) => {
      expect(new URL(String(input)).pathname).toBe(
        '/api/public/v1/entities/entity%2Fid/invoices/invoice%2Fid',
      );
      expect(init?.method).toBe('PATCH');
      expect(JSON.parse(String(init?.body))).toEqual(body);
      return Response.json({ data: { id: 'invoice/id', status: 'DRAFT', ...body } });
    });
    const result = await new Prosaic('test-key', { fetch: fetcher }).invoices.update(
      'entity/id',
      'invoice/id',
      body,
    );
    expect(result.data).toMatchObject(body);
    expect(fetcher).toHaveBeenCalledOnce();
  });

  it('deletes a draft with DELETE and no body', async () => {
    const fetcher = vi.fn<typeof fetch>(async (input, init) => {
      expect(new URL(String(input)).pathname).toBe(
        '/api/public/v1/entities/entity-1/invoices/invoice-1',
      );
      expect(init?.method).toBe('DELETE');
      expect(init?.body).toBeUndefined();
      return Response.json({ success: true });
    });
    expect(
      await new Prosaic('test-key', { fetch: fetcher }).invoices.del('entity-1', 'invoice-1'),
    ).toEqual({ success: true });
  });

  it('preserves a refused finalisation without retrying or changing the action', async () => {
    const fetcher = vi.fn<typeof fetch>(async (_input, init) => {
      expect(JSON.parse(String(init?.body))).toEqual({
        status: 'FINALISED',
        invoiceNumber: 'INV-020',
      });
      return Response.json(
        {
          error: 'Review the new number',
          code: 'INVOICE_NUMBER_CHANGED',
          invoiceNumber: 'INV-021',
          details: { invoiceNumber: 'INV-021' },
        },
        { status: 409 },
      );
    });
    const client = new Prosaic('test-key', { fetch: fetcher });
    await expect(
      client.invoices.update('entity-1', 'invoice-1', {
        status: 'FINALISED',
        invoiceNumber: 'INV-020',
      }),
    ).rejects.toMatchObject({ status: 409, code: 'INVOICE_NUMBER_CHANGED' });
    expect(fetcher).toHaveBeenCalledOnce();
  });
});
