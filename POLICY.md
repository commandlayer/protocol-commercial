# POLICY — Protocol-Commercial

## Current line

`v1.1.0` is the current Protocol-Commercial line.

`v1.0.0` remains published for backward compatibility but is superseded.

## Change control

- No published version directory may be silently mutated after release.
- Breaking or semantic changes require a new version directory.
- Release metadata, examples, schema paths, and checksums must remain internally consistent.

## Normative artifact state

The normative release state consists of the current schema tree, current examples tree, `manifest.json`, and `checksums.txt`.

## Governance threshold

- Schema fixes before publication require maintainer signoff.
- New verbs or version lines require explicit steward approval.

## Commercial language governance

- Actor roles are governed repo-wide; new roles require explicit steward approval.
- `payment_requirement`, `payment_session`, and `payment_proof` are the canonical payment-layer names for shared semantics.
- `fulfillment_ref` denotes the merchant or provider controlled fulfillment artifact, not a generic external pointer.
- Shipment receipts must remain commercially scoped and tied to an upstream checkout or purchase.
