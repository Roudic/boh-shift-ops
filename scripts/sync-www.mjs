#!/usr/bin/env node
/**
 * Copy web assets into www/ for Capacitor iOS builds.
 * GitHub Pages still serves from repo root (index.html).
 */
import { cpSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const www = join(root, 'www');

mkdirSync(www, { recursive: true });

const copies = [
  ['index.html', 'index.html'],
  ['guide', 'guide'],
  ['data', 'data'],
  ['supabase-schema.sql', 'supabase-schema.sql'],
];

for (const [src, dest] of copies) {
  const from = join(root, src);
  const to = join(www, dest);
  if (!existsSync(from)) {
    console.warn(`skip missing: ${src}`);
    continue;
  }
  cpSync(from, to, { recursive: true, force: true });
  console.log(`synced ${src} → www/${dest}`);
}

console.log('www/ ready for Capacitor');
