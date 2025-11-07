# Security Guidelines

- Require mTLS for inter‑service links.
- Use short‑lived tokens; scope by verb.
- Hash PII at rest where possible.
- Provide `integrity.sha256` on receipts for auditability.
- Log with redaction; never log card/bank secrets.
