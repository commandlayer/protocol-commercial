# RESOLUTION — Protocol-Commercial

## Document scope

This document records repository-level release and migration resolutions.

## Resolution record

### 2026-03-19 — v1.1.0 migration resolution

The repository was migrated from a v1.0.0-centric shared-fragment and nested-path layout to a v1.1.0 current line with flat, self-contained commercial schemas.

The resolution establishes that:

- `v1.1.0` is the current normative release line
- `v1.0.0` remains retained only as a legacy published line
- commandlayer.org mirrors and Agent Card bindings must target the flat v1.1.0 request and receipt schema paths
- the v1.0.0 `requests/` and `receipts/` path model is historical and must not be taught as the current architecture
- x402 references are first-class commercial artifacts rather than side metadata

## Conflict rule

When docs, examples, schemas, manifest metadata, and checksum scope disagree, the mismatch is release drift and must be corrected before publication.
