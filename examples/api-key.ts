import Prosaic from '../src/index.js';

const apiKey = process.env.PROSAIC_API_KEY;
if (!apiKey) throw new Error('Set PROSAIC_API_KEY');
const client = new Prosaic(apiKey, { baseUrl: process.env.PROSAIC_BASE_URL });
const { data: me } = await client.me.retrieve();
console.log(me.name);
for await (const entity of client.entities.list()) console.log(entity.id, entity.name);
