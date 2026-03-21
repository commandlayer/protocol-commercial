# SPEC — Protocol-Commercial v1.1.0

This document is normative for the active v1.1.0 commercial release line.

## 1. Scope

Protocol-Commercial v1.1.0 defines the canonical commercial contracts that extend Protocol-Commons v1.1.0.

This specification governs:

- request schema identities
- receipt schema identities
- field-level commercial semantics
- deterministic versioning rules
- x402-first commercial binding expectations
- validation and integrity requirements
- canonical published package boundary requirements

This specification does not govern runtime transport implementation, provider policy, or legal adjudication.

## 2. Canonical release boundary

The canonical published package line is `v1.1.0` only.

Canonical published package contents:

- `schemas/v1.1.0/`
- `examples/v1.1.0/`
- `manifest.json`
- `checksums.txt`
- `LICENSE`
- `README.md`
- `index.js`

Checksum-covered published payload:

- `schemas/v1.1.0/`
- `examples/v1.1.0/`
- `manifest.json`
- `LICENSE`
- `README.md`
- `index.js`

`checksums.txt` is the generated hash ledger describing that checksum-covered payload and is therefore not itself part of the hashed payload.

Historical repository-only material that is outside the canonical shipped package boundary:

- `schemas/v1.0.0/`
- `examples/v1.0.0/`

Additional prose docs may remain authoritative for interpretation or process inside the repository, but they are outside the published package surface unless package metadata is changed deliberately in a later release.

## 3. Version and identity rules

1. Every v1.1.0 schema MUST use a stable `$id` under `https://commandlayer.org/schemas/v1.1.0/...`.
2. The `commandlayer.org` namespace is canonical, but this repository is the source of truth for the corresponding schema files and release metadata.
3. Public hosting or mirrors for `commandlayer.org` MAY be unavailable temporarily; that does not change canonical `$id` values or repository-local release contents.
4. A schema file path and its `$id` MUST agree exactly.
5. A v1.1.0 schema MUST NOT be mutated in place after release publication.
6. Breaking or meaning-changing edits require a new version directory.
7. `manifest.json` MUST identify the current release line and any retained repository-only legacy lines.
8. `checksums.txt` MUST enumerate the checksum-covered published payload exactly and MUST NOT be described as protecting files it does not hash.
9. The npm `files` surface and package exports MUST exclude non-canonical legacy lines unless those lines are revalidated and intentionally reintroduced.

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

The older nested `schemas/v1.0.0/commercial/<verb>/{requests,receipts}/...` structure is historical repository material only.

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
- typed references to order, invoice, authorization, fulfillment, payment, settlement, or shipment artifacts
- typed settlement status
- typed verification outcomes

### 5.1 Actor grammar

Protocol-Commercial v1.1.0 uses a compact governed actor grammar:

- `payer` = the party that funds or bears the payment obligation
- `payee` = the settlement recipient when distinct from the merchant
- `merchant` = the commercial principal offering, selling, or fulfilling the order
- `provider` = an optional facilitator executing settlement or fulfillment work for the merchant
- `carrier` = the shipment operator for physical fulfillment
- `verifier` = the authority performing or attesting the verification result

`requester` is a verify-specific initiator field, not a seventh governed actor role. It reuses the general actor identity shape so an existing commercial actor can request verification without expanding the normative role vocabulary.

Actor field names are normative. A field named `merchant` MUST contain an actor whose role is `merchant`, and likewise for the other actor fields.

### 5.2 Payment grammar

Protocol-Commercial v1.1.0 uses one payment language across the family:

- `payment_requirement` = pre-payment terms or authorization preconditions
- `payment_session` = live x402 negotiation/session state
- `payment_proof` = final authorization or settlement evidence

Requests SHOULD carry the earliest payment layer the caller can truthfully provide. Receipts MUST carry the latest payment layer the verb has canonically established. Successful capture receipts for `checkout` and `purchase` MUST carry `payment_proof`. `ship` MUST link to the upstream commercial transaction and MAY carry payment evidence by reference rather than re-embedding settlement state.

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

Historical v1.0.0 path teaching MUST NOT be presented as current commercial guidance or as part of the active shipped package surface.

## 9. Conformance

A conformant release MUST satisfy all of the following:

- every declared verb has a request schema and a receipt schema
- every declared verb has valid and invalid examples for both request and receipt artifacts
- every current schema path matches its `$id`
- `manifest.json` and `schemas/v1.1.0/index.json` agree on the current verb set and path inventory
- the package `files` field matches the canonical published package boundary exactly
- `npm test` passes as the current-line validation aggregate
- `npm run validate:schemas` passes
- `npm run validate:examples` passes
- `npm run validate:integrity` passes
- `sha256sum -c checksums.txt` passes for the checksum-covered published payload
- repository metadata does not drift from the active current line

The canonical command list lives in `README.md#validation-commands`.
