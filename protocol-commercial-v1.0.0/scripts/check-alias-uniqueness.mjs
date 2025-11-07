#!/usr/bin/env node
import { readFileSync } from "fs";
import { glob } from "glob";
import path from "path";

const aliasSchemaGlob = "schemas/v1.0.0/commercial/*/aliases/*.json";
const files = (await glob(aliasSchemaGlob)).sort();

const seen = new Map();
let ok = true;
for (const f of files) {
  const obj = JSON.parse(readFileSync(f, "utf-8"));
  const list = Array.isArray(obj.aliases) ? obj.aliases : [];
  for (const name of list) {
    if (seen.has(name)) {
      console.error(`Alias conflict: ${name} already used by ${seen.get(name)} (also in ${f})`);
      ok = false;
    } else {
      seen.set(name, f);
    }
  }
}
if (!ok) {
  process.exit(1);
} else {
  console.log("Alias uniqueness OK");
}
