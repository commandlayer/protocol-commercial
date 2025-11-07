<p align="center">
  <a href="https://www.npmjs.com/package/@commandlayer/sdk">
    <img src="https://img.shields.io/npm/v/@commandlayer/sdk" alt="NPM Version" />
  </a>
  <a href="https://github.com/commandlayer/protocol-commercial/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/commandlayer/protocol-commercial/validate.yml?branch=main" alt="Build Status" />
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-Commercial-red" alt="License: Commercial" />
  </a>
  <a href="https://discord.com/invite/72MaZu7e">
    <img src="https://img.shields.io/badge/Discord-Join-7289da?logo=discord&logoColor=white" alt="Join Discord" />
  </a>
  <a href="https://twitter.com/command_layer">
    <img src="https://img.shields.io/twitter/follow/command_layer?style=social" alt="Twitter Follow" />
  </a>
</p>

# CommandLayer Protocol — Commercial

*Premium verbs for paid integrations (KYC, payments, logistics, auth) built on the CommandLayer protocol. Aligned with x402 and compatible with ERC-8004 discovery.*

This repository provides **commercial** verbs with canonical JSON Schemas for `*.request` and `*.receipt`, plus a single alias per verb. It mirrors the structure of the open **protocol-commons** repo and is intended for closed-source or licensed distribution.

> For the open baseline, see **protocol-commons**: https://github.com/commandlayer/protocol-commons

## 🚧 Status

**v1.0.0 (Candidate)** — Initial 10-verb pack ready for early adopters and integrators.

## 🔗 Scope

Included (v1.0.0):

| Canonical | Alias |
|----------|-------|
| `checkout` | `purchase` |
| `invoice` | `bill` |
| `refund` | `return` |
| `verify` | `validate` |
| `sign` | `endorse` |
| `authorize` | `grant` |
| `authenticate` | `login` |
| `fund` | `deposit` |
| `settle` | `reconcile` |
| `disburse` | `payout` |


Each verb includes:
- `verb.request.schema.json`
- `verb.receipt.schema.json`
- `verb.aliases.json`

## 📁 Repository Structure

```
schemas/
└── v1.0.0/
    └── commercial/
        └── <verb>/
            ├── requests/
            ├── receipts/
            └── aliases/
examples/
└── v1.0.0/
    └── commercial/
        └── <verb>/
            ├── valid/
            └── invalid/
```

## ✅ Local Validation

```bash
npm install
npm run validate:all
```

## 🧩 Interoperability

- A2A and x402 invocation compatible
- Discoverable via ERC-8004 patterns (e.g., ENS records or registry indices)

## 📜 License

**Commercial license.** Distribution and use are restricted. See `LICENSE`. For partnership or OEM terms, contact: **legal@commandlayer.org**.

## 🤝 Notes

Schema evolution follows strict semver and immutability of published tags. Aliases are stable but secondary to canonical verb names.
