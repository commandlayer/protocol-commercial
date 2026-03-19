# Protocol-Commercial

Protocol-Commercial v1.1.0 is the normative commercial schema layer for CommandLayer.

It defines the canonical commercial overlays that sit on top of Protocol-Commons v1.1.0. Commons defines base semantic actions. Commercial defines the monetized, settlement-aware request and receipt contracts that agents and runtimes use when value moves.

Commercial is intentionally semantics-only:

- no runtime code
- no provider-specific business policy
- no pricing engine
- no routing logic
- no transport implementation beyond the normative x402 execution assumption

## Release status

- Current line: `v1.1.0`
- Legacy line retained: `v1.0.0` under `schemas/v1.0.0/` and `examples/v1.0.0/`
- Current package entrypoint: `schemas/v1.1.0/index.json`

## Relationship to the stack

| Layer | Responsibility |
| --- | --- |
| Protocol-Commons v1.1.0 | Base semantic action contracts |
| Protocol-Commercial v1.1.0 | Commercial overlays for payment, settlement, fulfillment, and verification |
| Agent Cards v1.1.0 | Identity and discovery bindings to request/receipt schemas |
| Runtime | x402 transport, execution, metering, policy, and provider integration |

## Commercial execution model

Protocol-Commercial is x402-first.

That means the normative commercial assumption is that commercial execution is gated and proven through x402-compatible payment requirements, sessions, authorizations, and proofs. The schemas in this repository do not define a transport implementation, but they do make the commercial contract explicit enough for an x402-aware runtime to execute deterministically.

## Verb set

| Verb | Purpose |
| --- | --- |
| `authorize` | Reserve payment authority before capture or settlement |
| `checkout` | Finalize an order and request commercial capture |
| `purchase` | Complete a one-step paid commercial action |
| `ship` | Attach fulfillment state to a commercial order or purchase |
| `verify` | Verify a commercial receipt, settlement, payment, or shipment target |

## Repository layout

```text
protocol-commercial/
├── schemas/
│   ├── v1.0.0/                     # legacy published line
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
│   ├── v1.0.0/                     # legacy published line
│   └── v1.1.0/commercial/<verb>/{valid,invalid}/
├── manifest.json
├── checksums.txt
└── scripts/
```

Protocol-Commercial v1.1.0 intentionally does **not** use a new `_shared/` tree. Each v1.1.0 request and receipt schema is self-contained, flat, and directly mirrorable on commandlayer.org.

## Scope boundaries

This repository defines:

- canonical request and receipt schema identities
- explicit payment, authorization, settlement, fulfillment, and verification semantics
- x402-facing references required for commercial execution
- deterministic release metadata and checksums

This repository does not define:

- merchant onboarding policy
- fraud decisions
- custody or treasury operations
- legal finality
- provider SLAs
- runtime traces or debugging exhaust as normative truth

## Example schema path

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

## Validation

```bash
npm install
npm run validate
npm run generate:checksums
sha256sum -c checksums.txt
```

`npm run validate` compiles the v1.1.0 schema line, validates all v1.1.0 examples, and checks release metadata for version drift.

## Agent Cards alignment

Agent Cards v1.1.0 can bind directly to these stable mirror paths without shared-fragment discovery:

- `/schemas/v1.1.0/commercial/authorize/authorize.request.schema.json`
- `/schemas/v1.1.0/commercial/authorize/authorize.receipt.schema.json`
- and the equivalent pair for each of the five verbs

That keeps ENS bindings, commandlayer.org mirrors, and card metadata deterministic.

## Integrity

The normative release surface for v1.1.0 is represented by:

- `schemas/v1.1.0/`
- `examples/v1.1.0/`
- `manifest.json`
- `checksums.txt`

After any release mutation, new checksums and new pinned content identifiers are required.
