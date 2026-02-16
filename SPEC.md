# SPEC — Protocol-Commercial

**Canonical commercial verbs & schemas for autonomous agents.**  
Defines **value movement semantics**: billing, settlement, and economic receipts.

This document is **normative**.

## Scope

Commercial v1.0.0 governs:

- request + receipt envelopes for economic actions
- deterministic behavior under x402 transport assumptions
- version immutability and pinned schema CIDs

## Canonical artifact set

- Schemas: `schemas/v1.0.0`
- Examples: `examples/v1.0.0`
- Integrity: `checksums.txt`
- Metadata: `manifest.json`

## Versioning rule

The `v1.0.0` artifact set is immutable. Any schema mutation requires:

1. a new version folder
2. regenerated checksums
3. updated manifest metadata and CID references
