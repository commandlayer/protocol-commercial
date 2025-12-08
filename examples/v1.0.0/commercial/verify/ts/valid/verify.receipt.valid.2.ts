import type { VerifyReceipt, VerifyResultStatus } from "./verify.receipt.valid.1";

export const verifyReceiptValid2: VerifyReceipt = {
  x402: {
    verb: "verify",
    version: "1.0.0",
    request_id: "req-verify-2025-12-07-0002",
    network: "eip155:8453"
  },
  trace: {
    trace_id: "trace-verify-0002",
    started_at: "2025-12-07T19:31:00Z",
    completed_at: "2025-12-07T19:31:01Z",
    duration_ms: 1000,
    provider: "commandlayer-demo",
    region: "us-west-2",
    model: "verify-engine-001"
  },
  status: "success",
  result: {
    target: "inv-7890",
    verified: false,
    status: "not_found" as VerifyResultStatus,
    reason: "no matching invoice found in canonical ledger",
    metadata: {
      source: "psp-secondary",
      correlation_run: "2025Q4"
    }
  },
  usage: {
    tokens: 310
  }
};
