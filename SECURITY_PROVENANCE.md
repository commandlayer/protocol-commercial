# SECURITY PROVENANCE — Protocol-Commercial

## Document scope

This document records the current integrity and provenance posture of the repository.

## Current release posture

Current release line: `v1.1.0`

Current machine-verifiable artifact roots:

- `schemas/v1.1.0/`
- `examples/v1.1.0/`
- `manifest.json`
- `checksums.txt`

## Integrity source of truth

`checksums.txt` is the current release integrity ledger for the machine-validated artifact set.

Its scope is intentional and exact:

- `manifest.json`
- `schemas/v1.1.0/index.json`
- every JSON artifact under `schemas/v1.1.0/`
- every JSON artifact under `examples/v1.1.0/`

Repository docs are governed by Git history and release review, not by the checksum ledger.

## Provenance posture

No provisional provenance claim is made here beyond what the repository can verify directly.

The hard guarantees are:

- schema identities are pinned by exact `$id` values
- manifest and index inventory are validated against the current release line
- release hashes are reproducible from repository contents
- public mirror paths are required to match repository truth exactly

If external pinning, gateway publication, or additional artifact notarization is performed, that publication must reproduce these exact paths and hashes rather than redefine them.
