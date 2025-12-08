import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCHEMAS_ROOT = path.join(__dirname, "..", "schemas", "v1.0.0");
const EXAMPLES_ROOT = path.join(__dirname, "..", "examples", "v1.0.0", "commercial");

const VERBS = [
  "authorize",
  "checkout",
  "purchase",
  "ship",
  "verify"
];

function createAjv() {
  const ajv = new Ajv2020({
    strict: true,
    strictSchema: true,
    strictRequired: true,
    allErrors: true,
    allowUnionTypes: false
  });

  addFormats(ajv);
  ajvErrors(ajv);

  return ajv;
}

async function loadJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function existsDir(dirPath) {
  try {
    const stat = await fs.stat(dirPath);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

async function preloadAllSchemas(ajv) {
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".schema.json")) {
        const schema = await loadJson(fullPath);
        const key = schema.$id || fullPath;
        try {
          ajv.addSchema(schema, key);
        } catch (err) {
          if (!String(err.message || "").includes("already exists")) {
            throw err;
          }
        }
      }
    }
  }

  await walk(SCHEMAS_ROOT);
}

async function validateExamplesForVerb(verb, ajv) {
  const validDir = path.join(EXAMPLES_ROOT, verb, "valid");
  const invalidDir = path.join(EXAMPLES_ROOT, verb, "invalid");

  const hasValidDir = await existsDir(validDir);
  const hasInvalidDir = await existsDir(invalidDir);

  if (!hasValidDir && !hasInvalidDir) {
    console.log(`ℹ️  No examples found for commercial verb: ${verb}, skipping.`);
    return;
  }

  console.log(`\n🔍 Validating commercial examples for verb: ${verb}`);

  const requestSchemaId =
    `https://commandlayer.org/schemas/v1.0.0/commercial/${verb}/requests/${verb}.request.schema.json`;
  const receiptSchemaId =
    `https://commandlayer.org/schemas/v1.0.0/commercial/${verb}/receipts/${verb}.receipt.schema.json`;

  const validateRequest = ajv.getSchema(requestSchemaId);
  const validateReceipt = ajv.getSchema(receiptSchemaId);

  if (!validateRequest) {
    throw new Error(`No compiled schema found in Ajv for request id: ${requestSchemaId}`);
  }
  if (!validateReceipt) {
    throw new Error(`No compiled schema found in Ajv for receipt id: ${receiptSchemaId}`);
  }

  async function validateDir(dirPath, expectedValid) {
    if (!(await existsDir(dirPath))) return;

    const files = await fs.readdir(dirPath);

    for (const file of files) {
      if (!file.endsWith(".json")) continue;

      const fullPath = path.join(dirPath, file);
      const data = await loadJson(fullPath);

      const isRequest = file.includes("request");
      const validateFn = isRequest ? validateRequest : validateReceipt;

      const ok = validateFn(data);

      if (expectedValid && !ok) {
        console.error(
          `❌ Expected VALID but got errors for ${fullPath}:`,
          validateFn.errors
        );
        throw new Error(`Example should be valid but failed: ${fullPath}`);
      }

      if (!expectedValid && ok) {
        console.error(
          `❌ Expected INVALID but schema accepted ${fullPath}`
        );
        throw new Error(`Example should be invalid but passed: ${fullPath}`);
      }
    }
  }

  await validateDir(validDir, true);
  await validateDir(invalidDir, false);

  console.log(`✅ Commercial examples OK for verb: ${verb}`);
}

async function main() {
  try {
    const ajv = createAjv();
    await preloadAllSchemas(ajv);

    for (const verb of VERBS) {
      await validateExamplesForVerb(verb, ajv);
    }

    console.log("\n✅ All commercial example validations completed.");
  } catch (err) {
    console.error("❌ Unexpected error in commercial validate-examples.mjs:");
    console.error(err);
    process.exit(1);
  }
}

main();
