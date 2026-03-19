# POLICY — Protocol-Commercial

## Document scope

This policy is repo-wide and version-independent unless it names a specific release line.

## Current line

`v1.1.0` is the current Protocol-Commercial line.

`v1.0.0` remains published for backward compatibility and audit, but it is superseded and non-canonical for new integrations.

## Change control

- No published version directory may be silently mutated after release.
- Breaking or semantic changes require a new version directory.
- Release metadata, examples, schema paths, and checksums must remain internally consistent.
- Public documentation controlled by this repo must teach the same path model the repo actually ships.

## Normative artifact state

The machine-verifiable release state consists of the current schema tree, current examples tree, `manifest.json`, and `checksums.txt`.

Human-readable docs remain authoritative public guidance, but checksum scope is intentionally limited to the machine-validated release payloads.

## Governance threshold

- Schema fixes before publication require maintainer signoff.
- New verbs or version lines require explicit steward approval.
- Current-vs-legacy path wording changes require the same review discipline as schema path changes.
