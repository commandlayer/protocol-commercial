#!/usr/bin/env node
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { CHECKSUM_COVERED_SURFACE } from "./release-boundary.mjs";

const ROOT_DIR = process.cwd();
const OUTPUT_PATH = path.join(ROOT_DIR, "checksums.txt");
const TARGETS = CHECKSUM_COVERED_SURFACE.map((entry) => entry.replace(/\/$/, ""));

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
  return CHECKSUM_COVERED_SURFACE.some((entry) =>
    entry.endsWith("/") ? relPath.startsWith(entry) : relPath === entry
  );
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
  console.log(`✅ Wrote ${rows.length} checksums for the canonical v1.1.0 checksum-covered surface to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error("❌ Failed to generate checksums.");
  console.error(error);
  process.exit(1);
});
