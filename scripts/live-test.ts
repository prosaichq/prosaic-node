import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import Prosaic, {
  AuthenticationError,
  OAuth,
  type Authorization,
  type OAuthTokens,
} from '../src/index.js';

const fixture = JSON.parse(readFileSync(process.argv[2] ?? '.e2e-state.json', 'utf8')) as {
  baseUrl: string;
  apiKey: string;
  userId: string;
  workspaceId: string;
  entityId: string;
  taxRateId: string;
  sessionCookie: string;
};
if (fixture.baseUrl !== 'http://localhost:3024')
  throw new Error('Live tests are restricted to the isolated SDK server at localhost:3024');
const client = new Prosaic(fixture.apiKey, {
  baseUrl: fixture.baseUrl,
  workspaceId: fixture.workspaceId,
  timeout: 120_000,
});
assert.equal((await client.me.retrieve()).data.id, fixture.userId);
assert.ok((await client.entities.list()).data.some((entity) => entity.id === fixture.entityId));
await assert.rejects(
  new Prosaic('invalid', { baseUrl: fixture.baseUrl }).me.retrieve().then(),
  AuthenticationError,
);
console.log('API-key authentication, workspace selection, and invalid-key rejection passed');

const narration = `SDK verification ${randomUUID()}`;
const journal = await client.journals.create(fixture.entityId, {
  narration,
  date: '2026-04-01',
  taxMode: 'NO_TAX',
  autoPost: true,
  lines: [
    { entityAccountCode: '1000', debit: '1.01', credit: '0', taxRateId: fixture.taxRateId },
    { entityAccountCode: '4000', credit: '1.01', debit: '0', taxRateId: fixture.taxRateId },
  ],
});
assert.equal(journal.narration, narration);
assert.equal(journal.status, 'posted');
const journals = await client.journals
  .list(fixture.entityId, { pageSize: 1 })
  .autoPagingToArray({ limit: 100 });
assert.ok(journals.some((item) => item.id === journal.id));
const lines = await client.ledger
  .list(fixture.entityId, { pageSize: 1 })
  .autoPagingToArray({ limit: 100 });
assert.ok(lines.length >= 2);
assert.ok(lines.some((line) => line.debit === '1.01' || line.credit === '1.01'));
console.log('Posted journal create/read and multi-page ledger iteration passed');

const uploaded = await client.files.upload(
  fixture.entityId,
  new File(['SDK local upload\n'], 'sdk-test.txt', { type: 'text/plain' }),
);
assert.equal(uploaded.success, true);
assert.ok(uploaded.file.filename.endsWith('-sdk-test.txt'));
assert.ok(journal.logicalJournalId);
const attached = await client.journals.attachFiles(fixture.entityId, journal.logicalJournalId, {
  fileIds: [uploaded.file.id],
});
assert.equal(attached.success, true);
assert.ok(attached.attachments.some((attachment) => attachment.fileId === uploaded.file.id));
console.log(
  'Real multipart upload through the files service to local object storage, and journal attachment, passed',
);

for (const authMethod of ['none', 'client_secret_basic', 'client_secret_post'] as const) {
  const registration: Response = await fetch(`${fixture.baseUrl}/api/auth/oauth2/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      client_name: 'SDK local verification',
      redirect_uris: ['http://127.0.0.1:8910/callback'],
      grant_types: ['authorization_code', 'refresh_token'],
      token_endpoint_auth_method: authMethod,
      scope: 'openid profile email offline_access',
    }),
  });
  assert.equal(registration.status, 201, 'Local OAuth client registration failed');
  const registered = (await registration.json()) as { client_id: string; client_secret?: string };
  if (authMethod !== 'none')
    assert.ok(registered.client_secret, 'Confidential registration omitted the client secret');
  const oauth: OAuth = new OAuth({
    clientId: registered.client_id,
    clientSecret: registered.client_secret,
    tokenEndpointAuthMethod: authMethod,
    baseUrl: fixture.baseUrl,
    timeout: 120_000,
  });
  const authorization: Authorization = oauth.createAuthorization({
    redirectUri: 'http://127.0.0.1:8910/callback',
  });
  const authorized: Response = await fetch(authorization.url, {
    headers: { cookie: fixture.sessionCookie },
    redirect: 'manual',
  });
  let callback: string | null = authorized.headers.get('location');
  if (authorized.status === 200) {
    const payload = (await authorized.json()) as { url?: string };
    callback = payload.url ?? null;
  }
  assert.ok(callback, `Authorization did not redirect (${authorized.status})`);
  if (new URL(callback, fixture.baseUrl).pathname === '/oauth/consent') {
    const consentCode = new URL(callback, fixture.baseUrl).searchParams.get('consent_code');
    const consent: Response = await fetch(`${fixture.baseUrl}/api/auth/oauth2/consent`, {
      method: 'POST',
      headers: {
        cookie: fixture.sessionCookie,
        origin: fixture.baseUrl,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        accept: true,
        ...(consentCode
          ? { consentCode }
          : { oauth_query: new URL(callback, fixture.baseUrl).search.slice(1) }),
      }),
      redirect: 'manual',
    });
    assert.equal(consent.status, 200);
    callback = ((await consent.json()) as { url: string }).url;
  }
  const tokens: OAuthTokens = await oauth.completeAuthorization(callback, authorization);
  const oauthClient: Prosaic = new Prosaic({
    accessToken: tokens.access_token,
    baseUrl: fixture.baseUrl,
  });
  assert.equal((await oauthClient.me.retrieve()).data.id, fixture.userId);
  assert.ok(tokens.refresh_token, 'offline_access did not return a refresh token');
  const rotated: OAuthTokens = await oauth.refreshToken(tokens.refresh_token);
  assert.ok(rotated.refresh_token && rotated.refresh_token !== tokens.refresh_token);
  assert.equal(
    (
      await new Prosaic({
        accessToken: rotated.access_token,
        baseUrl: fixture.baseUrl,
      }).me.retrieve()
    ).data.id,
    fixture.userId,
  );
  await oauth.revokeToken(rotated.refresh_token, 'refresh_token');
  await assert.rejects(oauth.refreshToken(rotated.refresh_token));
  console.log(
    `Real OAuth ${authMethod} PKCE, code exchange, API access, refresh rotation and revocation passed`,
  );
}
