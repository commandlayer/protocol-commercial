# COMPLIANCE — Protocol-Commercial

Compliance requires:

- `$id` matches canonical path + version
- `sha256sum -c checksums.txt` passes
- All examples validate under strict mode

CI MUST run:
`npm run validate`
