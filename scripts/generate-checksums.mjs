#!/usr/bin/env node
/**
 * generate-checksums.mjs
 *
 * Walks a schemas root, computes SHA-256 for every *.schema.json file,
 * and writes a deterministic checksums.txt file.
 *
 * Usage:
 *   node scripts/generate-checksums.mjs schemas/v1.0.0 checksums.txt
 */

import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const [,, rootArg, outFile] = process.argv;

if (!rootArg || !outFile) {
  console.error("Usage: node scripts/generate-checksums.mjs <schemas-root> <output-file>");
  process.exit(1);
}

const ROOT_DIR = process.cwd();
const SCHEMAS_ROOT = path.resolve(ROOT_DIR, rootArg);
const OUTPUT_PATH = path.resolve(ROOT_DIR, outFile);

async function collectSchemaFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await collectSchemaFiles(fullPath);
      files.push(...nested);
    } else if (entry.isFile() && entry.name.endsWith(".schema.json")) {
      files.push(fullPath);
    }
  }

  return files;
}

async function hashFile(filePath) {
  const buf = await fs.readFile(filePath);
  const hash = crypto.createHash("sha256").update(buf).digest("hex");
  const rel = path.relative(ROOT_DIR, filePath).replace(/\\/g, "/");
  return { rel, hash };
}

async function main() {
  console.log("🔎 Generating checksums from:", SCHEMAS_ROOT);

  let files;
  try {
    files = await collectSchemaFiles(SCHEMAS_ROOT);
  } catch (err) {
    console.error("❌ Failed to read schemas directory:", SCHEMAS_ROOT);
    console.error(err);
    process.exit(1);
  }

  if (files.length === 0) {
    console.warn("⚠️ No *.schema.json files found. Nothing to checksum.");
    process.exit(0);
  }

  const results = [];
  for (const file of files) {
    const { rel, hash } = await hashFile(file);
    results.push({ rel, hash });
  }

  results.sort((a, b) => a.rel.localeCompare(b.rel));

  const lines = results.map(({ rel, hash }) => `${hash}  ${rel}`);
  const body = lines.join("\n") + "\n";

  await fs.writeFile(OUTPUT_PATH, body, "utf8");
  console.log(`✅ Wrote ${results.length} checksums to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("❌ Unexpected error in generate-checksums.mjs:");
  console.error(err);
  process.exit(1);
});
