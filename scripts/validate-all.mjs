#!/usr/bin/env node
import { promises as fs } from "fs";
import path from "path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";
import { loadJsonStrict } from "./load-json-strict.mjs";

const ROOT_DIR = process.cwd();
const CURRENT_VERSION = "1.1.0";
const SCHEMAS_ROOT = path.join(ROOT_DIR, "schemas", `v${CURRENT_VERSION}`);
const EXAMPLES_ROOT = path.join(ROOT_DIR, "examples", `v${CURRENT_VERSION}`, "commercial");
const EXPECTED_VERBS = ["authorize", "checkout", "purchase", "ship", "verify"];
const CANONICAL_DEF_NAMES = [
  "actor_identity",
  "payer_actor",
  "payee_actor",
  "merchant_actor",
  "provider_actor",
  "carrier_actor",
  "verifier_actor",
  "reference",
  "money",
  "payment_proof"
];
const PAYMENT_ALIAS_GROUPS = [
  {
    label: "payment_requirement",
    defs: ["payment_requirement", "x402_payment_requirement"]
  },
  {
    label: "payment_session",
    defs: ["payment_session", "x402_payment_session"]
  },
  {
    label: "payment_proof",
    defs: ["payment_proof", "x402_payment_proof", "x402_proof"]
  }
];

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

function expectedVerbEntry(verb) {
  return {
    verb,
    request_schema: `schemas/v${CURRENT_VERSION}/commercial/${verb}/${verb}.request.schema.json`,
    receipt_schema: `schemas/v${CURRENT_VERSION}/commercial/${verb}/${verb}.receipt.schema.json`,
    examples: `examples/v${CURRENT_VERSION}/commercial/${verb}`
  };
}

function normalizeJson(value) {
  if (Array.isArray(value)) return value.map(normalizeJson);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, normalizeJson(value[key])])
    );
  }
  return value;
}

function deepEqualJson(left, right) {
  return JSON.stringify(normalizeJson(left)) === JSON.stringify(normalizeJson(right));
}

async function loadCurrentSchemas() {
  const schemaFiles = (await collectJsonFiles(SCHEMAS_ROOT))
    .filter((file) => file.endsWith(".schema.json"))
    .sort();

  return Promise.all(schemaFiles.map(async (file) => ({
    file,
    rel: path.relative(ROOT_DIR, file).replace(/\\/g, "/"),
    schema: await loadJsonStrict(file)
  })));
}

async function validateManifest() {
  const manifest = await loadJsonStrict(path.join(ROOT_DIR, "manifest.json"));
  assert(!("$schema" in manifest), "manifest.json must not carry a decorative $schema field");
  assert(manifest.version === CURRENT_VERSION, `manifest version must be ${CURRENT_VERSION}`);
  assert(manifest.status === "current", "manifest status must be current");
  assert(manifest.schemas_root === `schemas/v${CURRENT_VERSION}`, "manifest schemas_root drift");
  assert(manifest.examples_root === `examples/v${CURRENT_VERSION}`, "manifest examples_root drift");
  assert(manifest.current_index === `schemas/v${CURRENT_VERSION}/index.json`, "manifest current_index drift");
  assert(manifest.checksums_file === "checksums.txt", "manifest checksums_file drift");
  assert("declared_alignment" in manifest, "manifest must expose declarative alignment metadata");
  assert(!("aligns_with" in manifest), "manifest aligns_with field must not imply verified enforcement");
  assert(JSON.stringify(manifest.verbs.map((v) => v.verb)) === JSON.stringify(EXPECTED_VERBS), "manifest verb list drift");
}

async function validatePackage() {
  const pkg = await loadJsonStrict(path.join(ROOT_DIR, "package.json"));
  assert(pkg.version === CURRENT_VERSION, `package version must be ${CURRENT_VERSION}`);
  assert(pkg.main === `schemas/v${CURRENT_VERSION}/index.json`, "package main drift");
  assert(pkg.exports['.'] === `./schemas/v${CURRENT_VERSION}/index.json`, "package exports current entry drift");
  assert(pkg.publishConfig?.access === "public", "package publishConfig.access drift");
  assert(pkg.files.includes("INTEGRATOR.md"), "package files must include INTEGRATOR.md");
}

