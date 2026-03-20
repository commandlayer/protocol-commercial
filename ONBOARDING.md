# ONBOARDING — Protocol-Commercial

This document is an orientation guide for the active v1.1.0 release line. Contributor policy and pre-merge workflow live in `CONTRIBUTING.md`.

## Document scope

Use this document to understand the repository shape, release line, and maintainer intent before editing.

For the authoritative version policy, checksum boundary, and validation requirements, see `POLICY.md` and `SPEC.md`.

## External consumer workflow

1. Use the repository contents directly, or a published distribution only after release metadata confirms it.
2. Confirm the current line in `manifest.json` and use `schemas/v1.1.0/index.json` as the authoritative schema map.
3. Choose flat schemas under `schemas/v1.1.0/commercial/<verb>/` for validator configuration.
4. Run the maintained verification commands listed in `SPEC.md` before mirroring or vendoring.
5. Treat `examples/v1.1.0/commercial/<verb>/valid/` and `invalid/` as conformance fixtures.
6. Use `v1.0.0` only when compatibility with the historical nested path model is required.

## Maintainer workflow

For contribution workflow, pull request expectations, commit convention, and required pre-merge validation, use `CONTRIBUTING.md`.

High-level maintainer sequence:

1. Install dependencies with `npm install`.
2. Edit schemas, examples, metadata, scripts, and docs coherently.
3. Run the canonical validation commands referenced from `README.md#validation-commands`.
4. Regenerate `checksums.txt` only when checksum-covered machine artifacts change.
5. Keep current-line teaching focused on `v1.1.0` and mark `v1.0.0` as retained legacy.

## Adding a new commercial verb

1. Create a new flat directory under `schemas/<new-version>/commercial/<verb>/`.
2. Add exactly one request schema and one receipt schema.
3. Create matching example folders under `examples/<new-version>/commercial/<verb>/valid` and `invalid`.
4. Add at least one valid request, one alternate valid request or receipt, one invalid request, and one invalid receipt.
5. Make every invalid example isolate a single intended failure when practical.
6. Do not add an ungoverned `examples/v1.1.0/**/ts/` surface to the current line.
7. Update `manifest.json`, `schemas/<version>/index.json`, validation expectations, and checksums.
8. Update README, INTEGRATOR, SPEC, and release-process docs if the public teaching surface changed.
9. Confirm public docs controlled by this repo still teach the exact current path model and current script names.

## Version bumps

1. Never mutate a published version directory in place after release.
2. Create a new `schemas/vX.Y.Z/` and `examples/vX.Y.Z/` tree.
3. Update `package.json`, `manifest.json`, README, SPEC, policy docs, and workflow assumptions.
4. Draft release notes and changelog updates for the new line before publication.
5. Regenerate checksums for the new current line's machine-artifact set.

For the canonical path model and namespace rules, see `SPEC.md`.

## Manual publication follow-up

The repository does not automate publication, GitHub Release publication, IPFS pinning, CID capture, or mirror updates. If your release process uses those steps, perform them manually after the new version line has passed validation:

1. Publish the GitHub Release using `releases/v1.1.0.md` or the corresponding new-version draft.
2. Pin the checksum-covered release artifact set to IPFS, if that distribution channel is being used for the release.
3. Capture resulting CIDs in the external release record if your publication process requires them.
4. Update commandlayer.org mirrors to match the release paths exactly.
5. Update any Agent Card schema bindings that reference the superseded version.

## Release hygiene

- Keep the current line obvious.
- Keep legacy lines explicitly marked as legacy.
- Keep schema paths flat and mirror-safe.
- Keep checksum scope explicit.
- Keep GitHub Releases and repository docs in sync.
- Prefer linking over duplication.
