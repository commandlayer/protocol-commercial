# Deprecated: CommandLayer Protocol Commercial

This repository is deprecated and should be treated as an archived historical source.

Commercial/payment implementation has moved out of the public protocol surface.

## Current direction

CommandLayer is consolidating around CLAS and verifiable action receipts.

Going forward:

- canonical CLAS/spec work lives in `commandlayer/clas`
- active SDK work lives in `commandlayer/agent-sdk`
- public verification/docs live in `commandlayer/commandlayer-org`
- private commercial/admin/payment/backend work lives in `commandlayer/commercial`

Do not use this repository as the active source of truth for new CommandLayer integrations.

## Why this repo is being archived

Protocol-Commercial originally defined commercial overlays for monetized agent execution, payment-aware requests, settlement-aware receipts, and x402-oriented commercial schema experiments.

That work is no longer part of the public website/schema surface. Commercial execution, payment flows, admin review, checkout/session handling, card publication internals, and future x402 rails now belong in the private `commandlayer/commercial` repo.

This repository is retained only so older references and historical schema work remain understandable.

## Historical scope

This repository previously contained:

- commercial request/receipt schemas
- checkout/purchase/refund-style schema experiments
- settlement-aware receipt language
- commercial overlays on top of older Commons schema work
- release/checksum metadata for the old commercial schema line

New integrations should not build against this repository directly.

## Recommended path

Use the current CommandLayer repos instead:

- CLAS/spec: https://github.com/commandlayer/clas
- Agent SDK: https://github.com/commandlayer/agent-sdk
- Public verifier/docs: https://github.com/commandlayer/commandlayer-org
- VerifyAgent reference: https://github.com/commandlayer/verifyagent

Private commercial backend work remains in `commandlayer/commercial`.

## Status

- Repository status: deprecated / archive candidate
- New development: no
- New integrations: use CLAS + Agent SDK
- Commercial backend: private `commandlayer/commercial`

## License

Apache-2.0.
