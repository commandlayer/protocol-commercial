#!/usr/bin/env node
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const ROOT_DIR = process.cwd();
const OUTPUT_PATH = path.join(ROOT_DIR, "checksums.txt");
const TARGETS = [
  "manifest.json",
  "schemas/v1.1.0/index.json",
  "schemas/v1.1.0",
  "examples/v1.1.0"
];

async function walk(targetPath) {
  const absolute = path.join(ROOT_DIR, targetPath);
  const stat = await fs.stat(absolute);
  if (stat.isFile()) return [absolute];
  const entries = await fs.readdir(absolute, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(absolute, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path.relative(ROOT_DIR, fullPath))));
    else if (entry.isFile() && entry.name.endsWith(".json")) files.push(fullPath);
  }
  return files;
}

async function hashFile(filePath) {
  const buf = await fs.readFile(filePath);
  return {
    rel: path.relative(ROOT_DIR, filePath).replace(/\\/g, "/"),
    hash: crypto.createHash("sha256").update(buf).digest("hex")
  };
}

async function main() {
  const collected = new Set();
  for (const target of TARGETS) {
    for (const file of await walk(target)) collected.add(file);
  }
  const rows = [];
  for (const file of [...collected].sort()) rows.push(await hashFile(file));
  await fs.writeFile(OUTPUT_PATH, rows.map(({ hash, rel }) => `${hash}  ${rel}`).join("\n") + "\n");
  console.log(`✅ Wrote ${rows.length} release checksums to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error("❌ Failed to generate checksums.");
  console.error(error);
  process.exit(1);
});
