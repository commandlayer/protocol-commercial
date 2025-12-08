// VALID authorize.request #1 — canonical minimal case

export const authorizeRequestValid1 = {
  x402: {
    verb: "authorize",
    version: "1.0.0",
    request_id: "req-authz-001",
    network: "eip155:1"
  },
  trace: {
    trace_id: "trace-authz-001"
  },
  actor: {
    id: "walletbuyer.eth"
  },
  payload: {
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
