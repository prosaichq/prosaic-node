import { InvalidResponseError } from './errors.js';
import type { APIResponse } from './transport.js';

/** A normal awaitable result with optional access to HTTP metadata. */
export class APIPromise<T> implements Promise<T> {
  readonly [Symbol.toStringTag] = 'Promise';
  readonly #raw: Promise<APIResponse<T>>;

  constructor(raw: Promise<APIResponse<T>>) {
    this.#raw = raw;
  }

  // oxlint-disable-next-line unicorn/no-thenable -- This class deliberately implements Promise for awaitable API results.
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2> {
    return this.#raw.then(({ data }) => data).then(onfulfilled, onrejected);
  }

  catch<TResult = never>(
    onrejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null,
  ): Promise<T | TResult> {
    return this.then(undefined, onrejected);
  }

  finally(onfinally?: (() => void) | null): Promise<T> {
    return this.then().finally(onfinally);
  }

  /** Return the unchanged payload, request ID and HTTP response from the same request. */
  withResponse(): Promise<APIResponse<T>> {
    return this.#raw;
  }

  /** Return the original HTTP response, whose body remains readable. */
  async asResponse(): Promise<Response> {
    return (await this.#raw).response;
  }
}

export interface ListPage {
  data: readonly unknown[];
  pagination?: { currentPage: number; hasNextPage: boolean };
}
type ListItem<T extends ListPage> = T['data'][number];

/** Await one page or iterate all items using Prosaic's page-number pagination. */
export class APIListPromise<T extends ListPage>
  extends APIPromise<T>
  implements AsyncIterable<ListItem<T>>
{
  readonly #fetchPage?: (page: number) => Promise<APIResponse<T>>;

  constructor(
    first: Promise<APIResponse<T>>,
    fetchPage?: (page: number) => Promise<APIResponse<T>>,
  ) {
    super(first);
    this.#fetchPage = fetchPage;
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<ListItem<T>, void, unknown> {
    let page: T = (await this.withResponse()).data;
    for (;;) {
      if (!Array.isArray(page.data))
        throw new InvalidResponseError('List response is missing its data array');
      for (const item of page.data) yield item as ListItem<T>;
      if (!page.pagination?.hasNextPage) return;
      if (!page.data.length)
        throw new InvalidResponseError('An empty page claimed to have more results');
      if (!this.#fetchPage)
        throw new InvalidResponseError('No pagination contract exists for this list');
      const current = page.pagination.currentPage;
      if (!Number.isSafeInteger(current) || current < 1)
        throw new InvalidResponseError('Invalid current page');
      page = (await this.#fetchPage(current + 1)).data;
      if (page.pagination && page.pagination.currentPage !== current + 1)
        throw new InvalidResponseError('Pagination did not advance to the requested page');
    }
  }

  /** Visit each item; return false from the callback to stop fetching more pages. */
  async autoPagingEach(
    callback: (item: ListItem<T>) => boolean | void | Promise<boolean | void>,
  ): Promise<void> {
    for await (const item of this) if ((await callback(item)) === false) return;
  }

  /** Collect at most limit items, bounding memory and subsequent page requests. */
  async autoPagingToArray({ limit }: { limit: number }): Promise<Array<ListItem<T>>> {
    if (!Number.isSafeInteger(limit) || limit <= 0)
      throw new TypeError('limit must be a positive safe integer');
    const items: Array<ListItem<T>> = [];
    for await (const item of this) {
      items.push(item);
      if (items.length >= limit) break;
    }
    return items;
  }
}
