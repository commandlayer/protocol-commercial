cat > README.md << 'EOF'
# CommandLayer — Protocol Commercial (v1.x)

**Execution and runtime layer for CommandLayer agents.**

This repository contains the **runtime endpoints** for:

- Commons verbs (e.g., `clean`, `parse`, `summarize`, …)
- Commercial verbs (e.g., `verify`, `checkout`, `approve`, …)

It **does not** define canonical schemas (those live in `protocol-commons`).  
It **does not** define identity metadata (that lives in `agent-cards`).

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
├── docs/
│   └── execution-model.md        # (to be written)
│
├── package.json
└── tsconfig.json
