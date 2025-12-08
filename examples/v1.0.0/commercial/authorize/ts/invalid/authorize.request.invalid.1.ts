export const authorizeRequestInvalid1: any = {
  x402: {
    verb: "authorize",
    version: "1.0.0"
  },
  trace: {
    trace_id: "auth-trace-err-001"
  },
  actor: {
    id: "buyer-123",
    kind: "user"
  },
  payload: {
    amount: {
      value: 100.0,
      asset: "USDC"
    },
    settlement: {
      chain: "eip155:1"
    }
  }
};
