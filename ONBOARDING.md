# ONBOARDING — Protocol-Commercial v1.1.0

## Maintainer workflow

1. Install dependencies.
   ```bash
   npm install
   ```
2. Edit schemas, examples, metadata, and docs coherently.
3. Run validation.
   ```bash
   npm run validate
   ```
4. Regenerate checksums.
   ```bash
   npm run generate:checksums
   ```
5. Re-run validation and checksum verification.
   ```bash
   npm run validate
   npm run validate:checksums
   ```

## Adding a new commercial verb

1. Create a new flat directory under `schemas/<new-version>/commercial/<verb>/`.
2. Add exactly one request schema and one receipt schema.
3. Create matching example folders under `examples/<new-version>/commercial/<verb>/valid` and `invalid`.
4. Add at least one valid request, one valid receipt, one invalid request, and one invalid receipt.
5. Update `manifest.json`, `schemas/<version>/index.json`, validation expectations, and checksums.
6. Update README and SPEC if the normative surface changed.

## Version bumps

1. Never mutate a published version directory in place after release.
2. Create a new `schemas/vX.Y.Z/` and `examples/vX.Y.Z/` tree.
3. Update `package.json`, `manifest.json`, README, SPEC, policy docs, and workflow assumptions.
4. Regenerate checksums for the new current line so package metadata stays inside the integrity boundary.

## Pinning and mirrors

After merge and before announcement:

1. Pin the release artifact set to IPFS.
2. Capture resulting CIDs.
3. Update commandlayer.org mirrors to match the release paths exactly.
4. Update any Agent Card schema bindings that reference the superseded version.

## Release hygiene

- Keep the current line obvious.
- Keep legacy lines explicitly marked as legacy.
- Keep schema paths flat and mirror-safe.
- Prefer exactness over deduplication.
