# RESOLUTION — Protocol-Commercial

This document is a repository-wide resolution record. The operative resolution anchor for the current release is `v1.1.0`.

## Resolution record

### 2026-03-19 — v1.1.0 flat-line resolution

The repository moved from the older v1.0.0 shared-fragment layout to the flat, self-contained `v1.1.0` current line.

This resolution establishes that:

- `v1.1.0` is the current normative release line
- `v1.0.0` is retained only as a published legacy line
- commandlayer.org mirrors and Agent Card bindings must use the flat v1.1.0 request and receipt schema paths
- x402 references are first-class commercial artifacts rather than side metadata
- flat duplicated structures must be validated for drift

## Conflict rule

When docs, examples, manifest metadata, and schemas disagree, the current-line schema files and manifest control the normative interpretation, and the mismatch is release drift until corrected.
