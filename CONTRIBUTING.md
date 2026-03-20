# CONTRIBUTING — Protocol-Commercial

This document defines the contributor workflow for the current release line. Keep changes minimal, validation-preserving, and explicit about whether they affect the current line (`v1.1.0`) or retained legacy artifacts.

## Pull request expectations

- Describe the exact problem being fixed and the exact files changed.
- Keep protocol semantics unchanged unless the change is intentionally normative and documented.
- Prefer deletion over vestigial compatibility scaffolding.
- When docs change, keep them precise and avoid restating the full validation command block outside `README.md#validation-commands`.
- If you touch checksum-covered machine artifacts (`schemas/v1.1.0/`, `examples/v1.1.0/`, `manifest.json`), regenerate `checksums.txt` before merge.

## Commit convention

Use concise, imperative commit subjects. Prefer a scope when it clarifies intent, for example:

- `docs: clarify current-line validation policy`
- `tooling: route npm test through validation aggregate`
- `validation: reuse strict JSON loader across scripts`

Avoid mixed-purpose commits when a focused change is practical.

## Required validation before merge

Run the canonical commands from `README.md#validation-commands` that match your change set. In normal contributor flow, this means at least:

```bash
npm test
npm run validate:schemas
npm run validate:examples
npm run validate:integrity
```

Also run `sha256sum -c checksums.txt` whenever you changed checksum-covered artifacts or regenerated the checksum ledger.

## When changing schemas, examples, or docs

### Schemas

- Preserve flat, self-contained `v1.1.0` schemas; do not reintroduce current-line cross-file schema dependencies.
- Keep file paths and `$id` values aligned exactly.
- Treat same-named local `$defs` as canonical repeated shapes and keep them consistent across verbs.

### Examples

- Keep valid fixtures conformant and invalid fixtures narrowly targeted.
- Ensure request and receipt coverage remains present in both `valid/` and `invalid/` for each current-line verb.
- Do not add a current-line `examples/v1.1.0/**/ts/` surface unless the repository deliberately restores and governs it.

### Documentation

- Keep onboarding content orientation-focused and contributor policy in this file.
- Use explicit JSON path imports in examples by default, with any bare-package import labeled as environment-dependent.
- State clearly when guidance applies only to the current line and when legacy `v1.0.0` artifacts are mentioned for compatibility or audit history.
