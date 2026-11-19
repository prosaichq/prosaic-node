import { describe, expect, it, vi } from 'vitest';
import Prosaic from './index.js';

describe('fixed asset register import', () => {
  it('posts the register and returns every row result unchanged', async () => {
    const payload = {
      data: {
        totalRows: 2,
        createdCount: 1,
        results: [
          {
            row: 1,
            name: 'Laptop',
            assetNumber: 'FA-1',
            status: 'created',
            assetId: 'asset-1',
            errors: [],
            warnings: [],
          },
          {
            row: 2,
            name: 'Ute',
            assetNumber: 'FA-2',
            status: 'exists',
            assetId: 'asset-7',
            errors: [],
            warnings: [],
          },
        ],
      },
    };
    const fetcher = vi.fn<typeof fetch>(async (input, init) => {
      const url = new URL(String(input));
      expect(url.pathname).toBe('/api/public/v1/entities/entity-1/fixed-assets/import');
      expect(init?.method).toBe('POST');
      expect(new Headers(init?.headers).get('authorization')).toBe('Bearer test-key');
      expect(JSON.parse(String(init?.body))).toEqual({
        assets: [{ name: 'Laptop', assetNumber: 'FA-1' }],
      });
      return Response.json(payload);
    });
    const client = new Prosaic('test-key', { fetch: fetcher });

    expect(
      await client.fixedAssets.import('entity-1', {
        assets: [{ name: 'Laptop', assetNumber: 'FA-1' }],
      }),
    ).toEqual(payload);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  // Row-level refusals are reported, not thrown: the call did what it was asked.
  it('reports a refused row in the body rather than as an error', async () => {
    const fetcher = vi.fn<typeof fetch>(async () =>
      Response.json({
        data: {
          totalRows: 1,
          createdCount: 0,
          results: [
            {
              row: 1,
              name: 'Land',
              assetNumber: null,
              status: 'error',
              errors: [
                {
                  field: 'depreciationRate',
                  message: 'Depreciation rate cannot be set when there is no depreciation',
                },
              ],
              warnings: [],
            },
          ],
        },
      }),
    );
    const client = new Prosaic('test-key', { fetch: fetcher });

    const result = await client.fixedAssets.import('entity-1', {
      assets: [{ name: 'Land', depreciationMethod: 'none', depreciationRate: 10 }],
    });

    expect(result.data.createdCount).toBe(0);
    expect(result.data.results[0]?.status).toBe('error');
  });

  it('decimal money crosses as the string the server sent', async () => {
    const fetcher = vi.fn<typeof fetch>(async (_input, init) => {
      // Amounts go out as the numbers the caller supplied, unrounded.
      expect(JSON.parse(String(init?.body)).assets[0]).toMatchObject({
        purchasePrice: 12345.67,
        initialAccumulatedDepreciation: 2345.67,
      });
      return Response.json({ data: { totalRows: 1, createdCount: 1, results: [] } });
    });
    const client = new Prosaic('test-key', { fetch: fetcher });

    await client.fixedAssets.import('entity-1', {
      assets: [
        {
          name: 'Ute',
          purchasePrice: 12345.67,
          initialAccumulatedDepreciation: 2345.67,
          accumulatedDepreciationAsAt: '2026-03-31',
          startDate: '2026-04-01',
        },
      ],
    });
  });
});

describe('fixed asset activation', () => {
  it('activates many assets in one call and reports both outcomes', async () => {
    const fetcher = vi.fn<typeof fetch>(async (input, init) => {
      expect(new URL(String(input)).pathname).toBe(
        '/api/public/v1/entities/entity-1/fixed-assets/activate',
      );
      expect(init?.method).toBe('POST');
      expect(JSON.parse(String(init?.body))).toEqual({
        assetIds: ['asset-1', 'asset-2'],
      });
      return Response.json({
        data: {
          activated: [{ assetId: 'asset-1', name: 'Laptop' }],
          failed: [{ assetId: 'asset-2', name: 'Ute', error: 'Asset is active, not draft' }],
        },
      });
    });
    const client = new Prosaic('test-key', { fetch: fetcher });

    const result = await client.fixedAssets.activate('entity-1', {
      assetIds: ['asset-1', 'asset-2'],
    });

    expect(result.data.activated).toHaveLength(1);
    expect(result.data.failed[0]?.error).toContain('not draft');
  });
});

describe('fixed asset deletion', () => {
  it('deletes a draft by ID', async () => {
    const fetcher = vi.fn<typeof fetch>(async (input, init) => {
      expect(new URL(String(input)).pathname).toBe(
        '/api/public/v1/entities/entity-1/fixed-assets/asset-1',
      );
      expect(init?.method).toBe('DELETE');
      return Response.json({ data: { id: 'asset-1', deleted: true } });
    });
    const client = new Prosaic('test-key', { fetch: fetcher });

    expect(await client.fixedAssets.del('entity-1', 'asset-1')).toEqual({
      data: { id: 'asset-1', deleted: true },
    });
  });

  it('surfaces a non-draft asset as a 409 and never retries it', async () => {
    const fetcher = vi.fn<typeof fetch>(async () =>
      Response.json(
        { error: 'Asset is active, not draft', code: 'ASSET_NOT_DRAFT' },
        { status: 409 },
      ),
    );
    const client = new Prosaic('test-key', { fetch: fetcher });

    await expect(client.fixedAssets.del('entity-1', 'asset-1')).rejects.toMatchObject({
      status: 409,
      code: 'ASSET_NOT_DRAFT',
    });
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});
