interface Schema {
  type?: string;
  properties?: Record<string, Schema>;
  required?: string[];
  anyOf?: Schema[];
  items?: Schema;
}
interface Operation {
  operationId?: string;
  summary?: string;
  description?: string;
  parameters?: Array<{ in: string; name: string; required?: boolean; schema?: Schema }>;
  requestBody?: { required?: boolean; content: Record<string, { schema?: Schema }> };
  responses?: Record<string, { content?: Record<string, { schema?: Schema }> }>;
}
export interface SDKSpec {
  paths: Record<string, Record<string, Operation>>;
}

function pascal(value: string): string {
  return value[0]!.toUpperCase() + value.slice(1);
}
function variants(schema?: Schema): Schema[] {
  return schema?.anyOf?.flatMap(variants) ?? (schema ? [schema] : []);
}

/** Generate explicit, reviewable resource methods; unknown and duplicate operations fail closed. */
export function generateResources(spec: SDKSpec): string {
  const seen = new Set<string>();
  const groups = new Map<string, string[]>();
  const types: string[] = [];
  for (const [path, methods] of Object.entries(spec.paths).sort()) {
    for (const [verb, operation] of Object.entries(methods).sort()) {
      if (!['get', 'post', 'put', 'patch', 'delete', 'head'].includes(verb)) continue;
      const id = operation.operationId;
      if (!id || !/^[a-z][a-zA-Z0-9]*\.[a-z][a-zA-Z0-9]*$/.test(id))
        throw new Error(`Missing or invalid operationId: ${verb} ${path}`);
      if (seen.has(id)) throw new Error(`Duplicate operationId: ${id}`);
      seen.add(id);
    }
  }
  for (const [path, methods] of Object.entries(spec.paths).sort()) {
    for (const [verb, operation] of Object.entries(methods).sort()) {
      if (!['get', 'post', 'put', 'patch', 'delete', 'head'].includes(verb)) continue;
      const id = operation.operationId!;
      const [resource, method] = id.split('.') as [string, string];
      const name = pascal(resource) + pascal(method);
      const status = Object.keys(operation.responses ?? {}).filter((code) => /^2\d\d$/.test(code));
      if (!status.length) throw new Error(`Missing success response: ${id}`);
      types.push(
        `export type ${name}Response = ${status.map((code) => `operations[${JSON.stringify(id)}]['responses'][${code}]['content']['application/json']`).join(' | ')};`,
      );
      const pathNames = [...path.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]!);
      const args = pathNames.map((param) => `${param}: string`);
      const query = operation.parameters?.filter((param) => param.in === 'query') ?? [];
      const multipart = Boolean(operation.requestBody?.content['multipart/form-data']);
      const body = Boolean(operation.requestBody);
      if (multipart) {
        args.push('file: Blob', 'options: RequestOptions & { filename?: string } = {}');
      } else {
        if (query.length) {
          types.push(
            `export type ${name}Params = NonNullable<operations[${JSON.stringify(id)}]['parameters']['query']>;`,
          );
          args.push(`params: ${name}Params${query.some((param) => param.required) ? '' : ' = {}'}`);
        } else if (body) {
          types.push(
            `export type ${name}Params = operations[${JSON.stringify(id)}]['requestBody']['content']['application/json'];`,
          );
          const required = variants(
            operation.requestBody?.content['application/json']?.schema,
          ).some((schema) => schema.required?.length);
          args.push(`params: ${name}Params${required ? '' : ' = {}'}`);
        }
        args.push('options: RequestOptions = {}');
      }
      const responseSchemas = status.flatMap((code) =>
        variants(operation.responses?.[code]?.content?.['application/json']?.schema),
      );
      const list =
        verb === 'get' &&
        responseSchemas.length > 0 &&
        responseSchemas.every((schema) => schema.properties?.data?.type === 'array');
      const pagination = list && query.some((param) => param.name === 'page');
      const url =
        '`' +
        path.replace(/\{([^}]+)\}/g, (_match, param: string) => '${pathParam(' + param + ')}') +
        '`';
      const payload = multipart
        ? '{ body: form }'
        : query.length
          ? '{ query: params }'
          : body
            ? '{ body: params }'
            : '{}';
      const request = `this.transport.request<${name}Response>(${JSON.stringify(verb.toUpperCase())}, ${url}, ${payload}, options)`;
      const prelude = multipart
        ? `const form = new FormData(); form.append('file', file, options.filename ?? (file instanceof File ? file.name : 'upload'));\n`
        : '';
      const paginator = pagination
        ? `, (page) => this.transport.request<${name}Response>(${JSON.stringify(verb.toUpperCase())}, ${url}, { query: { ...params, page } }, options)`
        : '';
      const doc =
        `${operation.summary ?? id}${operation.description ? `\n${operation.description}` : ''}`
          .replace(/\*\//g, '* /')
          .split('\n')
          .map((line) => `   * ${line}`.trimEnd())
          .join('\n');
      const implementation = `  /**\n${doc}\n   */\n  ${method}(${args.join(', ')}): ${list ? 'APIListPromise' : 'APIPromise'}<${name}Response> {\n    ${prelude}return new ${list ? 'APIListPromise' : 'APIPromise'}(${request}${paginator});\n  }`;
      groups.set(resource, [...(groups.get(resource) ?? []), implementation]);
    }
  }
  return `// Generated from openapi/prosaic.json. Run yarn generate; do not edit.\nimport type { operations } from './types.js';\nimport { Transport, pathParam, type RequestOptions } from './transport.js';\nimport { APIPromise, APIListPromise } from './pagination.js';\n\n${types.join('\n')}\n\n${[...groups].map(([resource, methods]) => `export class ${pascal(resource)}Resource {\n  constructor(private readonly transport: Transport) {}\n${methods.join('\n\n')}\n}`).join('\n\n')}\n\nexport class Resources {\n${[...groups.keys()].map((resource) => `  readonly ${resource}: ${pascal(resource)}Resource;`).join('\n')}\n  constructor(transport: Transport) {\n${[...groups.keys()].map((resource) => `    this.${resource} = new ${pascal(resource)}Resource(transport);`).join('\n')}\n  }\n}\n`;
}
