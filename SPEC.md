# SPEC — Protocol-Commercial v1.1.0

This document is normative for the current line, `v1.1.0`.

## 1. Scope

Protocol-Commercial v1.1.0 defines the canonical commercial contracts that extend Protocol-Commons v1.1.0.

This repository governs:

- request and receipt schema identities
- field-level commercial semantics
- actor grammar
- x402 grammar
- validation and drift-detection rules
- release metadata, checksums, and content-addressing truth

This repository does not govern runtime transport implementation, fraud policy, legal adjudication, or provider-specific business logic.

## 2. Normative artifact set

The current release surface is:

- `schemas/v1.1.0/`
- `examples/v1.1.0/`
- `manifest.json`
- `package.json`
- release-defining root documentation included in the checksum scope

The retained superseded line is:

- `schemas/v1.0.0/`
- `examples/v1.0.0/`

## 3. Identity and version rules

1. Every current-line schema MUST use a stable `$id` under `https://commandlayer.org/schemas/v1.1.0/...`.
2. Schema file paths and `$id` values MUST match exactly.
3. Current-line schemas MUST remain flat and self-contained.
4. Meaning-changing edits require a new version line.
5. `manifest.json` MUST identify the current line, retained legacy lines, checksum scope, and release CID values.
6. `checksums.txt` MUST cover the declared checksum scope exactly.

## 4. Flat-schema drift rule

Protocol-Commercial v1.1.0 duplicates shared structures intentionally.

That duplication is only conformant if validation prevents silent drift in the current line. At minimum, validation MUST detect drift in:

- `actor.role`
- `actor.kind`
- `reference.type`
- `money.amount`
- `money.currency`
- duplicated settlement and x402 proof structures that are expected to remain identical

## 5. Actor grammar

The governed current-line actor roles are:

- `payer`
- `payee`
- `merchant`
- `provider`
- `carrier`
- `verifier`

Property-level role semantics are normative. For example:

- a `payer` field MUST contain an actor with `role = payer`
- a `merchant` field MUST contain an actor with `role = merchant`
- a `carrier` field MUST contain an actor with `role = carrier`
- a `verifier` field MUST contain an actor with `role = verifier`

## 6. x402 grammar

Protocol-Commercial v1.1.0 is x402-first and uses three governed payment stages:

1. `payment_requirement`: pre-payment terms
2. `payment_session`: live payment-session state
3. `payment_proof`: final settlement evidence

Normative implications:

- requests SHOULD reference the payment stage appropriate to their contract position
- receipts MUST capture the final commercial outcome rather than provider trace exhaust
- captured payment outcomes MUST carry final x402 evidence when the verb settles value directly

## 7. Receipt outcome model

Receipts are canonical commercial truth artifacts.

- `checkout.receipt` and `purchase.receipt` use `captured`, `failed`, and `pending`
- `payment_proof` is required when those receipts report `status = captured`
- non-final or failed outcomes require an explicit `reason`
- `verify.receipt` MUST always identify the `verifier`

## 8. Commercial verb expectations

### 8.1 `authorize`

`authorize` reserves commercial payment authority without implying final settlement.

### 8.2 `checkout`

`checkout` binds order state, itemization, and capture intent to a live x402 session.

### 8.3 `purchase`

`purchase` is a first-class one-step commercial contract. It MUST make the bought items, final amount, and x402 payment context explicit, and it MUST carry final settlement evidence when captured.

### 8.4 `ship`

`ship` is a commercially grounded fulfillment verb. It MUST link fulfillment work to the upstream purchase and settlement context, and stronger fulfillment states MUST carry stronger evidence.

### 8.5 `verify`

`verify` asserts independent verification truth over a targeted commercial artifact and MUST identify the verifying authority.

## 9. Conformance

A conformant release MUST satisfy all of the following:

- every declared verb has request and receipt schemas
- every declared verb has multiple valid and invalid request and receipt examples
- invalid examples each teach a distinct failure mode
- `npm run validate` passes
- checksum verification passes
- manifest metadata matches the current release line and checksum scope
