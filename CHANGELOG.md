# CHANGELOG — Protocol-Commercial

## v1.1.0

Repository-validated current release line for final Commons-style publication.

### Added

- added flat per-verb request and receipt schemas under `schemas/v1.1.0/` for `authorize`, `checkout`, `purchase`, `ship`, and `verify`
- added current-line valid and invalid conformance fixtures under `examples/v1.1.0/`
- added package manifest, checksum ledger, and integrity tooling for the v1.1.0 shipped boundary
- added explicit governed actor grammar for `payer`, `payee`, `merchant`, `provider`, `carrier`, and `verifier`
- added explicit x402 payment grammar covering `payment_requirement`, `payment_session`, `payment_input`, and `payment_proof`

### Changed

- changed the current line from the historical nested path model to a flat self-contained schema layout
- changed schema identities and package exports to point directly at the v1.1.0 canonical paths
- changed commercial receipts to normalize actor, reference, settlement, and verification semantics across verbs
- changed release metadata to describe v1.1.0 as the current repository-validated line while keeping publication claims declarative
- changed checksum validation to cover the shipped payload boundary excluding `checksums.txt` itself

### Removed

- removed current-line dependency on the legacy `schemas/v1.0.0/_shared/` tree
- removed v1.0.0 from the shipped package surface while retaining it in-repository as historical source material

## v1.0.0

Initial release.

- published the original commercial schema and example surface
- used the historical nested `requests/` and `receipts/` path model retained for compatibility
