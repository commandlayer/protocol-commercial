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
## CommandLayer Protocol Stack

| Layer               | Role                                                              |
|---------------------|-------------------------------------------------------------------|
| Protocol-Commons    | Canonical verbs & schemas (machine intent grammar)                |
| Agent-Cards         | Identity, discovery, and invocation metadata                      |
| Protocol-Commercial | Canonical commercial/economic verbs (schemas & receipt defaults)  |
| Protocol-Runtime    | Transport adapters, execution, and structured receipts            |


- **Schemas = roads**
- **Runtime = toll booths**

## What this repo defines

| Component        | Purpose                                  |
| ---------------- | ---------------------------------------- |
| Commercial verbs | Price discovery, fulfillment, settlement |
| Request schemas  | payment instructions, billing metadata   |
| Receipt schemas  | settlement proof, economic finality      |
| Example fixtures | validation & auditability                |
| Governance docs  | mutation + deprecation log               |


These schemas are:

- runtime-agnostic
- chain-agnostic
- payment-rail-agnostic (stablecoin, credit rails, L2, etc.)

## What this repo does **not** define

This repository is **semantics only**. It does **not** define:

- auth or quotas  
- pricing logic  
- routing decisions  
- provider selection  
- x402 endpoints  

Those are **Runtime** concerns.

**Commercial** defines the rules of value exchange —  
not who gets paid, on which infra, or under what business model.


## Commercial Verbs (draft categories)
| Category        | Verbs                 | Purpose                             |
| --------------- | --------------------- | ----------------------------------- |
| Offers / Quotes | `quote`, `offer`      | Price discovery & negotiation       |
| Payments        | `pay`, `charge`       | Settle accounts                     |
| Commerce        | `checkout`, `refund`  | Purchases & reversals               |
| Access          | `subscribe`, `unlock` | Time-bound or recurring rights      |
| Risk & Trust    | `verify`, `approve`   | Policy validation & fraud reduction |

Final v1.0.0 set will be **locked via governance.**

## Schema Contract

Commercial and Commons share strict JSON Schema rules:
| Feature                      | Guarantee                            |
| ---------------------------- | ------------------------------------ |
| Typed requests & receipts    | Canonical envelope for all runtimes  |
| Deterministic `$id`          | Version immutability                 |
| No silent mutation           | All changes logged + re-CID required |
| Valid + invalid test vectors | Reproducibility                      |

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

When v1.0.0 is published, it becomes normative:
```
schemas/v1.0.0/commercial/<verb>/
```
After that:
- Any mutation → new version
- All files → new CID + checksums
- ENS binds versioned schemas only

No breaking changes allowed in-place.
No schema drift tolerated.

## Integrity (Pre-Release Notice)

The integrity block will be installed at **v1.0.0 lock-in**:

 **Integrity Notice — Protocol-Commercial v1.0.0**  

> Canonical schemas will be pinned and immutable:  
> `schemas/v1.0.0/` — CID:  
> `TBD` — **not yet normative**
>
> Verify integrity locally:
>
> ```bash
> sha256sum -c checksums.txt
> ```
>
> **Mismatch = untrusted artifact.**

Until locked:

- CIDs are **unstable**
- `checksums.txt` is **non-normative**






## ENS TXT — Discovery Rules

Commercial TXT keys are **optional** until Runtime v1.0.0.
Once locked, keys follow the same schema as Commons + Agent-Cards:
| TXT Key                      | Purpose                      | Required at v1.0.0 |
| ---------------------------- | ---------------------------- | ------------------ |
| `cl.verb`                    | Primary verb name            | Yes                |
| `cl.version`                 | Card/schema version          | Yes                |
| `cl.cid.schemas`             | Commercial schemas CID       | Yes                |
| `cl.schema.request`          | Canonical request schema URI | Yes                |
| `cl.schema.receipt`          | Canonical receipt schema URI | Yes                |
| `cl.checksum.schema.request` | SHA-256 of request schema    | Yes                |
| `cl.checksum.schema.receipt` | SHA-256 of receipt schema    | Yes                |
| `cl.agentcard`               | Binding to identity          | Optional           |
| `cl.owner`                   | Steward ENS name             | Yes                |




## Validation
Strict JSON Schema validation:
```
npm install
npm run validate
```
Runs
- schema validation
- example fixtures
- integrity rules

Any failure = **non-compliant.**

## License

**Apache-2.0**

- Schemas remain open and neutral
- Value creation happens only when agents execute

## Next Layer — Protocol-Runtime

Where execution becomes value.

The Runtime enforces **economic contracts** defined by Commercial,
and produces **verifiable settlement receipts**.

### Runtime responsibilities

- Execute x402 entrypoints for every agent
- Meter usage — compute time, tokens, or call counts
- Gate access — auth, quotas, risk checks
- Settle value — stablecoins, credits, cross-vendor routing
- Issue auditable receipts — typed, traceable, final
- Monitor health & compliance — tracing + analytics

Runtime **imports and enforces**:

- `@commandlayer/commons` — semantic validation  
- `@commandlayer/protocol-commercial` — economic semantics  
- `@commandlayer/agent-cards` — identity + routing  

> **Schemas stay free — Runtime is the toll road for autonomous agents.**

---

### Status

- **Pre-v1.0.0**
- Architecture + boundaries defined
- Economic verbs in-flight (unstable surface)
- **No CID lock** until schema freeze
- Breaking changes expected

Runtime targeting: **alpha after Commercial v1.0.0 lock**

## References

- [Protocol-Commons — Semantic verbs & schemas](https://github.com/commandlayer/protocol-commons)
- [Agent-Cards — Identity & discovery](https://github.com/commandlayer/agent-cards)
- [x402 — Machine-to-Machine Value Transport](https://github.com/ethereum/x402)
- [ERC-8004 — Schema Discovery via ENS](https://eips.ethereum.org/EIPS/eip-8004)
- [JSON Schema 2020-12 — Canonical validation standard](https://json-schema.org/specification-links)







