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

describe('workspace chart input discovery', () => {
  it('uses the workspace capability endpoint before an entity exists', async () => {
    const fetcher = vi.fn<typeof fetch>(async (input, init) => {
      expect(new URL(String(input)).pathname).toBe('/api/public/v1/report-categories');
      expect(init?.method).toBe('GET');
      expect(new Headers(init?.headers).get('authorization')).toBe('Bearer oauth-token');
      expect(new Headers(init?.headers).get('x-workspace-id')).toBe('selected-workspace');
      return Response.json({
        data: {
          workspaceId: 'selected-workspace',
          country: 'AU',
          reportingInputsEnabled: true,
          groups: [],
          categories: [],
        },
      });
    });
    const client = new Prosaic({
      accessToken: 'oauth-token',
      workspaceId: 'selected-workspace',
      fetch: fetcher,
    });
    const result = await client.reportCategories.listForWorkspace();
    expect(result.data.reportingInputsEnabled).toBe(true);
    expect(result.data.workspaceId).toBe('selected-workspace');
  });

  it('keeps explicit null and expected pair on a reporting edit and never retries a contract conflict', async () => {
    const fetcher = vi.fn<typeof fetch>(async (_input, init) => {
      expect(JSON.parse(String(init?.body))).toEqual({
        reporting: {
          groupKey: 'exp.operating',
          categoryKey: null,
          expected: { groupKey: 'exp.operating', categoryKey: 'travel' },
        },
      });
      return Response.json(
        { error: 'Rediscover capability', code: 'CHART_INPUT_CONTRACT_MISMATCH' },
        { status: 409 },
      );
    });
    const client = new Prosaic('test-key', { fetch: fetcher });
    await expect(
      client.entityAccounts.update('entity', 'account', {
        reporting: {
          groupKey: 'exp.operating',
          categoryKey: null,
          expected: { groupKey: 'exp.operating', categoryKey: 'travel' },
        },
      }),
    ).rejects.toMatchObject({ status: 409, code: 'CHART_INPUT_CONTRACT_MISMATCH' });
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});
