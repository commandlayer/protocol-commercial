# SECURITY — Protocol-Commercial

Protocol-Commercial provides schema-level security properties, not transaction or fraud guarantees.

## What this repository is responsible for

- tamper-evident versioned artifacts
- deterministic schema identity
- strict validation of canonical request and receipt shapes
- explicit commercial references for later audit

## What this repository does not guarantee

- payment success
- fraud prevention
- merchant solvency
- legal finality
- provider honesty

## Maintainer security expectations

- treat schema and checksum drift as a security issue
- treat mirror path mismatches as a trust issue
- do not encode runtime-only debugging exhaust as canonical receipt truth
- keep x402 references typed and minimal

## Verification commands

```bash
npm run validate
sha256sum -c checksums.txt
```

Security contact: `security@commandlayer.org`
