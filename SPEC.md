# SPEC — Protocol-Commercial v1.1.0

This document is normative.

## 1. Scope

Protocol-Commercial v1.1.0 defines the canonical commercial contracts that extend Protocol-Commons v1.1.0.

The repository governs:

- request schema identities
- receipt schema identities
- field-level commercial semantics
- deterministic versioning rules
- x402-first commercial binding expectations
- validation and integrity requirements

The repository does not govern runtime transport implementation, provider policy, or legal adjudication.

## 2. Current artifact set

Current normative line:

- `schemas/v1.1.0/`
- `examples/v1.1.0/`
- `manifest.json`
- `checksums.txt`

Legacy published line retained but superseded:

- `schemas/v1.0.0/`
- `examples/v1.0.0/`

## 3. Version and identity rules

1. Every v1.1.0 schema MUST use a stable `$id` under `https://commandlayer.org/schemas/v1.1.0/...`.
2. A schema file path and its `$id` MUST agree exactly.
3. A v1.1.0 schema MUST NOT be mutated in place after release publication.
4. Breaking or meaning-changing edits require a new version directory.
5. `manifest.json` MUST identify the current release line and any retained legacy lines.
6. `checksums.txt` MUST cover the machine-verifiable release artifact set.

## 4. Flat schema rule

Protocol-Commercial v1.1.0 uses flat, self-contained per-verb schemas.

- No v1.1.0 `_shared/` tree is normative.
- Request schemas MUST be inspectable without cross-file dependency chasing.
- Receipt schemas MUST be inspectable without cross-file dependency chasing.
- Limited internal `$defs` within a single schema file are allowed.

## 5. Commercial contract requirements

All v1.1.0 requests and receipts MUST include:

- `protocol = commercial`
- `version = 1.1.0`
- canonical `verb`
- a stable request or receipt identifier
- an RFC 3339 timestamp appropriate to the artifact type

Commercial schemas SHOULD add stricter structure than Commons wherever value movement is involved, including:

- explicit counterparties
- typed monetary amounts
- typed references to order, invoice, authorization, payment, settlement, or shipment artifacts
- typed settlement status
- typed verification outcomes

## 6. x402 binding expectations

Protocol-Commercial v1.1.0 is x402-first.

Normative implications:

1. Commercial invocations SHOULD use x402-aware execution infrastructure.
2. Payment requirements, sessions, authorizations, and proofs SHOULD be referenced explicitly when a verb depends on them.
3. The receipt MUST capture the canonical commercial outcome, not transport exhaust.
4. Runtime tracing or provider-specific debugging metadata MUST NOT be treated as normative receipt truth.

## 7. Receipt philosophy

Receipts are canonical commercial artifacts.

Receipts MUST represent portable truth about:

- authorization outcome
- settlement outcome
- fulfillment outcome
- verification outcome
- references needed for later audit or linkage

Receipts MUST NOT become generic runtime trace dumps.

## 8. Agent Cards relationship

Agent Cards v1.1.0 bind identity and discovery to these schema artifacts.

For commercial cards, request and receipt schema URIs SHOULD point directly at the stable mirror paths published by this repository.

## 9. Conformance

A conformant release MUST satisfy all of the following:

- every declared verb has a request schema and a receipt schema
- every declared verb has valid and invalid examples for both request and receipt artifacts
- `npm run validate` passes
- `sha256sum -c checksums.txt` passes
- repository metadata does not drift from the published current line
