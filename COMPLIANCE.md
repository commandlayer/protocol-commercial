# COMPLIANCE — Protocol-Commercial

Compliance requires:

- `$id` matches canonical path + version
- `sha256sum -c checksums.txt` passes
- All examples validate under strict mode

## Required CI checks

CI MUST run:

```bash
npm run validate
```

## Suggested local validation flow

```bash
npm install
npm run validate
sha256sum -c checksums.txt
```
