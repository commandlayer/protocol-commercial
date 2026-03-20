# SECURITY PROVENANCE — Protocol-Commercial

## Release posture

Current release line: `v1.1.0`

Checksum-covered machine-artifact roots:

- `schemas/v1.1.0/`
- `examples/v1.1.0/`
- `manifest.json`

`checksums.txt` is the generated SHA-256 ledger for that machine-artifact set. It describes the checksum-covered payload but is not itself part of the hashed payload. Release-defining prose docs in the repository are intentionally outside this checksum boundary and must not be described as checksum-protected.

Release integrity state for this repository:

- `manifest.json` marks `v1.1.0` as the current release line.
- `checksums.txt` records repository-local SHA-256 digests for the normative schema and example artifacts published from this tree.
- Canonical schema `$id` values resolve to the commandlayer.org release paths for `v1.1.0`.

This file makes only repository-backed claims. It does not assert external pin, CID, or public mirror state unless those values are recorded in this repository.
