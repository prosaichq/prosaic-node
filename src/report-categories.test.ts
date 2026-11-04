import { describe, expect, it, vi } from 'vitest';
import Prosaic from './index.js';

describe('report category discovery', () => {
  it('requests the entity taxonomy with bearer auth and preserves the complete response', async () => {
    const payload = {
      data: {
        country: 'NZ',
        groups: [
          {
            id: 'root',
            key: 'equ',
            name: 'Equity',
            description: null,
            accountType: 'Equity',
            status: 'ACTIVE',
            parentId: null,
            sortOrder: 0,
            isHeading: true,
            isAssignable: false,
            allowGroupOnly: false,
          },
          {
            id: 'retained',
            key: 'equ.retainedearnings',
            name: 'Retained earnings',
            description: null,
            accountType: 'Equity',
            status: 'ACTIVE',
            parentId: 'root',
            sortOrder: 1,
            isHeading: false,
            isAssignable: true,
            allowGroupOnly: true,
          },
        ],
        categories: [],
      },
    };
    const fetcher = vi.fn<typeof fetch>(async (input, init) => {
      const url = new URL(String(input));
      expect(url.pathname).toBe('/api/public/v1/entities/entity%2Fid/report-categories');
      expect(url.search).toBe('');
      expect(init?.method).toBe('GET');
      expect(new Headers(init?.headers).get('authorization')).toBe('Bearer test-key');
      return Response.json(payload);
    });
    const client = new Prosaic('test-key', { fetch: fetcher });
    expect(await client.reportCategories.list('entity/id')).toEqual(payload);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});
