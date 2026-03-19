# Protocol-Commercial

Protocol-Commercial v1.1.0 is the current CommandLayer commercial schema line.

It defines the canonical commercial request and receipt contracts that extend Protocol-Commons v1.1.0. Commons governs base action semantics. Commercial governs the payment-aware overlays that bind those actions to authorization, checkout, purchase, shipment, and verification artifacts.

Protocol-Commercial is intentionally limited to protocol truth:

- no runtime code
- no provider-specific business policy
- no pricing engine
- no routing logic
- no transport implementation beyond the normative x402-first execution assumption

## Document scope

This README is a repo-wide orientation document for the current release line and its retained legacy line.

## Release truth

- **Current canonical line:** `v1.1.0`
- **Current canonical schema root:** `https://commandlayer.org/schemas/v1.1.0/`
- **Current package entrypoint:** `schemas/v1.1.0/index.json`
- **Historical legacy line:** `v1.0.0`, retained under `schemas/v1.0.0/` and `examples/v1.0.0/`

`v1.1.0` is flat. Its canonical schema URIs are the exact file-mirror paths published under `https://commandlayer.org/schemas/v1.1.0/commercial/<verb>/`.

`v1.0.0` is historical only. Its older nested `requests/` and `receipts/` directories remain published for compatibility and audit, not as current teaching.

## Relationship to the stack

| Layer | Current line | Responsibility |
| --- | --- | --- |
| Protocol-Commons | v1.1.0 | Base semantic action contracts |
| Protocol-Commercial | v1.1.0 | Commercial overlays for payment, settlement, fulfillment, and verification |
| Agent Cards | v1.1.0 | Identity and discovery bindings to canonical schema URIs |
| Runtime | implementation-defined | x402 transport, execution, metering, policy, and provider integration |

The stack story is singular:

- Commons defines the base action semantics.
- Commercial defines the monetized request and receipt contracts.
- Agent Cards point directly at the current commercial schema URIs.
- Runtimes execute those contracts but do not redefine them.

## Commercial execution model

Protocol-Commercial is x402-first.

That means commercial execution is expected to be gated and evidenced through x402-compatible payment requirements, sessions, authorizations, and proofs. This repository does not define transport code, but it does define the canonical request and receipt shapes an x402-aware runtime needs in order to execute and later audit a paid interaction deterministically.

## Verb set

| Verb | Purpose | Canonical request schema | Canonical receipt schema |
| --- | --- | --- | --- |
| `authorize` | Reserve payment authority before later capture or settlement | `https://commandlayer.org/schemas/v1.1.0/commercial/authorize/authorize.request.schema.json` | `https://commandlayer.org/schemas/v1.1.0/commercial/authorize/authorize.receipt.schema.json` |
| `checkout` | Finalize an order and request commercial capture | `https://commandlayer.org/schemas/v1.1.0/commercial/checkout/checkout.request.schema.json` | `https://commandlayer.org/schemas/v1.1.0/commercial/checkout/checkout.receipt.schema.json` |
| `purchase` | Complete a one-step paid commercial action | `https://commandlayer.org/schemas/v1.1.0/commercial/purchase/purchase.request.schema.json` | `https://commandlayer.org/schemas/v1.1.0/commercial/purchase/purchase.receipt.schema.json` |
| `ship` | Attach fulfillment state to a commercial order or purchase | `https://commandlayer.org/schemas/v1.1.0/commercial/ship/ship.request.schema.json` | `https://commandlayer.org/schemas/v1.1.0/commercial/ship/ship.receipt.schema.json` |
| `verify` | Verify a commercial receipt, settlement, payment, or shipment target | `https://commandlayer.org/schemas/v1.1.0/commercial/verify/verify.request.schema.json` | `https://commandlayer.org/schemas/v1.1.0/commercial/verify/verify.receipt.schema.json` |

## Repository layout

