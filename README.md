# Protocol-Commercial

Protocol-Commercial v1.1.0 is the current CommandLayer commercial schema line.

This README describes the current v1.1.0 release line and its release packaging surface. Repo-wide governance, security posture, and checksum-boundary provenance live in the dedicated meta docs.

It defines the canonical commercial overlays that sit on top of Protocol-Commons v1.1.0. Commons defines base semantic actions. Commercial defines the monetized, settlement-aware request and receipt contracts that agents and runtimes use when value moves.

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
- **Release note draft for GitHub Releases:** `releases/v1.1.0.md`

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

## Integrator quickstart

For consumers who need the shortest safe path:

1. Install the package and import the current index entrypoint.
   ```bash
   npm install @commandlayer/commercial
   ```
   ```js
   import commercialIndex from '@commandlayer/commercial';
   ```
2. Treat `schemas/v1.1.0/index.json` as the authoritative map of current schemas and verb inventory.
3. Prefer `schemas/v1.1.0/commercial/<verb>/<verb>.request.schema.json` and `...receipt.schema.json` directly for validator configuration.
4. Verify the machine-artifact set before mirroring or vendoring:
   ```bash
   npm run validate:integrity
   sha256sum -c checksums.txt
   ```
5. Ignore `v1.0.0` unless you are maintaining compatibility with historical nested paths.
6. Treat schemas and `manifest.json` as normative machine artifacts. Treat examples as illustrative conformance fixtures. Treat prose docs as normative interpretation and release-process guidance.

A longer external-consumer workflow lives in `INTEGRATOR.md`.

## Commercial execution model

Protocol-Commercial is x402-first.

That means commercial execution is expected to be gated and evidenced through x402-compatible payment requirements, sessions, authorizations, and proofs. This repository does not define transport code, but it does define the canonical request and receipt shapes an x402-aware runtime needs in order to execute and later audit a paid interaction deterministically.

## Commercial grammar decisions

### Actor grammar

Protocol-Commercial uses a compact actor model:

- `payer`: the party funding or bearing the commercial obligation
- `payee`: the settlement recipient when it differs from the merchant identity
- `merchant`: the seller or commercial principal governing the offer, order, or fulfillment
- `provider`: an optional facilitating runtime or service performing settlement or fulfillment work on the merchant
- `carrier`: the shipment operator once physical fulfillment exists
- `verifier`: the authority performing or attesting the verification result

`requester` is a verify-specific initiator field, not a seventh governed actor role. It reuses the general actor identity shape so a payer, merchant, provider, verifier, or other documented commercial party can ask for verification without expanding the normative role vocabulary.

Field names are normative. A `merchant` field MUST carry a `merchant` actor, a `payer` field MUST carry a `payer` actor, and so on. `payee` is used only for settlement destination semantics; if omitted, the merchant is implicitly the payee.

### x402 / payment grammar

Protocol-Commercial standardizes three payment layers across the verb family:

- `payment_requirement`: pre-payment terms or authorization preconditions
- `payment_session`: live x402 negotiation/session state
- `payment_proof`: final payment evidence for authorization or captured settlement

The verbs use those layers intentionally:

- `authorize` centers on `payment_requirement` and may emit authorization-flavored `payment_proof`
- `checkout` centers on `payment_session` and requires `payment_proof` when capture succeeds
- `purchase` accepts direct `payment_input` and requires `payment_proof` when capture succeeds
- `ship` links to upstream commercial settlement through `commercial_ref` and optional `payment_ref`, rather than restating the full payment flow
- `verify` verifies `payment_proof`, settlement, fulfillment, and receipt evidence

## Verb set

| Verb | Purpose | Teaching note |
| --- | --- | --- |
| `authorize` | Reserve payment authority before capture or settlement | Teaches pre-capture approval, denial, and authorization evidence |
| `checkout` | Finalize an order and request commercial capture | Teaches negotiated session state, amount binding, and settlement outcomes |
| `purchase` | Complete a one-step paid commercial action | Teaches direct payment input without a separate checkout negotiation round |
| `ship` | Advance commercial fulfillment state for a settled checkout or purchase | Teaches how fulfillment references upstream commercial settlement without replaying payment semantics |
| `verify` | Verify a commercial receipt, settlement, payment, or shipment target | Teaches evidence-based attestation and inconclusive vs failed outcomes |

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
├── INTEGRATOR.md
└── scripts/
```

Protocol-Commercial v1.1.0 does **not** use a current-line `_shared/` tree. Every v1.1.0 request and receipt schema is self-contained, flat, and mirror-safe.

Current-line example governance is equally explicit:

- `valid/` contains illustrative conforming request and receipt fixtures.
- `invalid/` contains isolated negative fixtures intended to fail validation cleanly.
- No `examples/v1.1.0/**/ts/` tree is currently part of the public release surface.

## Scope boundaries

This repository defines:

- canonical request and receipt schema identities
- explicit payment, authorization, settlement, fulfillment, and verification semantics
- x402-facing references required for commercial execution
- deterministic release metadata and machine-artifact checksums

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
  "payee": { "role": "payee", "id": "merchant-settlement", "kind": "wallet" },
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
npm run validate:schemas
npm run validate:examples
npm run validate:integrity
npm run generate:checksums
sha256sum -c checksums.txt
```

- `npm run validate` runs the full validation suite for the current release line.
- `npm run validate:schemas` checks current-line metadata, schema identity, layout, and manifest/index alignment expectations.
- `npm run validate:examples` validates every current-line JSON valid and invalid example against the canonical schemas.
- `npm run validate:integrity` verifies the checksum file scope and hash coverage for the current release artifact set.
- `checksums.txt` intentionally covers machine-validated release payloads only: `manifest.json`, `schemas/v1.1.0/index.json`, `schemas/v1.1.0/`, and `examples/v1.1.0/`.

## Agent Cards and Commons alignment

Agent Cards v1.1.0 should bind directly to the current flat commercial schema URIs published by this repository. They should not point at the historical v1.0.0 `requests/` or `receipts/` paths when declaring current-line commercial capability.

Protocol-Commons and Protocol-Commercial therefore tell one coherent story:

- Commons defines base actions.
- Commercial defines monetized overlays.
- Agent Cards point at the current flat commercial schema paths.
- Legacy nested v1.0.0 paths remain published only for compatibility.

## Checksum boundary and provenance summary

The v1.1.0 checksum-covered machine-artifact set is intentionally limited to:

- `schemas/v1.1.0/`
- `examples/v1.1.0/`
- `manifest.json`

`checksums.txt` is the generated hash ledger for that machine-artifact set; it describes that surface but is not itself part of the hashed payload. Release-defining prose docs such as `README.md`, `SPEC.md`, `POLICY.md`, `SECURITY_PROVENANCE.md`, `INTEGRATOR.md`, and `ONBOARDING.md` are authoritative guidance, but they are outside the checksum surface unless the tooling is expanded deliberately in a later release.

For external verification, the minimal path is:

1. Install or vendor the package.
2. Inspect `manifest.json` to confirm the current line is `v1.1.0`.
3. Validate checksum coverage with `npm run validate:integrity`.
4. Verify local file hashes with `sha256sum -c checksums.txt`.
5. Load `schemas/v1.1.0/index.json` and bind validators from the listed request and receipt schema paths.
6. Ignore `v1.0.0` unless compatibility requires the historical line.
