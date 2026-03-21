#!/usr/bin/env node
import { execFile } from "child_process";
import { promisify } from "util";
import { TARBALL_ALLOWED_SURFACE } from "./release-boundary.mjs";

const execFileAsync = promisify(execFile);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  const { stdout } = await execFileAsync("npm", ["pack", "--json", "--dry-run"], { maxBuffer: 1024 * 1024 * 10 });
  const pack = JSON.parse(stdout);
  assert(Array.isArray(pack) && pack.length === 1, "npm pack --json --dry-run returned an unexpected payload");

  const packedFiles = pack[0].files.map((file) => file.path).sort();
  const expected = [...new Set(TARBALL_ALLOWED_SURFACE.flatMap((entry) => entry.endsWith("/") ? packedFiles.filter((file) => file.startsWith(entry)) : [entry]))].sort();

  assert(JSON.stringify(packedFiles) === JSON.stringify(expected), `packed tarball surface drift\nexpected: ${expected.join(", ")}\nactual: ${packedFiles.join(", ")}`);
  console.log("✅ Packed tarball surface matches the canonical v1.1.0 package boundary plus npm-emitted package.json.");
}

main().catch((error) => {
  console.error("❌ Packed tarball surface validation failed.");
  console.error(error);
  process.exit(1);
});
