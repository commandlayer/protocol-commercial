# SPEC — Commercial Layer (v1.0.0 Candidate)

## Scope
Defines normative JSON Schemas (Draft 2020‑12, strict) for the Commercial verbs.

### Verbs
- **checkout** — create/confirm purchase intents; idempotent; currency must be explicit.
- **invoice** — issue payable documents; totals must equal line items; currency codes ISO‑4217.
- **refund** — reverse prior settlement; must reference receipt/invoice; partial allowed.
- **verify** — deterministic identity/data checks; return confidence + evidence.
- **sign** — produce signatures (cryptographic or legal); include algo + key id.
- **subscribe** — create/modify recurring agreements; billing cadence explicit (ISO‑8601 R/RRULE).
- **ship** — label, rate, or schedule carrier pickup; addresses normalized.
- **track** — query fulfillment status by carrier/ref ids; consistent status enums.
- **disburse** — payouts to destinations (card/bank/wallet); KYC/KYB flags.
- **settle** — reconcile and finalize financial events; produce balances deltas.

## Request/Receipt Invariants
- `request.meta.version` must equal `"1.0.0"`.
- All IDs are **opaque strings** (no semantics).
- Amounts use **integers of minor units** (e.g., cents).
- Timestamps are RFC‑3339 with timezone (Z/offset).
- Receipts must carry a tamper‑evident `integrity.sha256` (hex).

## Error Model
- `code` (stable string), `message` (human), `details` (object), `retryable` (bool).

## Aliases
- One lowercase alias per verb, mapping **to** canonical. No reverse mapping.

## Security
- PII minimization; redact by default.
- Never echo secrets in receipts.
- Recommend mTLS + key‑scoped tokens; see SECURITY.md.
