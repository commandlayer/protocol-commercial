# GOVERNANCE — Protocol-Commercial

This document defines repository-wide governance policy for the Protocol-Commercial release surface. It applies across all versions retained in the repo, with current-line decisions anchored to `v1.1.0`.

**Founding steward:** commandlayer.eth

## Steward responsibilities

The steward is responsible for:

- preserving release immutability
- approving new version lines and new verbs
- preventing schema, example, manifest, checksum, and documentation drift
- coordinating commandlayer.org mirrors and Agent Card bindings with the published flat current-line paths

## Current-line governance rules

For `v1.1.0` specifically:

- flat schema paths are canonical
- public docs must teach the flat current-line paths
- actor and x402 grammar are governed release semantics, not per-file preferences
- checksum scope and content-addressing metadata are release authority inputs

## Decision table

| Change type | Requirement |
| --- | --- |
| Current-line clarification before publication | Steward approval |
| New verb | Steward approval plus schemas, examples, docs, checksums, and manifest updates |
| New version line | Steward approval plus full release metadata refresh |
| Silent mutation of a published line | Prohibited |
