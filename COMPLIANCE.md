# COMPLIANCE — Protocol-Commercial

## Document scope

This document describes current release compliance criteria for Protocol-Commercial v1.1.0.

Protocol-Commercial compliance is about typed economic semantics, path correctness, and release integrity.

A compliant release candidate must satisfy all of the following:

- schema `$id` values match the canonical current mirror paths exactly
- current release metadata points at `v1.1.0`
- `schemas/v1.1.0/index.json` and `manifest.json` agree on verb inventory and artifact paths
- every current verb has valid and invalid request and receipt examples
- validation passes in strict mode
- checksum scope matches the documented current release artifact set
- `sha256sum -c checksums.txt` passes

Protocol-Commercial does not make legal, regulatory, AML, sanctions, tax, or fraud adjudication claims on behalf of implementers.
