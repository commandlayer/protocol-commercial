# Receipts

- Every Commercial verb must emit a receipt on success.
- Must include: `id`, `status`, `timestamp`, `integrity.sha256`.
- Include **references** to upstream artifacts (invoice id, payment id, carrier id).
- Redact PII/secrets; provide stable public fields for verification.