```text
protocol-commercial/
├── schemas/
│   ├── v1.0.0/                     # published legacy line; historical nested layout
│   └── v1.1.0/
│       ├── index.json
│       └── commercial/
│           ├── authorize/
│           │   ├── authorize.request.schema.json
│           │   └── authorize.receipt.schema.json
│           ├── checkout/
│           │   ├── checkout.request.schema.json
│           │   └── checkout.receipt.schema.json
│           ├── purchase/
│           │   ├── purchase.request.schema.json
│           │   └── purchase.receipt.schema.json
│           ├── ship/
│           │   ├── ship.request.schema.json
│           │   └── ship.receipt.schema.json
│           └── verify/
│               ├── verify.request.schema.json
│               └── verify.receipt.schema.json
├── examples/
│   ├── v1.0.0/                     # published legacy line
│   └── v1.1.0/commercial/<verb>/{valid,invalid}/
├── manifest.json
├── checksums.txt
└── scripts/
```

Protocol-Commercial v1.1.0 does **not** use a current-line `_shared/` tree. Every v1.1.0 request and receipt schema is self-contained, flat, and mirror-safe.

## Scope boundaries

This repository defines:

- canonical request and receipt schema identities
- explicit payment, authorization, settlement, fulfillment, and verification semantics
- x402-facing references required for commercial execution
- release metadata and machine-verifiable checksums for the current artifact set

This repository does not define:

- merchant onboarding policy
- fraud decisions
- custody or treasury operations
- legal finality
- provider SLAs
- runtime traces or debugging exhaust as normative truth

## Example current-line schema pair

- Request: `https://commandlayer.org/schemas/v1.1.0/commercial/checkout/checkout.request.schema.json`
- Receipt: `https://commandlayer.org/schemas/v1.1.0/commercial/checkout/checkout.receipt.schema.json`

## Example request artifact

```json
{
  "protocol": "commercial",
  "version": "1.1.0",
  "verb": "checkout",
  "request_id": "checkoutreq-001",
  "requested_at": "2026-03-19T10:05:00Z",
  "payer": { "role": "payer", "id": "buyer-001", "kind": "account" },
  "merchant": { "role": "merchant", "id": "merchant.example", "kind": "organization" },
  "order_ref": { "type": "order", "id": "ord-1001" },
  "items": [
    {
      "sku": "sku-pro-plan",
      "description": "Protocol Pro Plan",
      "quantity": 1,
      "unit_price": { "amount": "49.99", "currency": "USDC", "decimals": 2 }
    }
  ],
  "amount_breakdown": {
    "subtotal": { "amount": "49.99", "currency": "USDC", "decimals": 2 },
    "total": { "amount": "49.99", "currency": "USDC", "decimals": 2 }
  },
  "capture": "immediate",
  "payment_session": {
    "scheme": "x402",
    "session_id": "x402-session-001",
    "resource": "https://merchant.example/x402/sessions/x402-session-001"
  },
  "fulfillment_intent": { "mode": "digital", "destination_ref": "acct-buyer-001" }
}
```

## Validation and integrity

```bash
npm install
npm run validate
npm run validate:examples
npm run validate:integrity
npm run generate:checksums
sha256sum -c checksums.txt
```

- `npm run validate` checks current-line metadata, schema identity, layout, and release integrity expectations.
- `npm run validate:examples` validates every current-line valid and invalid example against the canonical schemas.
- `npm run validate:integrity` verifies the checksum file scope and hash coverage for the current release artifact set.
- `checksums.txt` intentionally covers machine-validated release payloads only: `manifest.json`, `schemas/v1.1.0/index.json`, `schemas/v1.1.0/`, and `examples/v1.1.0/`.

## Agent Cards and Commons alignment

Agent Cards v1.1.0 should bind directly to the current flat commercial schema URIs published by this repository. They should not point at the historical v1.0.0 `requests/` or `receipts/` paths when declaring current-line commercial capability.

Protocol-Commons and Protocol-Commercial therefore tell one coherent story:

- Commons defines the action semantics.
- Commercial refines those semantics into paid request and receipt contracts.
- Agent Cards publish direct bindings to the exact current `$id` values.

## Legacy handling rule

Legacy references may be retained for compatibility, audit, and migration notes. They are never the canonical path model for `v1.1.0`.
