# ONBOARDING — Protocol-Commercial v1.1.0

## Document scope

This document is the maintainer workflow for the current release line.

## Maintainer workflow

1. Install dependencies.
   ```bash
   npm install
   ```
2. Edit schemas, examples, metadata, scripts, and docs coherently.
3. Run validation.
   ```bash
   npm run validate
   npm run validate:examples
   npm run validate:integrity
   ```
4. Regenerate checksums.
   ```bash
   npm run generate:checksums
   ```
5. Re-run validation and checksum verification.
   ```bash
   npm run validate
   npm run validate:examples
   npm run validate:integrity
   sha256sum -c checksums.txt
   ```

## Adding a new commercial verb

1. Create a new flat directory under `schemas/<new-version>/commercial/<verb>/`.
2. Add exactly one request schema and one receipt schema.
3. Create matching example folders under `examples/<new-version>/commercial/<verb>/valid` and `invalid`.
4. Add at least one valid request, one valid receipt, one invalid request, and one invalid receipt.
5. Make every invalid example isolate a single intended failure when practical.
6. Update `manifest.json`, `schemas/<version>/index.json`, validation expectations, and checksums.
7. Update README and SPEC if the normative surface changed.
8. Confirm public docs controlled by this repo still teach the exact current path model.

## Version bumps

1. Never mutate a published version directory in place after release.
2. Create a new `schemas/vX.Y.Z/` and `examples/vX.Y.Z/` tree.
3. Update `package.json`, `manifest.json`, README, SPEC, policy docs, and workflow assumptions.
4. Regenerate checksums for the new current line.
5. Move any prior current-line wording into explicit legacy wording where needed.

## Mirrors and publication

For the current line, the canonical path model is flat:

- `https://commandlayer.org/schemas/vX.Y.Z/commercial/<verb>/<verb>.request.schema.json`
- `https://commandlayer.org/schemas/vX.Y.Z/commercial/<verb>/<verb>.receipt.schema.json`

Do not teach the legacy nested `requests/` and `receipts/` pattern as the current line after a flat migration.

## Release hygiene

- Keep the current line obvious.
- Keep legacy lines explicitly marked as legacy.
- Keep schema paths flat and mirror-safe.
- Keep checksum scope explicit.
- Prefer exactness over deduplication.
