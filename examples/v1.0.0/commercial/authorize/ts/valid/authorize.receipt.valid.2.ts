// VALID authorize.receipt #2 — declined with canonical reason

export const authorizeReceiptValid2 = {
  x402: {
    verb: "authorize",
    version: "1.0.0",
    request_id: "req-authz-002"
  },
  trace: {
    trace_id: "trace-authz-002",
    completed_at: "2025-12-07T00:02:30Z",
    duration_ms: 1500
  },
  status: "success",
  result: {
    authorization_id: "authz-xyz-002",
    status: "declined",
    amount: {
      value: "199.99",
      asset: "USD"
    },
    settlement: {
      chain: "eip155:1",
      recipient: "highend-merchant.eth"
    },
    reason: "insufficient_funds",
    metadata: {
      rule: "fraud-check-12"
    }
  }
};
