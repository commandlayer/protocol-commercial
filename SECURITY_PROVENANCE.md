# SECURITY PROVENANCE — Protocol-Commercial

This document records final release provenance for the current line, `v1.1.0`.

## Release scope

The v1.1.0 release surface is defined by:

- `schemas/v1.1.0/`
- `examples/v1.1.0/`
- `manifest.json`
- `package.json`
- release-defining root documentation
- `checksums.txt` as the checksum ledger for that surface

## Integrity authority

- `checksums.txt` is the canonical local integrity ledger for the v1.1.0 release surface.
- `manifest.json` is the canonical metadata record for versioning, checksum scope, and content-addressing data.

## Captured content-addressing values

The final captured release snapshot CIDs for `v1.1.0` are:

- schemas snapshot CID: `bafkreie3jo3l6o7crzke5lap75o7dgrw65w6xwuhtwky2y4ynuzeunernm`
- examples snapshot CID: `bafkreihb5p7awsnjgqbt6qolrajpruh34xjtd64nuymorjruamgozvl3i4`
- release bundle snapshot CID: `bafkreic6bsqt5wx3punqp3p5r2gkpcml76myua7bqgbskplqe5235ab3fi`
- public gateway base: `https://commandlayer.org/ipfs/`

These values are duplicated in `manifest.json` and must remain identical anywhere the release is mirrored or announced.

## Verification workflow

1. Run `npm run validate`.
2. Run `npm run validate:checksums`.
3. Confirm the CID values in `manifest.json` and this document match the published release snapshots.
4. Confirm commandlayer.org mirrors resolve the flat current-line schema paths without path drift.
