# INTEGRATOR — Protocol-Commercial v1.1.0

This document is the external-consumer quickstart for the current commercial release line.

## What to import

Use the repository index directly, or a published distribution only after release metadata confirms one.

```js
import commercialIndex from './schemas/v1.1.0/index.json' assert { type: 'json' };
```

That index is the current machine-readable map of every canonical verb schema in the release.

## What is normative vs illustrative

Normative machine artifacts:

- `schemas/v1.1.0/`
- `schemas/v1.1.0/index.json`
- `manifest.json`

Illustrative conformance fixtures:

- `examples/v1.1.0/commercial/<verb>/valid/`
- `examples/v1.1.0/commercial/<verb>/invalid/`

Normative interpretive docs:

- `README.md`
- `SPEC.md`
- `POLICY.md`
- `SECURITY_PROVENANCE.md`

## Safe consumer path

1. Confirm the release version is `1.1.0` and that `manifest.json` reports `status: current`.
2. Load `schemas/v1.1.0/index.json` and select the request and receipt schema paths you need.
3. Configure your validator from the flat per-verb schema files under `schemas/v1.1.0/commercial/<verb>/`.
4. Run the maintained verification commands listed in `SPEC.md` before mirroring or vendoring artifacts.
5. Use `examples/v1.1.0/` as conformance fixtures, not as a substitute for schema requirements.

## Choosing between v1.1.0 and v1.0.0

Choose `v1.1.0` unless you are maintaining compatibility with an older integration that still depends on the published historical nested `requests/` and `receipts/` paths.

- `v1.1.0` is the current canonical flat line.
- `v1.0.0` is retained legacy for compatibility and audit.

Do not teach `v1.0.0` paths as current implementation guidance.

## Checksums and provenance

The authoritative checksum-boundary and release-state rules live in `SPEC.md` and `POLICY.md`.

In short, the checksum-covered payload for this release is the current schema tree, the current examples tree, and `manifest.json`. `checksums.txt` is the ledger for that payload, and prose docs remain outside the hashed set.

## TypeScript guidance

There is no public `examples/v1.1.0/**/ts/` teaching surface in the current release. If a future release restores TypeScript examples, they should be explicitly governed, validated, and documented before they are treated as part of the public implementer surface.
