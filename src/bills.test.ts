import { describe, expect, it, vi } from 'vitest';
import Prosaic from './index.js';

describe('supplier bills', () => {
  it('creates an attached draft, reads it back and approves it in a separate request', async () => {
    const draft = {
      data: {
        id: 'bill-1',
        fileId: 'file-1',
        status: 'DRAFT',
        total: 115.01,
        issueDate: '2026-11-24T00:00:00.000Z',
      },
    };
    const calls: Array<{ method: string; path: string; body: unknown }> = [];
    const fetcher = vi.fn<typeof fetch>(async (input, init) => {
      expect(new Headers(init?.headers).get('authorization')).toBe('Bearer test-key');
      const method = init?.method ?? 'GET';
      calls.push({
        method,
        path: new URL(String(input)).pathname,
        body: init?.body ? JSON.parse(String(init.body)) : null,
      });
      return Response.json(
        method === 'PATCH' ? { data: { ...draft.data, status: 'APPROVED' } } : draft,
      );
    });
    const client = new Prosaic('test-key', { fetch: fetcher });
    const body = {
      issueDate: '2026-11-24',
      fileId: 'file-1',
      lines: [
        {
          description: 'Supplier service',
          quantity: '1',
          unitPrice: '115.01',
          taxRate: '0.15',
          taxRateCode: 'NZ_GST_15_INC',
          taxAmount: '15.01',
        },
      ],
    };
    expect(await client.bills.create('entity/id', body)).toEqual(draft);
    expect(await client.bills.retrieve('entity/id', 'bill-1')).toEqual(draft);
    expect(await client.bills.update('entity/id', 'bill-1', { status: 'APPROVED' })).toMatchObject({
      data: { status: 'APPROVED' },
    });
    expect(calls).toEqual([
      { method: 'POST', path: '/api/public/v1/entities/entity%2Fid/bills', body },
      { method: 'GET', path: '/api/public/v1/entities/entity%2Fid/bills/bill-1', body: null },
      {
        method: 'PATCH',
        path: '/api/public/v1/entities/entity%2Fid/bills/bill-1',
        body: { status: 'APPROVED' },
      },
    ]);
  });

  it('iterates bill pages while preserving payment strings and the caller filters', async () => {
    const fetcher = vi.fn<typeof fetch>(async (input) => {
      const url = new URL(String(input));
      expect(url.searchParams.get('displayStatuses')).toBe('OVERDUE,PART_PAID');
      expect(url.searchParams.get('dueDateTo')).toBe('2026-11-30');
      const page = Number(url.searchParams.get('page') ?? 1);
      return Response.json({
        data: [{ id: `bill-${page}`, amountPaid: '10.01', amountDue: '105.00' }],
        pagination: {
          currentPage: page,
          pageSize: 1,
          totalCount: 2,
          totalPages: 2,
          hasNextPage: page === 1,
          hasPreviousPage: page === 2,
        },
      });
    });
    const client = new Prosaic('test-key', { fetch: fetcher });
    const bills = await client.bills
      .list('entity-1', {
        pageSize: 1,
        displayStatuses: 'OVERDUE,PART_PAID',
        dueDateTo: '2026-11-30',
      })
      .autoPagingToArray({ limit: 2 });
    expect(bills).toEqual([
      { id: 'bill-1', amountPaid: '10.01', amountDue: '105.00' },
      { id: 'bill-2', amountPaid: '10.01', amountDue: '105.00' },
    ]);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it('surfaces a locked approval without retrying and deletes a draft through DELETE', async () => {
    const fetcher = vi.fn<typeof fetch>(async (input, init) => {
      expect(new URL(String(input)).pathname).toBe('/api/public/v1/entities/entity-1/bills/bill-1');
      if (init?.method === 'DELETE') {
        return Response.json({ success: true });
      }
      expect(init?.method).toBe('PATCH');
      return Response.json(
        {
          error: 'Period locked',
          code: 'ACCOUNTING_PERIOD_LOCKED',
          details: { lockDate: '2026-11-30' },
        },
        { status: 409 },
      );
    });
    const client = new Prosaic('test-key', { fetch: fetcher });
    await expect(
      client.bills.update('entity-1', 'bill-1', { status: 'APPROVED' }),
    ).rejects.toMatchObject({
      status: 409,
      code: 'ACCOUNTING_PERIOD_LOCKED',
      details: { lockDate: '2026-11-30' },
    });
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(await client.bills.del('entity-1', 'bill-1')).toEqual({ success: true });
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});
