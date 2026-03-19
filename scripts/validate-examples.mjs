#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";

const ROOT_DIR = process.cwd();
const CURRENT_VERSION = '1.1.0';
const EXAMPLES_ROOT = path.join(ROOT_DIR, 'examples', `v${CURRENT_VERSION}`, 'commercial');
const SCHEMAS_ROOT = path.join(ROOT_DIR, 'schemas', `v${CURRENT_VERSION}`, 'commercial');
const VERBS = ['authorize', 'checkout', 'purchase', 'ship', 'verify'];

const ajv = new Ajv2020({ strict: true, allErrors: true, allowUnionTypes: false });
addFormats(ajv);
ajvErrors(ajv);

async function loadJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, 'utf8'));
}

async function validateVerb(verb) {
  const requestSchema = await loadJson(path.join(SCHEMAS_ROOT, verb, `${verb}.request.schema.json`));
  const receiptSchema = await loadJson(path.join(SCHEMAS_ROOT, verb, `${verb}.receipt.schema.json`));
  const validateRequest = ajv.compile(requestSchema);
  const validateReceipt = ajv.compile(receiptSchema);

  for (const group of ['valid', 'invalid']) {
    const dir = path.join(EXAMPLES_ROOT, verb, group);
    const files = (await fs.readdir(dir)).filter(file => file.endsWith('.json')).sort();
    const requestFiles = files.filter(file => file.includes('request'));
    const receiptFiles = files.filter(file => file.includes('receipt'));
    if (requestFiles.length === 0 || receiptFiles.length === 0) {
      throw new Error(`${verb} ${group} examples must include both request and receipt cases`);
    }
    for (const file of files) {
      const data = await loadJson(path.join(dir, file));
      const validate = file.includes('request') ? validateRequest : validateReceipt;
      const ok = validate(data);
      if (group === 'valid' && !ok) throw new Error(`${file} should be valid: ${ajv.errorsText(validate.errors)}`);
      if (group === 'invalid' && ok) throw new Error(`${file} should be invalid`);
    }
  }
  console.log(`✅ ${verb} examples validated.`);
}

for (const verb of VERBS) await validateVerb(verb);
console.log('✅ All current-line examples validated.');
