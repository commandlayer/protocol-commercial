#!/usr/bin/env node
import { promises as fs } from "fs";
import path from "path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";

const ROOT_DIR = process.cwd();
const CURRENT_VERSION = "1.1.0";
const SCHEMAS_ROOT = path.join(ROOT_DIR, "schemas", `v${CURRENT_VERSION}`);
const EXPECTED_VERBS = ["authorize", "checkout", "purchase", "ship", "verify"];

async function collectJsonFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await collectJsonFiles(fullPath));
    else if (entry.isFile() && entry.name.endsWith(".json")) files.push(fullPath);
  }
  return files;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function loadJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function validateManifest() {
  const manifest = await loadJson(path.join(ROOT_DIR, "manifest.json"));
  assert(!("$schema" in manifest), "manifest.json must not carry a decorative $schema field");
  assert(manifest.version === CURRENT_VERSION, `manifest version must be ${CURRENT_VERSION}`);
  assert(manifest.schemas_root === `schemas/v${CURRENT_VERSION}`, "manifest schemas_root drift");
  assert(manifest.examples_root === `examples/v${CURRENT_VERSION}`, "manifest examples_root drift");
  assert(manifest.current_index === `schemas/v${CURRENT_VERSION}/index.json`, "manifest current_index drift");
  assert(manifest.checksums_file === "checksums.txt", "manifest checksums_file drift");
  assert(JSON.stringify(manifest.verbs.map((v) => v.verb)) === JSON.stringify(EXPECTED_VERBS), "manifest verb list drift");
}

async function validatePackage() {
  const pkg = await loadJson(path.join(ROOT_DIR, "package.json"));
  assert(pkg.version === CURRENT_VERSION, `package version must be ${CURRENT_VERSION}`);
  assert(pkg.main === `schemas/v${CURRENT_VERSION}/index.json`, "package main drift");
}

async function validateSchemaTree() {
  const schemaFiles = (await collectJsonFiles(SCHEMAS_ROOT)).filter((file) => file.endsWith(".schema.json"));
  assert(schemaFiles.length === 10, "expected 10 current-line schema files");
  const ajv = new Ajv2020({ strict: true, allErrors: true, allowUnionTypes: false });
  addFormats(ajv);
  ajvErrors(ajv);
  for (const file of schemaFiles) {
    const schema = await loadJson(file);
    const rel = path.relative(ROOT_DIR, file).replace(/\\/g, "/");
    const expectedId = `https://commandlayer.org/${rel}`;
    assert(schema.$schema === "https://json-schema.org/draft/2020-12/schema", `${rel} has unexpected $schema`);
    assert(schema.$id === expectedId, `${rel} has mismatched $id`);
    assert(!rel.includes("/_shared/"), "v1.1.0 current line must not use _shared");
    ajv.compile(schema);
  }
  const indexJson = await loadJson(path.join(SCHEMAS_ROOT, "index.json"));
  assert(indexJson.version === CURRENT_VERSION, "index.json version drift");
}

async function validateLayout() {
  for (const verb of EXPECTED_VERBS) {
    const dir = path.join(SCHEMAS_ROOT, "commercial", verb);
    const entries = await fs.readdir(dir);
    assert(entries.includes(`${verb}.request.schema.json`), `missing ${verb} request schema`);
    assert(entries.includes(`${verb}.receipt.schema.json`), `missing ${verb} receipt schema`);
  }
}

async function main() {
  await validateManifest();
  await validatePackage();
  await validateLayout();
  await validateSchemaTree();
  console.log("✅ Current release metadata and schemas validated.");
}

main().catch((error) => {
  console.error("❌ Schema validation failed.");
  console.error(error);
  process.exit(1);
});
