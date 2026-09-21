import { describe, expect, it, vi } from 'vitest';
import { APIListPromise, APIPromise } from './pagination.js';

describe('response promises and pagination', () => {
  it('awaits the wire payload and exposes the same response metadata without a second request', async () => {
    const response = Response.json({ data: { id: 'one' } });
    const promise = new APIPromise(
      Promise.resolve({ data: { data: { id: 'one' } }, response, requestId: 'r1' }),
    );
    expect(await promise).toEqual({ data: { id: 'one' } });
    expect(await promise.withResponse()).toEqual({
      data: { data: { id: 'one' } },
      response,
      requestId: 'r1',
    });
    expect(await promise.asResponse()).toBe(response);
  });

  it('iterates paginated data from the requested page, preserving each page exactly once', async () => {
    const pages = vi.fn(async (page: number) => ({
      data: { data: [page], pagination: { currentPage: page, hasNextPage: page < 4 } },
      response: Response.json({}),
    }));
    const promise = new APIListPromise(pages(2), pages);
    expect(await promise).toMatchObject({ data: [2] });
    const results: number[] = [];
    for await (const item of promise) results.push(item);
    expect(results).toEqual([2, 3, 4]);
    expect(pages.mock.calls.map(([page]) => page)).toEqual([2, 3, 4]);
  });

  it('iterates nonpaginated lists and supports bounded collection and early stop', async () => {
    const list = new APIListPromise(
      Promise.resolve({
        data: { data: [1, 2, 3], meta: { count: 3 } },
        response: Response.json({}),
      }),
    );
    expect(await list.autoPagingToArray({ limit: 2 })).toEqual([1, 2]);
    const seen: number[] = [];
    await list.autoPagingEach((value) => {
      seen.push(value);
      return false;
    });
    expect(seen).toEqual([1]);
    await expect(list.autoPagingToArray({ limit: 0 })).rejects.toThrow(/limit/);
  });

  it('fails on a nonadvancing or empty page that claims to have a next page', async () => {
    const repeated = {
      data: { data: [1], pagination: { currentPage: 1, hasNextPage: true } },
      response: Response.json({}),
    };
    const list = new APIListPromise(Promise.resolve(repeated), async () => repeated);
    await expect(list.autoPagingToArray({ limit: 3 })).rejects.toThrow(/advance/);
    const empty = new APIListPromise(
      Promise.resolve({
        data: { data: [], pagination: { currentPage: 1, hasNextPage: true } },
        response: Response.json({}),
      }),
      async () => repeated,
    );
    await expect(empty.autoPagingToArray({ limit: 3 })).rejects.toThrow(/empty/);
  });
});
