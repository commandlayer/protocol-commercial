# GOVERNANCE — Protocol-Commercial

This document applies repo-wide and is version-independent unless a section says otherwise.

**Founding steward:** commandlayer.eth

## Steward responsibility

The steward maintains the normative commercial protocol surface until broader governance is established.

Steward duties include:

- preserving version immutability
- approving new release lines
- preventing schema, example, manifest, checksum, and public-doc drift
- coordinating with Protocol-Commons, Agent Cards, and commandlayer.org mirrors so that current-line path teaching stays coherent

## Succession and continuity

If the founding steward becomes unavailable or chooses to step down, a successor steward may be designated by a signed repository update that:

- names the incoming steward explicitly
- updates this document and any mirrored governance metadata in the same change set
- preserves the rule that published release lines remain immutable

Until such a designation lands, no other party may claim unilateral authority to mutate published artifacts or redefine the current line retroactively.

## Decision rules

| Change type | Requirement |
| --- | --- |
| Current-line pre-release edits | Steward approval |
| New verb | Steward approval with docs and examples |
| New version line | Steward approval with release metadata refresh |
| Public current-path model change | Steward approval with cross-repo doc alignment |
| In-place published mutation | Prohibited |
