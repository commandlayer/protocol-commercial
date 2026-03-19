# SECURITY — Protocol-Commercial

This document defines repository-wide security expectations for Protocol-Commercial releases. The operative release line is `v1.1.0`.

Protocol-Commercial provides schema-level integrity and semantic security properties, not fraud guarantees or payment finality guarantees.

## Repository responsibilities

- tamper-evident versioned artifacts
- deterministic schema identity
- strict validation of canonical request and receipt shapes
- drift detection across duplicated flat definitions
- explicit commercial references for later audit
- content-addressing and checksum publication for the release surface

## Repository non-guarantees

- payment success
- fraud prevention
- merchant solvency
- legal finality
- provider honesty

## Maintainer security expectations

- treat schema, example, checksum, or manifest drift as a security issue
- treat mirror path mismatches as a trust issue
- keep actor semantics and x402 grammar governed across the set
- do not encode runtime debugging exhaust as canonical receipt truth

## Verification commands

```bash
npm run validate
npm run validate:checksums
```

Security contact: `security@commandlayer.org`
