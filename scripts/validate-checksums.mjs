#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

const ROOT_DIR = process.cwd();
const CHECKSUM_FILE = path.join(ROOT_DIR, 'checksums.txt');

async function hashFile(filePath) {
  const buf = await fs.readFile(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const rows = (await fs.readFile(CHECKSUM_FILE, 'utf8')).trim().split('\n').filter(Boolean);
for (const row of rows) {
  const [expected, rel] = row.split(/\s\s+/);
  const fullPath = path.join(ROOT_DIR, rel);
  const actual = await hashFile(fullPath);
  if (actual !== expected) {
    throw new Error(`checksum mismatch for ${rel}: expected ${expected}, got ${actual}`);
  }
}
console.log(`✅ Verified ${rows.length} checksummed release artifacts.`);
