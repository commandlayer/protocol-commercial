# ONBOARDING — Protocol-Commercial

For contributors and implementers:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Validate local changes:
   ```bash
   npm run validate
   ```
3. Update `manifest.json` when adding verbs or version metadata.
4. Regenerate checksums before commit:
   ```bash
   npm run generate:checksums
   ```
5. Never mutate locked versions in-place.
