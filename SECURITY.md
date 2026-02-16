# SECURITY — Protocol-Commercial

Economic semantics must be **verifiable and tamper-evident**.

## Baseline requirements

- strict schema validation
- deterministic `$id` values + checksums
- traceable envelopes + receipts
- runtime enforcement compatibility

## Integrity checks

```bash
npm run validate
sha256sum -c checksums.txt
```

Security contact: `security@commandlayer.org`
