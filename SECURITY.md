# SECURITY — Protocol-Commercial

This document applies repo-wide to the security posture of published Protocol-Commercial release lines unless a section states a narrower scope.

Protocol-Commercial provides schema-level security properties, not transaction or fraud guarantees.

## What this repository is responsible for

- tamper-evident versioned artifacts
- deterministic schema identity
- strict validation of canonical request and receipt shapes
- explicit commercial references for later audit
- checksum coverage for the machine-validated current release payloads

## What this repository does not guarantee

- payment success
- fraud prevention
- merchant solvency
- legal finality
- provider honesty
- runtime-side custody, settlement finality, or external mirror availability

## Maintainer security expectations

- treat schema and checksum drift as a security issue
- treat mirror path mismatches as a trust issue
- do not encode runtime-only debugging exhaust as canonical receipt truth
- keep x402 references typed and minimal
- do not let current-line docs teach superseded path models

## Verification summary

For the canonical validation and checksum-boundary rules, see `SPEC.md` and `POLICY.md`.

In practice:

- use `npm run validate:schemas` as the direct schema and metadata drift check
- use `sha256sum -c checksums.txt` only for the checksum-covered machine-artifact surface
- do not describe checksum verification as protecting prose docs outside that boundary

## Contact

Security contact: `dev@commandlayer.org`

PGP: none currently provided for this repository.
