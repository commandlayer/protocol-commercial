// VALID authorize.receipt #1 — successful hold

export const authorizeReceiptValid1 = {
  x402: {
    verb: "authorize",
    version: "1.0.0",
    request_id: "req-authz-001"
  },
  trace: {
    trace_id: "trace-authz-001",
    completed_at: "2025-12-07T00:02:00Z",
    provider: "demo-provider",
    region: "us-east-1"
  },
  status: "success",
  result: {
    authorization_id: "authz-abc-001",
    status: "authorized",
    amount: {
      value: "42.00",
      asset: "USDC"
    },
    settlement: {
      chain: "eip155:1",
      recipient: "merchant.eth"
    }
  }
};
