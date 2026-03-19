# ONBOARDING — Protocol-Commercial

This document describes the repository-wide maintainer workflow. The active release line is `v1.1.0` unless a new line is being prepared intentionally.

## Standard maintainer workflow

1. Install dependencies.
   ```bash
   npm install
   ```
2. Edit schemas, examples, manifest metadata, checksums, and docs coherently.
3. Run release validation.
   ```bash
   npm run validate
   ```
4. Regenerate checksums after any release-surface change.
   ```bash
   npm run generate:checksums
   ```
5. Re-run validation and checksum verification.
   ```bash
   npm run validate
   npm run validate:checksums
   ```

## Adding a new verb

1. Create a flat request and receipt schema pair under `schemas/<new-version>/commercial/<verb>/`.
2. Add multiple valid and invalid request and receipt examples.
3. Update `manifest.json`, validation logic, and checksum scope if the release surface changes.
4. Update README, SPEC, and affected policy docs if the public contract changes.

## Version bumps

1. Never silently mutate a published version line.
2. Create new `schemas/vX.Y.Z/` and `examples/vX.Y.Z/` trees.
3. Update package metadata, manifest metadata, docs, validation assumptions, checksums, and content-addressing metadata.
4. Publish new flat schema paths and update any Agent Card bindings that reference the superseded current line.

## Release publication

1. Finalize the release artifact set.
2. Regenerate checksums.
3. Capture final CID values for the schema tree, example tree, and release bundle.
4. Publish matching commandlayer.org mirrors for the canonical flat paths.
5. Re-run validation against the published artifact set before announcement.
