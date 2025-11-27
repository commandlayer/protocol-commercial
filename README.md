# CommandLayer — Protocol Commercial

Execution and economic verbs for the CommandLayer stack.

This repo defines:

- Commercial verb schemas (checkout, verify, etc.)
- Execution contracts for Commons runtimes (clean, parse, summarize)
- Execution contracts for Commercial runtimes
- Examples for commercial verbs (valid / invalid)

It does NOT define:
- Canonical verb language (lives in protocol-commons)
- Agent identity metadata (lives in agent-cards)

# CommandLayer — Protocol Commercial (v1.x)

**Execution and runtime layer for CommandLayer agents.**

This repository contains the runtime endpoints for:

- Commons verbs (e.g., `clean`, `parse`, `summarize`, …)
- Commercial verbs (e.g., `verify`, `checkout`, `approve`, …)

It does **not** define canonical schemas (those live in `protocol-commons`).  
It does **not** define identity metadata (that lives in `agent-cards`).

Instead, this repo implements:

- x402 entrypoints
- request handling and validation
- routing to underlying services
- rate limiting, auth, and monetization hooks (future)
- execution logic for commercial contracts

---

## 📂 Repository Structure (initial skeleton)

```text
protocol-commercial/
│
├── endpoints/
│   ├── commons/
│   │   ├── clean/
│   │   │   ├── handler.ts
│   │   │   └── route.json
│   │   ├── parse/
│   │   │   ├── handler.ts
│   │   │   └── route.json
│   │   └── summarize/
│   │       ├── handler.ts
│   │       └── route.json
│   │
│   └── commercial/
│       ├── verify/
│       │   ├── handler.ts
│       │   └── route.json
│       └── checkout/
│           ├── handler.ts
│           └── route.json
│
├── schemas/
│   └── v1.0.0/
│       └── commercial/
│           ├── verify/
│           │   ├── requests/verify.request.schema.json
│           │   └── receipts/verify.receipt.schema.json
│           └── checkout/
│               ├── requests/checkout.request.schema.json
│               └── receipts/checkout.receipt.schema.json
│
│
├── package.json
└── tsconfig.json
```
---
## 🧩 Relationship to Other Repos

protocol-commons — canonical verb + schema layer (MIT, no runtime)

agent-cards — identity + discovery layer (Apache-2.0, all agents)

protocol-commercial — this repo: execution layer for Commons + commercial verbs

Rules:

Commons schemas live only in protocol-commons.

Commercial schemas live only in protocol-commercial.

All agents (commons + commercial) are described in agent-cards.

----

## 🚦 Status

This repo is currently a skeleton for v1.x:

Folder layout established

Initial endpoint stubs created

Commercial schema locations reserved (no final contracts yet)

Execution semantics and commercial contracts will be layered in incrementally.
```

### `package.json`

```bash
cat > package.json << 'EOF'
{
  "name": "@commandlayer/protocol-commercial",
  "version": "0.1.0",
  "description": "Execution and runtime layer for CommandLayer agents (commons + commercial).",
  "license": "MIT",
  "type": "module",
  "scripts": {
    "build": "echo \"TODO: wire build pipeline\"",
    "lint": "echo \"TODO: add linting\"",
    "test": "echo \"TODO: add tests\""
  },
  "dependencies": {},
  "devDependencies": {}
}
EOF
```
tsconfig.json
```
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "noEmit": true
  },
  "include": [
    "endpoints/**/*.ts"
  ]
}
EOF
```











>>>>>>> 007633e9d6e86c61ff9853105ab46f33cdc90dfd