async function validateSchemaTree() {
  const currentSchemas = await loadCurrentSchemas();
  assert(currentSchemas.length === 10, "expected 10 current-line schema files");
  const ajv = new Ajv2020({ strict: true, allErrors: true, allowUnionTypes: false });
  addFormats(ajv);
  ajvErrors(ajv);
  for (const { rel, schema } of currentSchemas) {
    const expectedId = `https://commandlayer.org/${rel}`;
    assert(schema.$schema === "https://json-schema.org/draft/2020-12/schema", `${rel} has unexpected $schema`);
    assert(schema.$id === expectedId, `${rel} has mismatched $id`);
    assert(!rel.includes("/_shared/"), "v1.1.0 current line must not use _shared");
    assert(!rel.includes("/requests/") && !rel.includes("/receipts/"), "v1.1.0 current line must not use nested request/receipt directories");
    ajv.compile(schema);
  }
  return currentSchemas;
}

function collectDefHolders(currentSchemas, defNames) {
  return currentSchemas.flatMap(({ rel, schema }) =>
    defNames
      .filter((defName) => schema.$defs && defName in schema.$defs)
      .map((defName) => ({ rel, defName, def: schema.$defs[defName] }))
  );
}

async function validateSchemaConsistency(currentSchemas) {
  for (const defName of CANONICAL_DEF_NAMES) {
    const holders = collectDefHolders(currentSchemas, [defName]);
    if (holders.length < 2) continue;

    const baseline = holders[0];
    for (const holder of holders.slice(1)) {
      assert(
        deepEqualJson(baseline.def, holder.def),
        `canonical $defs drift for '${defName}': ${holder.rel} differs from ${baseline.rel}`
      );
    }
  }

  for (const group of PAYMENT_ALIAS_GROUPS) {
    const holders = collectDefHolders(currentSchemas, group.defs);
    if (holders.length < 2) continue;

    const baseline = holders[0];
    for (const holder of holders.slice(1)) {
      assert(
        deepEqualJson(baseline.def, holder.def),
        `payment-layer $defs drift for '${group.label}': ${holder.rel}#/$defs/${holder.defName} differs from ${baseline.rel}#/$defs/${baseline.defName}`
      );
    }
  }
}

async function validateIndex() {
  const indexPath = path.join(SCHEMAS_ROOT, "index.json");
  const indexJson = await loadJsonStrict(indexPath);
  assert(!("$schema" in indexJson), "index.json must not carry JSON Schema validator framing");
  assert(indexJson.version === CURRENT_VERSION, "index.json version drift");
  assert(indexJson.schemas_root === `schemas/v${CURRENT_VERSION}`, "index.json schemas_root drift");
  assert(JSON.stringify(indexJson.verbs) === JSON.stringify(EXPECTED_VERBS.map(expectedVerbEntry)), "index.json verb inventory drift");

  const manifest = await loadJsonStrict(path.join(ROOT_DIR, "manifest.json"));
  assert(JSON.stringify(indexJson.verbs) === JSON.stringify(manifest.verbs), "manifest/index verb inventory mismatch");
}

async function validateLayout() {
  for (const verb of EXPECTED_VERBS) {
    const dir = path.join(SCHEMAS_ROOT, "commercial", verb);
    const entries = await fs.readdir(dir);
    assert(entries.includes(`${verb}.request.schema.json`), `missing ${verb} request schema`);
    assert(entries.includes(`${verb}.receipt.schema.json`), `missing ${verb} receipt schema`);

    const examplesDir = path.join(EXAMPLES_ROOT, verb);
    const exampleGroups = await fs.readdir(examplesDir);
    assert(exampleGroups.includes("valid"), `missing ${verb} valid examples directory`);
    assert(exampleGroups.includes("invalid"), `missing ${verb} invalid examples directory`);
    assert(!exampleGroups.includes("ts"), `legacy TypeScript examples must not appear under current-line examples/${verb}/ts`);
  }
}

async function main() {
  await validateManifest();
  await validatePackage();
  await validateLayout();
  const currentSchemas = await validateSchemaTree();
  await validateSchemaConsistency(currentSchemas);
  await validateIndex();
  console.log("✅ Current release metadata, paths, schemas, and canonical $defs validated.");
}

main().catch((error) => {
  console.error("❌ Schema validation failed.");
  console.error(error);
  process.exit(1);
});
