#!/usr/bin/env node
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const ROOT_DIR = process.cwd();
const CURRENT_VERSION = "1.1.0";
const CHECKSUMS_PATH = path.join(ROOT_DIR, "checksums.txt");
const TARGETS = [
  "manifest.json",
  "LICENSE",
  "README.md",
  "index.js",
  `schemas/v${CURRENT_VERSION}`,
  `examples/v${CURRENT_VERSION}`
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function walk(targetPath) {
  const absolute = path.join(ROOT_DIR, targetPath);
  const stat = await fs.stat(absolute);
  if (stat.isFile()) return [absolute];
  const entries = await fs.readdir(absolute, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(absolute, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path.relative(ROOT_DIR, fullPath)));
    else if (entry.isFile()) files.push(fullPath);
  }
  return files;
}

async function sha256(filePath) {
  const buf = await fs.readFile(filePath);
  return crypto.createHash("sha256").update(buf).digest("hex");
}

async function expectedEntries() {
  const files = new Set();
  for (const target of TARGETS) {
    for (const file of await walk(target)) {
      files.add(path.relative(ROOT_DIR, file).replace(/\\/g, "/"));
    }
  }
  return [...files].sort();
}

async function main() {
  const checksumText = await fs.readFile(CHECKSUMS_PATH, "utf8");
  const rows = checksumText.trim().split(/\n+/).filter(Boolean).map((line) => {
    const match = line.match(/^([a-f0-9]{64})\s{2}(.+)$/);
    assert(match, `invalid checksum row: ${line}`);
    return { hash: match[1], rel: match[2] };
  });

  const actualMap = new Map(rows.map((row) => [row.rel, row.hash]));
  assert(actualMap.size === rows.length, "checksums.txt contains duplicate paths");

  const expected = await expectedEntries();
  assert(JSON.stringify([...actualMap.keys()].sort()) === JSON.stringify(expected), "checksums.txt scope drift");

  for (const rel of expected) {
    const computed = await sha256(path.join(ROOT_DIR, rel));
    assert(actualMap.get(rel) === computed, `checksum mismatch for ${rel}`);
  }

  console.log("✅ Canonical package payload checksum scope and hashes validated.");
}

main().catch((error) => {
  console.error("❌ Integrity validation failed.");
  console.error(error);
  process.exit(1);
});
