# SPEC — Protocol-Commercial v1.1.0

This document is normative for the current release line.

## 1. Scope

Protocol-Commercial v1.1.0 defines the canonical commercial contracts that extend Protocol-Commons v1.1.0.

This specification governs:

- request schema identities
- receipt schema identities
- field-level commercial semantics
- deterministic versioning rules
- x402-first commercial binding expectations
- validation and integrity requirements

This specification does not govern runtime transport implementation, provider policy, or legal adjudication.

## 2. Artifact scope by line

Current normative line:

- `schemas/v1.1.0/`
- `examples/v1.1.0/`
- `manifest.json`
- `checksums.txt`

Published legacy line retained but superseded:

- `schemas/v1.0.0/`
- `examples/v1.0.0/`

## 3. Version and identity rules

1. Every v1.1.0 schema MUST use a stable `$id` under `https://commandlayer.org/schemas/v1.1.0/...`.
2. A schema file path and its `$id` MUST agree exactly.
3. A v1.1.0 schema MUST NOT be mutated in place after release publication.
4. Breaking or meaning-changing edits require a new version directory.
5. `manifest.json` MUST identify the current release line and any retained legacy lines.
6. `schemas/v1.1.0/index.json` MUST enumerate the current verb set and exact repository-relative schema/example paths.
7. `checksums.txt` MUST cover the machine-verifiable current artifact set exactly as documented by this repository.

## 4. Current path model

Protocol-Commercial v1.1.0 uses flat, self-contained per-verb schemas.

- No v1.1.0 `_shared/` tree is normative.
- No v1.1.0 `requests/` or `receipts/` subdirectories are canonical.
- Request schemas MUST be inspectable without cross-file dependency chasing.
- Receipt schemas MUST be inspectable without cross-file dependency chasing.
- Limited internal `$defs` within a single schema file are allowed.

The canonical current-line pattern is:

- `https://commandlayer.org/schemas/v1.1.0/commercial/<verb>/<verb>.request.schema.json`
- `https://commandlayer.org/schemas/v1.1.0/commercial/<verb>/<verb>.receipt.schema.json`

The older nested `schemas/v1.0.0/commercial/<verb>/{requests,receipts}/...` structure is historical only.

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

## 8. Stack alignment rule

Protocol-Commons, Protocol-Commercial, and Agent Cards MUST tell one non-contradictory current-line story.

For current commercial capability:

- Commons defines base action semantics.
- Commercial defines the canonical paid request and receipt contracts.
- Agent Cards SHOULD point directly at the flat v1.1.0 schema URIs published by this repository.

Historical v1.0.0 path teaching MUST NOT be presented as current commercial guidance.

## 9. Conformance

A conformant release MUST satisfy all of the following:

- every declared verb has a request schema and a receipt schema
- every declared verb has valid and invalid examples for both request and receipt artifacts
- every current schema path matches its `$id`
- `manifest.json` and `schemas/v1.1.0/index.json` agree on the current verb set and path inventory
- `npm run validate` passes
- `npm run validate:examples` passes
- `npm run validate:integrity` passes
- `sha256sum -c checksums.txt` passes
- repository metadata does not drift from the published current line
