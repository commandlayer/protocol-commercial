# Protocol-Commercial

Protocol-Commercial v1.1.0 is the canonical commercial schema line for CommandLayer.

It defines the payment-aware request and receipt contracts that sit on top of Protocol-Commons v1.1.0. This repository is release material, not a design draft.

## Document scope

This README describes the current Protocol-Commercial line, `v1.1.0`, and the repository-wide release surface that publishes it.

## Current line

- Current line: `v1.1.0`
- Retained legacy line: `v1.0.0`
- Current package entrypoint: `schemas/v1.1.0/index.json`
- Canonical public schema root: `https://commandlayer.org/schemas/v1.1.0/`

## Stack position

| Layer | Responsibility |
| --- | --- |
| Protocol-Commons v1.1.0 | Base semantic action contracts |
| Protocol-Commercial v1.1.0 | Commercial payment, settlement, fulfillment, and verification overlays |
| Agent Cards v1.1.0 | Identity and discovery bindings to the flat commercial schema URIs |
| Runtime | x402 transport, execution, metering, policy, and provider integration |

## Canonical verb set

| Verb | Purpose |
| --- | --- |
| `authorize` | Reserve payment authority before settlement |
| `checkout` | Bind priced order state and request commercial capture |
| `purchase` | Execute a one-step commercial contract with direct settlement evidence |
| `ship` | Bind settled commercial fulfillment work to shipment progress |
| `verify` | Verify commercial payment, settlement, shipment, or receipt truth |

## Actor grammar

Protocol-Commercial v1.1.0 uses one governed actor vocabulary across the current line:

- `payer`: the party funding payment value
- `payee`: the settlement destination for an authorization outcome
- `merchant`: the seller or service principal defining the commercial contract
- `provider`: the execution or fulfillment service acting for the merchant
- `carrier`: the shipment carrier emitting fulfillment transport events
- `verifier`: the authority asserting verification outcomes

Schemas tighten actor-bearing properties so a `payer` field must carry `role = payer`, a `merchant` field must carry `role = merchant`, and so on.

## x402 grammar

Protocol-Commercial v1.1.0 uses one payment evidence model across the current line:

- `payment_requirement`: pre-payment terms used before settlement
- `payment_session`: live x402 session state while settlement is open
- `payment_proof`: final x402 proof used once settlement is captured

The model is parallel across verbs:

- `authorize.request` advertises `payment_requirement`
- `checkout.request` advertises `payment_session`
- `checkout.receipt` and `purchase.receipt` require `payment_proof` when `status = captured`
- `ship` links to upstream `settlement_ref` rather than redefining payment semantics

## Flat architecture

Protocol-Commercial v1.1.0 intentionally uses flat, self-contained schemas.

```text
schemas/v1.1.0/commercial/<verb>/<verb>.request.schema.json
schemas/v1.1.0/commercial/<verb>/<verb>.receipt.schema.json
```

There is no current-line `_shared/` tree. Shared semantics are duplicated intentionally and validated for drift.

## Repository layout

```text
protocol-commercial/
├── schemas/
│   ├── manifest/                    # manifest schema authority
│   ├── v1.0.0/                      # retained legacy line
│   └── v1.1.0/                      # current canonical line
├── examples/
│   ├── v1.0.0/
│   └── v1.1.0/commercial/<verb>/{valid,invalid}/
├── manifest.json
├── checksums.txt
└── scripts/
```

## Integrity scope

The release checksum scope is intentionally broader than machine schemas alone. `checksums.txt` covers:

- `manifest.json`
- `package.json`
- current-line schemas and examples
- release-defining root documentation such as `README.md`, `SPEC.md`, policy docs, and provenance docs

That scope makes public release truth tamper-evident across both machine artifacts and authoritative release text.

## Validation flow

```bash
npm install
npm run validate
npm run generate:checksums
npm run validate:checksums
```

Validation includes:

- manifest validation against `schemas/manifest/manifest.schema.json`
- current-line schema compilation
- drift checks over duplicated flat `$defs`
- valid and invalid example validation
- checksum verification for the published release surface

## Canonical schema paths

- `https://commandlayer.org/schemas/v1.1.0/commercial/authorize/authorize.request.schema.json`
- `https://commandlayer.org/schemas/v1.1.0/commercial/authorize/authorize.receipt.schema.json`
- `https://commandlayer.org/schemas/v1.1.0/commercial/checkout/checkout.request.schema.json`
- `https://commandlayer.org/schemas/v1.1.0/commercial/checkout/checkout.receipt.schema.json`
- `https://commandlayer.org/schemas/v1.1.0/commercial/purchase/purchase.request.schema.json`
- `https://commandlayer.org/schemas/v1.1.0/commercial/purchase/purchase.receipt.schema.json`
- `https://commandlayer.org/schemas/v1.1.0/commercial/ship/ship.request.schema.json`
- `https://commandlayer.org/schemas/v1.1.0/commercial/ship/ship.receipt.schema.json`
- `https://commandlayer.org/schemas/v1.1.0/commercial/verify/verify.request.schema.json`
- `https://commandlayer.org/schemas/v1.1.0/commercial/verify/verify.receipt.schema.json`

## Public alignment rule

Public documentation, Agent Card bindings, and commandlayer.org mirrors must use the flat paths above. Legacy nested or shared-fragment teaching is non-canonical for the current line.
