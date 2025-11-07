# Publishing & Discovery

- Publish schema JSON to a public registry and pin to IPFS (CIDv1).
- Announce schema URL via ENS TXT (ERC‑8004 compatible).
- Recommended TXT keys:
  - `cl:verb:<name>:request` → https://…/schemas/v1.0.0/commercial/<verb>/requests/<verb>.request.schema.json
  - `cl:verb:<name>:receipt` → https://…/schemas/v1.0.0/commercial/<verb>/receipts/<verb>.receipt.schema.json
- Keep alias lists in Git; publish `aliases.json` alongside.

Example ENS TXT:
```
cl:verb:checkout:request=https://…/checkout.request.schema.json
cl:verb:checkout:receipt=https://…/checkout.receipt.schema.json
```
