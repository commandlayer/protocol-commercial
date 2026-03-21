# SECURITY PROVENANCE — Protocol-Commercial

## Release posture

Current release line: `v1.1.0`

Canonical shipped npm package surface:

- `schemas/v1.1.0/`
- `examples/v1.1.0/`
- `manifest.json`
- `checksums.txt`
- `LICENSE`
- `README.md`
- `index.js`

Checksum-covered published payload:

- `schemas/v1.1.0/`
- `examples/v1.1.0/`
- `manifest.json`
- `LICENSE`
- `README.md`
- `index.js`

`checksums.txt` is the generated SHA-256 ledger for that checksum-covered payload. Because the ledger describes the payload, it is not itself part of the hashed payload. Checksum verification therefore confirms the published payload relative to the checked-in `checksums.txt` ledger and does not independently authenticate that ledger.

Release integrity state for this repository:

- `manifest.json` marks `v1.1.0` as the current release line.
- `checksums.txt` records repository-local SHA-256 digests for the canonical shipped payload excluding the ledger file itself.
- `index.js` resolves the package root export to `schemas/v1.1.0/index.json`.
- Canonical schema `$id` values resolve to the commandlayer.org release paths for `v1.1.0`.
- Retained `v1.0.0` material is repository-only historical source and is not part of the shipped package boundary.

This file makes only repository-backed claims. It does not assert external pin, CID, or public mirror state unless those values are recorded in this repository.
