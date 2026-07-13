/**
 * Push data/boh-app-state.json → Supabase boh_app_state (store id: default)
 *
 * Usage:
 *   set SUPABASE_URL=https://oikrcoccaepgtvdswuuo.supabase.co
 *   set SUPABASE_ANON_KEY=eyJhbGciOi...
 *   node scripts/push-cloud.mjs
 *
 * Or pass args:
 *   node scripts/push-cloud.mjs --url https://....supabase.co --key eyJ...
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const statePath = path.join(root, 'data', 'boh-app-state.json');

function arg(name, envName) {
  const i = process.argv.indexOf(name);
  if (i >= 0 && process.argv[i + 1]) return process.argv[i + 1];
  return process.env[envName] || '';
}

const url = (arg('--url', 'SUPABASE_URL') || 'https://oikrcoccaepgtvdswuuo.supabase.co').replace(/\/$/, '');
const key = arg('--key', 'SUPABASE_ANON_KEY') || arg('--key', 'SUPABASE_KEY');
const storeId = arg('--store', 'SUPABASE_STORE_ID') || 'default';

if (!key) {
  console.error('Missing anon key. Set SUPABASE_ANON_KEY or pass --key');
  process.exit(1);
}
if (!fs.existsSync(statePath)) {
  console.error('Missing', statePath);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(statePath, 'utf8'));
const payload = {
  id: storeId,
  label: 'Vestavia BOH',
  data,
  updated_at: new Date().toISOString()
};

const endpoint = `${url}/rest/v1/boh_app_state?on_conflict=id`;
console.log('Pushing to', endpoint);
console.log(
  'State: version=%s staff=%s scheduleKeys=%s setups=%s week=%s',
  data.version,
  (data.staff || []).length,
  Object.keys(data.schedule || {}).length,
  Object.keys(data.shiftSetups || {}).length,
  data.weekStart
);

const res = await fetch(endpoint, {
  method: 'POST',
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    Prefer: 'resolution=merge-duplicates,return=minimal'
  },
  body: JSON.stringify(payload)
});

if (!res.ok) {
  const text = await res.text();
  console.error('Push failed', res.status, text);
  process.exit(1);
}

console.log('OK — cloud store updated:', storeId, 'at', payload.updated_at);
