# POLICY — Protocol-Commercial

This policy governs the current release line and its release-management rules. Repo-wide governance and security reporting are defined separately.

## Current line

`v1.1.0` is the current Protocol-Commercial line.

`v1.0.0` remains published for backward compatibility but is superseded.

## Change control

- No published version directory may be silently mutated after release.
- Breaking or semantic changes require a new version directory.
- Release metadata, examples, schema paths, and checksums must remain internally consistent.

## Normative artifact state

The checksum-covered release state consists of the current schema tree, current examples tree, and `manifest.json`. `checksums.txt` is the generated ledger for that machine-artifact set.

Release-defining prose docs may govern interpretation and process, but they are outside checksum coverage unless the checksum tooling is changed deliberately.

## Governance threshold

- Schema fixes before publication require maintainer signoff.
- New verbs or version lines require explicit steward approval.
