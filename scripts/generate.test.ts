import { describe, expect, it } from 'vitest';
import { generateResources } from './generate-resources.js';
import ts from 'typescript';
import { runInNewContext } from 'node:vm';
import * as transport from '../src/transport.js';
import * as pagination from '../src/pagination.js';

describe('resource generation', () => {
  it('generates callable methods that encode paths, transmit bodies and fetch subsequent pages', async () => {
    const output = generateResources({
      paths: {
        '/api/public/v1/entities/{entityId}/transactions': {
          get: {
            operationId: 'transactions.list',
            parameters: [
              { in: 'path', name: 'entityId', required: true },
              { in: 'query', name: 'page', schema: { type: 'number' } },
            ],
            responses: {
              '200': {
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        data: { type: 'array', items: {} },
                        pagination: { type: 'object' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '/api/public/v1/entities': {
          post: {
            operationId: 'entities.create',
            requestBody: {
              required: true,
              content: { 'application/json': { schema: { type: 'object', required: ['name'] } } },
            },
            responses: {
              '201': { content: { 'application/json': { schema: { type: 'object' } } } },
            },
          },
        },
      },
    });
    const exported: Record<string, unknown> = {};
    runInNewContext(
      ts.transpileModule(output, {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
      }).outputText,
      {
        exports: exported,
        require: (name: string) => (name === './transport.js' ? transport : pagination),
      },
    );
    const Resources = exported.Resources as new (http: transport.Transport) => {
      transactions: {
        list(id: string): pagination.APIListPromise<{
          data: number[];
          pagination: { currentPage: number; hasNextPage: boolean };
        }>;
      };
      entities: { create(params: { name: string }): PromiseLike<{ id: string }> };
    };
    const client = new Resources(
      new transport.Transport({
        apiKey: 'test',
        fetch: async (input, init) => {
          const url = new URL(String(input));
          if (init?.method === 'POST') {
            expect(JSON.parse(String(init.body))).toEqual({ name: 'Example' });
            return Response.json({ id: 'created' }, { status: 201 });
          }
          expect(url.pathname).toBe('/api/public/v1/entities/e%2F1/transactions');
          const page = Number(url.searchParams.get('page') ?? 1);
          return Response.json({
            data: [page],
            pagination: { currentPage: page, hasNextPage: page < 2 },
          });
        },
      }),
    );
    expect(await client.transactions.list('e/1').autoPagingToArray({ limit: 10 })).toEqual([1, 2]);
    expect(await client.entities.create({ name: 'Example' })).toEqual({ id: 'created' });
  });

  it('fails closed on an undocumented or duplicate operation name', () => {
    expect(() =>
      generateResources({ paths: { '/api/public/v1/new': { get: { responses: {} } } } }),
    ).toThrow(/operationId/);
    expect(() =>
      generateResources({
        paths: {
          '/one': { get: { operationId: 'things.list' } },
          '/two': { get: { operationId: 'things.list' } },
        },
      }),
    ).toThrow(/duplicate/i);
  });
});
