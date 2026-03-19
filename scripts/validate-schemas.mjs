#!/usr/bin/env node
import { promises as fs } from "fs";
import path from "path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";

const ROOT_DIR = process.cwd();
const CURRENT_VERSION = "1.1.0";
const SCHEMAS_ROOT = path.join(ROOT_DIR, "schemas", `v${CURRENT_VERSION}`);
const COMMERCIAL_ROOT = path.join(SCHEMAS_ROOT, "commercial");
const EXPECTED_VERBS = ["authorize", "checkout", "purchase", "ship", "verify"];
const SCHEMA_COMPARISON_RULES = [
  {
    name: "actor definition",
    path: "$defs.actor"
  },
  {
    name: "actor.role enum",
    path: "$defs.actor.properties.role"
  },
  {
    name: "actor.kind enum",
    path: "$defs.actor.properties.kind"
  },
  {
    name: "reference definition",
    path: "$defs.reference"
  },
  {
    name: "reference.type enum",
    path: "$defs.reference.properties.type"
  },
  {
    name: "money definition",
    path: "$defs.money"
  },
  {
    name: "money.amount pattern",
    path: "$defs.money.properties.amount"
  },
  {
    name: "money.currency pattern",
    path: "$defs.money.properties.currency"
  },
  {
    name: "settlement definition",
    path: "$defs.settlement"
  },
  {
    name: "amount_breakdown definition",
    path: "$defs.amount_breakdown"
  },
  {
    name: "x402_proof.scheme",
    path: "$defs.x402_proof.properties.scheme"
  },
  {
    name: "x402_proof.proof_ref",
    path: "$defs.x402_proof.properties.proof_ref"
  },
  {
    name: "x402_proof.uri",
    path: "$defs.x402_proof.properties.uri"
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

async function loadJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, canonicalize(value[key])])
    );
  }
  return value;
}

function getByPath(object, pathExpression) {
  return pathExpression.split(".").reduce((value, segment) => {
    if (value === undefined || value === null) return undefined;
    return value[segment];
  }, object);
}

function formatSnippet(value) {
  return JSON.stringify(canonicalize(value), null, 2);
}

function assertSchemaConsistency(schemas) {
  const driftMessages = [];

  for (const rule of SCHEMA_COMPARISON_RULES) {
    const matches = schemas
      .map(({ rel, schema }) => ({ rel, value: getByPath(schema, rule.path) }))
      .filter(({ value }) => value !== undefined);

    if (matches.length < 2) continue;

    const baseline = matches[0];
    const baselineCanonical = JSON.stringify(canonicalize(baseline.value));

    for (const candidate of matches.slice(1)) {
      const candidateCanonical = JSON.stringify(canonicalize(candidate.value));
      if (candidateCanonical !== baselineCanonical) {
        driftMessages.push(
          [
            `Structure drift detected for ${rule.name}.`,
            `Compared path: ${rule.path}`,
            `Baseline file: ${baseline.rel}`,
            `Differing file: ${candidate.rel}`,
            "Baseline value:",
            formatSnippet(baseline.value),
            "Differing value:",
            formatSnippet(candidate.value)
          ].join("\n")
        );
      }
    }
  }

  if (driftMessages.length > 0) {
    throw new Error(driftMessages.join("\n\n"));
  }
}

async function validateManifest() {
  const manifest = await loadJson(path.join(ROOT_DIR, "manifest.json"));
  assert(manifest.version === CURRENT_VERSION, `manifest version must be ${CURRENT_VERSION}`);
  assert(manifest.schemas_root === `schemas/v${CURRENT_VERSION}`, "manifest schemas_root drift");
  assert(manifest.examples_root === `examples/v${CURRENT_VERSION}`, "manifest examples_root drift");
  assert(JSON.stringify(manifest.verbs.map((v) => v.verb)) === JSON.stringify(EXPECTED_VERBS), "manifest verb list drift");
}

async function validatePackage() {
  const pkg = await loadJson(path.join(ROOT_DIR, "package.json"));
  assert(pkg.version === CURRENT_VERSION, `package version must be ${CURRENT_VERSION}`);
  assert(pkg.main === `schemas/v${CURRENT_VERSION}/index.json`, "package main drift");
}

async function validateSchemaTree() {
  const schemaFiles = (await collectJsonFiles(SCHEMAS_ROOT)).filter((file) => file.endsWith(".schema.json")).sort();
  assert(schemaFiles.length === 10, "expected 10 current-line schema files");
  const ajv = new Ajv2020({ strict: true, allErrors: true, allowUnionTypes: false });
  addFormats(ajv);
  ajvErrors(ajv);

  const schemas = [];
  for (const file of schemaFiles) {
    const schema = await loadJson(file);
    const rel = path.relative(ROOT_DIR, file).replace(/\\/g, "/");
    const expectedId = `https://commandlayer.org/${rel}`;
    assert(schema.$schema === "https://json-schema.org/draft/2020-12/schema", `${rel} has unexpected $schema`);
    assert(schema.$id === expectedId, `${rel} has mismatched $id`);
    assert(!rel.includes("/_shared/"), "v1.1.0 current line must not use _shared");
    ajv.compile(schema);
    schemas.push({ rel, schema });
  }

  assertSchemaConsistency(schemas.filter(({ rel }) => rel.startsWith(path.relative(ROOT_DIR, COMMERCIAL_ROOT).replace(/\\/g, "/"))));

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
  console.log("✅ Current release metadata, schema layout, and schema consistency validated.");
}

main().catch((error) => {
  console.error("❌ Schema validation failed.");
  console.error(error);
  process.exit(1);
});
