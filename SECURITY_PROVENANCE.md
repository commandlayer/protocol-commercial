# SECURITY PROVENANCE — Protocol-Commercial

This document describes current-line release provenance for the active v1.1.0 commercial line.

## Current release posture

Current release line: `v1.1.0`

Checksum-covered machine-artifact roots:

- `schemas/v1.1.0/`
- `examples/v1.1.0/`
- `manifest.json`

`checksums.txt` is the generated SHA-256 ledger for that machine-artifact set. Release-defining prose docs in the repository are intentionally outside this checksum boundary and must not be described as checksum-protected.

## Pending post-merge release actions

The final v1.1.0 CID values must be captured after the checksum-covered artifact set is pinned.

Update after pinning:

- schema tree CID
- example tree CID, if mirrored separately
- release bundle CID, if used
- public gateway mirrors

Until those values are captured, `checksums.txt` is the local integrity source of truth for the pending release candidate's checksum-covered machine artifacts.
