# POLICY — Protocol-Commercial

This policy governs the current release line and its release-management rules. Repo-wide governance and security reporting are defined separately.

## Current line

`v1.1.0` is the current Protocol-Commercial line.

`v1.0.0` remains published for backward compatibility and audit, but it is superseded and non-canonical for new integrations.

## Change control

- No published version directory may be silently mutated after release.
- Breaking or semantic changes require a new version directory.
- Release metadata, examples, schema paths, and checksums must remain internally consistent.
- Public documentation controlled by this repo must teach the same path model the repo actually ships.

## Normative artifact state

The checksum-covered release state consists of the current schema tree, current examples tree, and `manifest.json`. `checksums.txt` is the generated ledger for that machine-artifact set.

Release-defining prose docs may govern interpretation and process, but they are outside checksum coverage unless the checksum tooling is changed deliberately.

## Governance threshold

- Schema fixes before publication require maintainer signoff.
- New verbs or version lines require explicit steward approval.

## Commercial language governance

- Actor roles are governed repo-wide; new roles require explicit steward approval.
- `payment_requirement`, `payment_session`, and `payment_proof` are the canonical payment-layer names for shared semantics.
- `fulfillment_ref` denotes the merchant or provider controlled fulfillment artifact, not a generic external pointer.
- Shipment receipts must remain commercially scoped and tied to an upstream checkout or purchase.
- `requester` is the governed field for the initiator of a `verify.request`; `verifier` is reserved for the authority that issues or attests the verification receipt.
