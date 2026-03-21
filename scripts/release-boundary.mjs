export const CURRENT_VERSION = "1.1.0";

export const CANONICAL_PACKAGE_SURFACE = [
  `schemas/v${CURRENT_VERSION}/`,
  `examples/v${CURRENT_VERSION}/`,
  "manifest.json",
  "checksums.txt",
  "LICENSE",
  "README.md",
  "index.js"
];

export const CHECKSUM_COVERED_SURFACE = CANONICAL_PACKAGE_SURFACE.filter((entry) => entry !== "checksums.txt");

export const TARBALL_ALLOWED_SURFACE = [
  ...CANONICAL_PACKAGE_SURFACE,
  "package.json"
];

export const EXPECTED_VERBS = ["authorize", "checkout", "purchase", "ship", "verify"];
