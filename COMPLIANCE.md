# COMPLIANCE — Protocol-Commercial

This document describes current-line release compliance expectations for the active v1.1.0 commercial line.

Protocol-Commercial compliance is about typed economic semantics and release integrity.

A compliant release candidate must satisfy all of the following:

- schema `$id` values match the canonical mirror paths
- current release metadata points at `v1.1.0`
- every current verb has valid and invalid request and receipt examples
- validation passes in strict mode
- `sha256sum -c checksums.txt` passes for the checksum-covered machine-artifact set

Protocol-Commercial does not make legal, regulatory, AML, sanctions, tax, or fraud adjudication claims on behalf of implementers.
