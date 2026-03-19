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
const CHECKSUM_SCOPE = [
  "manifest.json",
  "package.json",
  "README.md",
  "SPEC.md",
  "GOVERNANCE.md",
  "POLICY.md",
  "COMPLIANCE.md",
  "SECURITY.md",
  "SECURITY_PROVENANCE.md",
  "ONBOARDING.md",
  "RESOLUTION.md",
  "schemas/v1.1.0",
  "examples/v1.1.0"
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

function stable(value) {
  return JSON.stringify(value);
}

async function validateManifest(ajv) {
  const manifestPath = path.join(ROOT_DIR, "manifest.json");
  const manifestSchema = await loadJson(path.join(ROOT_DIR, "schemas", "manifest", "manifest.schema.json"));
  const manifest = await loadJson(manifestPath);
  const validateManifestShape = ajv.compile(manifestSchema);
  assert(validateManifestShape(manifest), `manifest.json failed schema validation: ${ajv.errorsText(validateManifestShape.errors)}`);
  assert(manifest.version === CURRENT_VERSION, `manifest version must be ${CURRENT_VERSION}`);
  assert(manifest.schemas_root === `schemas/v${CURRENT_VERSION}`, "manifest schemas_root drift");
  assert(manifest.examples_root === `examples/v${CURRENT_VERSION}`, "manifest examples_root drift");
  assert(stable(manifest.verbs.map((v) => v.verb)) === stable(EXPECTED_VERBS), "manifest verb list drift");
  assert(stable(manifest.checksum_scope) === stable(CHECKSUM_SCOPE), "manifest checksum scope drift");
}

async function validatePackage() {
  const pkg = await loadJson(path.join(ROOT_DIR, "package.json"));
  assert(pkg.version === CURRENT_VERSION, `package version must be ${CURRENT_VERSION}`);
  assert(pkg.main === `schemas/v${CURRENT_VERSION}/index.json`, "package main drift");
  const expectedScripts = ["validate:schemas", "validate:examples", "validate:checksums", "validate", "generate:checksums"];
  assert(stable(Object.keys(pkg.scripts)) === stable(expectedScripts), "package scripts surface drift");
}

async function validateSchemaTree(ajv) {
  const schemaFiles = (await collectJsonFiles(SCHEMAS_ROOT)).filter((file) => file.endsWith(".schema.json"));
  assert(schemaFiles.length === 10, "expected 10 current-line schema files");
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
    const dir = path.join(COMMERCIAL_ROOT, verb);
    const entries = await fs.readdir(dir);
    assert(entries.includes(`${verb}.request.schema.json`), `missing ${verb} request schema`);
    assert(entries.includes(`${verb}.receipt.schema.json`), `missing ${verb} receipt schema`);
  }
}

async function validateFlatConsistency() {
  const schemas = {};
  for (const verb of EXPECTED_VERBS) {
    schemas[`${verb}.request`] = await loadJson(path.join(COMMERCIAL_ROOT, verb, `${verb}.request.schema.json`));
    schemas[`${verb}.receipt`] = await loadJson(path.join(COMMERCIAL_ROOT, verb, `${verb}.receipt.schema.json`));
  }

  const actorRoles = new Set();
  const actorKinds = new Set();
  const referenceTypes = new Set();
  const moneyAmountPatterns = new Set();
  const moneyCurrencyPatterns = new Set();

  for (const [name, schema] of Object.entries(schemas)) {
    const defs = schema.$defs ?? {};
    if (defs.actor) {
      actorRoles.add(stable(defs.actor.properties.role.enum));
      actorKinds.add(stable(defs.actor.properties.kind.enum));
    }
    if (defs.reference) referenceTypes.add(stable(defs.reference.properties.type.enum));
    if (defs.money) {
      moneyAmountPatterns.add(defs.money.properties.amount.pattern);
      moneyCurrencyPatterns.add(defs.money.properties.currency.pattern);
    }
  }

  assert(actorRoles.size === 1, "actor.role enum drift detected across v1.1.0 schemas");
  assert(actorKinds.size === 1, "actor.kind enum drift detected across v1.1.0 schemas");
  assert(referenceTypes.size === 1, "reference.type enum drift detected across v1.1.0 schemas");
  assert(moneyAmountPatterns.size === 1, "money.amount pattern drift detected across v1.1.0 schemas");
  assert(moneyCurrencyPatterns.size === 1, "money.currency pattern drift detected across v1.1.0 schemas");

  const checkoutRequest = schemas["checkout.request"];
  const checkoutReceipt = schemas["checkout.receipt"];
  const purchaseReceipt = schemas["purchase.receipt"];
  const authorizeRequest = schemas["authorize.request"];

  const expectedPaymentSession = {
    type: "object",
    additionalProperties: false,
    required: ["scheme", "session_id", "resource"],
    properties: {
      scheme: { type: "string", const: "x402" },
      session_id: { type: "string", minLength: 1, maxLength: 128 },
      resource: { type: "string", format: "uri", maxLength: 512 },
      network: { type: "string", maxLength: 64 }
    }
  };
  const expectedPaymentRequirement = {
    type: "object",
    additionalProperties: false,
    required: ["scheme", "resource", "max_amount"],
    properties: {
      scheme: { type: "string", const: "x402" },
      resource: { type: "string", format: "uri", maxLength: 512 },
      network: { type: "string", maxLength: 64 },
      max_amount: { $ref: "#/$defs/money" },
      payment_request_id: { type: "string", minLength: 1, maxLength: 128 }
    }
  };

  assert(
    stable(checkoutReceipt.$defs.settlement) === stable(purchaseReceipt.$defs.settlement),
    "settlement structure drift detected between checkout and purchase receipts"
  );
  assert(
    stable(checkoutReceipt.$defs.x402_proof) === stable(purchaseReceipt.$defs.x402_proof),
    "x402 payment_proof structure drift detected between checkout and purchase receipts"
  );
  assert(
    stable(checkoutRequest.$defs.payment_session) === stable(expectedPaymentSession),
    "checkout payment_session structure drift detected"
  );
  assert(
    stable(authorizeRequest.$defs.x402_requirement) === stable(expectedPaymentRequirement),
    "authorize payment_requirement structure drift detected"
  );
}

async function main() {
  const ajv = new Ajv2020({ strict: true, allErrors: true, allowUnionTypes: false });
  addFormats(ajv);
  ajvErrors(ajv);
  await validateManifest(ajv);
  await validatePackage();
  await validateLayout();
  await validateSchemaTree(ajv);
  await validateFlatConsistency();
  console.log("✅ Current release metadata, manifest schema, flat-structure drift guards, and schemas validated.");
}

main().catch((error) => {
  console.error("❌ Schema validation failed.");
  console.error(error);
  process.exit(1);
});
