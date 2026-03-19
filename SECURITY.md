# SECURITY — Protocol-Commercial

## Document scope

This document is repo-wide and describes the security properties the repository actually enforces.

Protocol-Commercial provides schema-level security properties, not transaction, fraud, or legal guarantees.

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

## Verification commands

```bash
npm run validate
npm run validate:examples
npm run validate:integrity
sha256sum -c checksums.txt
```

Security contact: `security@commandlayer.org`
