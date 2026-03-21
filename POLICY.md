# POLICY — Protocol-Commercial

This policy governs the active release line and the canonical published package boundary. Repo-wide governance and security reporting are defined separately.

## Current line

`v1.1.0` is the current Protocol-Commercial line and the only canonical published package line.

`v1.0.0` may remain in the repository as historical source material for audit or migration reference, but it is outside the shipped npm package surface and outside the active canonical release boundary.

## Change control

- No published version directory may be silently mutated after release.
- Breaking or semantic changes require a new version directory.
- Release metadata, package contents, schema paths, examples, and checksums must remain internally consistent.
- Public documentation controlled by this repo must teach the same current-line package boundary the repo actually ships.

## Canonical published boundary

The canonical published package surface for `v1.1.0` is limited to:

- `schemas/v1.1.0/`
- `examples/v1.1.0/`
- `manifest.json`
- `checksums.txt`
- `LICENSE`
- `README.md`
- `index.js`

Legacy `v1.0.0` schemas, examples, and any historical TypeScript fixtures are repository-retained material only unless a future release explicitly restores them to a validated package boundary.

## Integrity boundary

`checksums.txt` is the generated ledger for the canonical published package payload, excluding `checksums.txt` itself.

The checksum-covered payload consists of:

- `schemas/v1.1.0/`
- `examples/v1.1.0/`
- `manifest.json`
- `LICENSE`
- `README.md`
- `index.js`

Release-defining prose docs outside that list are repository guidance only and must not be described as part of the shipped or checksum-covered release payload.

## Governance threshold

- Schema fixes before publication require maintainer signoff.
- New verbs or version lines require explicit steward approval.

## Commercial language governance

- Actor roles are governed repo-wide; new roles require explicit steward approval.
- `payment_requirement`, `payment_session`, and `payment_proof` are the canonical payment-layer names for shared semantics.
- `fulfillment_ref` denotes the merchant or provider controlled fulfillment artifact, not a generic external pointer.
- Shipment receipts must remain commercially scoped and tied to an upstream checkout or purchase.
- `requester` is the governed field for the initiator of a `verify.request`; `verifier` is reserved for the authority that issues or attests the verification receipt.
