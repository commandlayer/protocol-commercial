#!/usr/bin/env node
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { readFileSync } from "fs";
import { glob } from "glob";

const patterns = process.argv.slice(2);
if (patterns.length === 0) {
  console.error("Usage: node scripts/compile-all.mjs <glob patterns>");
  process.exit(1);
}

const ajv = new Ajv({ strict: true, allErrors: true });
addFormats(ajv);
addErrors(ajv);

const files = (await glob(patterns)).sort();
let ok = 0;
for (const f of files) {
  try {
    const schema = JSON.parse(readFileSync(f, "utf-8"));
    ajv.compile(schema);
    console.log("OK  ", f);
    ok++;
  } catch (e) {
    console.error("FAIL", f);
    console.error(String(e));
    process.exitCode = 1;
  }
}
console.log(`Compiled ${ok}/${files.length}`);
