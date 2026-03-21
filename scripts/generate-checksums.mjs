#!/usr/bin/env node
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const ROOT_DIR = process.cwd();
const OUTPUT_PATH = path.join(ROOT_DIR, "checksums.txt");
const CURRENT_VERSION = "1.1.0";
const TARGETS = [
  "manifest.json",
  "LICENSE",
  "README.md",
  "index.js",
  `schemas/v${CURRENT_VERSION}`,
  `examples/v${CURRENT_VERSION}`
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
    else if (entry.isFile()) files.push(fullPath);
  }
  return files;
}

function isCoveredReleaseArtifact(relPath) {
  return [
    "manifest.json",
    "LICENSE",
    "README.md",
    "index.js"
  ].includes(relPath)
    || relPath.startsWith(`schemas/v${CURRENT_VERSION}/`)
    || relPath.startsWith(`examples/v${CURRENT_VERSION}/`);
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
  if (rows.length === 0) throw new Error("no checksum targets collected");
  for (const { rel } of rows) {
    if (!isCoveredReleaseArtifact(rel)) throw new Error(`unexpected checksum target: ${rel}`);
  }
  await fs.writeFile(OUTPUT_PATH, rows.map(({ hash, rel }) => `${hash}  ${rel}`).join("\n") + "\n");
  console.log(`✅ Wrote ${rows.length} canonical package-payload checksums to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error("❌ Failed to generate checksums.");
  console.error(error);
  process.exit(1);
});
