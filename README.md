# CommandLayer Protocol — Commercial

**Canonical economic verbs & schemas for autonomous agents.**  
**Commercial semantics are free — value lives in execution.**

<div align="center">
  <a href="#"><img alt="Stability" src="https://img.shields.io/badge/Status-Pre--v1.0.0-inactive"/></a>
  <a href="#"><img alt="NPM Version" src="https://img.shields.io/npm/v/@commandlayer/protocol-commercial?color=brightgreen"/></a>
  <a href="https://github.com/commandlayer/protocol-commercial/actions/workflows/validate.yml">
    <img alt="CI Status" src="https://github.com/commandlayer/protocol-commercial/actions/workflows/validate.yml/badge.svg?branch=main"/>
  </a>
  <a href="./LICENSE">
    <img alt="License" src="https://img.shields.io/badge/License-Apache--2.0-blue.svg"/>
  </a>
</div>

---

## Why this exists

Commons gives agents a **shared language of actions** (analyze, summarize, fetch, …).

Commercial verbs answer a different question:

> **“How does value move when these actions are monetized?”**

`protocol-commercial` defines **canonical economic verb schemas** so that:

- payment, billing, and settlement are consistent across vendors  
- receipts for paid work are **typed and auditable**  
- runtimes and marketplaces interoperate instead of inventing their own silos  

This repo is **semantics-only**:

- **Schemas are always free**  
- **No auth**, **no pricing**, **no routing**  
- **Execution lives in protocol-runtime**

---

## Relationship to the other repos

Commercial sits between semantics and execution:

```text
+-----------------------------+
|  Protocol-Runtime           |  execution, metering, paywalls
+-------------▲---------------+
              |
              v
+-----------------------------+
|  Protocol-Commercial        |  economic verbs + schemas
+-------------▲---------------+
              |
              v
+-----------------------------+
|  Protocol-Commons           |  core verbs + schemas
+-----------------------------+
              |
              v
+-----------------------------+
|  Agent-Cards                |  identity + discovery
+-----------------------------+
```
## Stack summary

| Layer               | Role                                                    |
| ------------------- | ------------------------------------------------------- |
| Protocol-Commons    | Canonical non-economic verbs & schemas                  |
| Protocol-Commercial | Canonical **economic** verbs & schemas                  |
| Agent-Cards         | Identity, discovery, and invocation metadata            |
| Protocol-Runtime    | Execution, x402 adapters, auth, and paywalled endpoints |

- **Schemas = roads**
- **Runtime = toll booths**

## What this repo defines

Canonical economic contracts for agents:
- Commercial verbs: checkout, verify, pay, refund, subscribe, …
- JSON Schemas:
    - requests/*.schema.json
    - receipts/*.schema.json

- Valid + invalid examples
- Immutable release policy

These schemas are:

- runtime-agnostic
- network-agnostic
- payment-rail-agnostic (stablecoins, L2s, fiat rails, …)

## What this repo does not define

To keep boundaries clean, protocol-commercial excludes:

- x402 endpoint definitions
- pricing logic
- auth and quotas
- routing and provider selection
- proprietary extensions

Those belong in **protocol-runtime.**

## Commercial Verbs (conceptual)
Final v1.0.0 set will be locked via governance, but categories:

| Category      | Verbs                 | Purpose                         |
| ------------- | --------------------- | ------------------------------- |
| Offers/Quotes | `quote`, `offer`      | Price discovery                 |
| Payments      | `pay`, `charge`       | Sending value / account debits  |
| Commerce      | `checkout`, `refund`  | Purchases and reversals         |
| Access        | `subscribe`, `unlock` | Time-bound and recurring access |
| Risk & Trust  | `verify`, `approve`   | Policy + trust gates            |

Each verb has:

- canonical **request schema**
- canonical **receipt schema**
- deterministic semantics

## Repository Structure
```
protocol-commercial/
├── schemas/
│   └── v1.0.0/
│       └── commercial/
│           └── <verb>/
│               ├── requests/<verb>.request.schema.json
│               └── receipts/<verb>.receipt.schema.json
│
├── examples/
│   └── v1.0.0/commercial/<verb>/
│       ├── valid/*.json
│       └── invalid/*.json
│
├── checksums.txt
├── manifest.json
├── SPEC.md
├── POLICY.md
├── GOVERNANCE.md
├── SECURITY.md
├── SECURITY_PROVENANCE.md
├── RESOLUTION.md
├── ONBOARDING.md
├── package.json
└── README.md
```

## Versioning & Immutability

Identical to Commons rules:
- Versioned folders like:
```
schemas/v1.0.0/commercial/<verb>/
```
- No silent updates
- Semantic changes → new version + new CID
- All changes logged in RESOLUTION.md
- v1.0.0 CID + checksums become normative after release.

## Immutability
Once live:
```
sha256sum -c checksums.txt
```
Mismatch = **untrusted artifact.**

## Validation
Strict JSON Schema validation:
```
npm install
npm run validate:schemas
npm run validate:examples
npm run validate
```
Runtime operators **must** validate both request AND receipt.

## License

**Apache-2.0**

- Schemas remain open and neutral
- Value creation happens only when agents execute

## Next layer: protocol-runtime

Runtime executes economic contracts:

- x402 entry points
- metering + quotas
- auth + policy gates
- settlement + routing
- pricing + credits
- observability + tracing

It imports:

- @commandlayer/commons
- @commandlayer/protocol-commercial
- @commandlayer/agent-cards

## Status

Pre-v1.0.0

Structure complete
Economic surface in design
No CID lock yet
Breaking changes expected until v1.0.0 tags.

## References

CommandLayer Protocol — Commons
Agent Cards — CommandLayer
ERC-8004 — Agent Schema Discovery
x402 — Machine-to-Machine Value Transport
JSON Schema 2020-12







