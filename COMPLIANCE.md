# COMPLIANCE — Protocol-Commercial

This document defines release compliance expectations for the current line, `v1.1.0`, and the repository-level integrity controls that publish it.

A compliant release must satisfy all of the following:

- schema `$id` values match the canonical flat mirror paths
- manifest metadata validates against `schemas/manifest/manifest.schema.json`
- every current verb has multiple valid and invalid request and receipt examples
- strict schema validation passes
- flat drift checks pass
- checksum verification passes for the declared checksum scope
- content-addressing metadata is captured and published consistently

Protocol-Commercial does not make legal, regulatory, AML, sanctions, tax, or fraud adjudication claims on behalf of implementers.
