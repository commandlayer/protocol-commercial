// VALID authorize.request #2 — explicit purpose + metadata

export const authorizeRequestValid2 = {
  x402: {
    verb: "authorize",
    version: "1.0.0",
    request_id: "req-authz-002",
    network: "eip155:8453" // Base example
  },
  trace: {
    trace_id: "trace-authz-002",
    started_at: "2025-12-07T00:01:00Z"
  },
  actor: {
    id: "user123"
  },
  payload: {
    amount: {
      value: "199.99",
      asset: "USD"
    },
    settlement: {
      chain: "eip155:1",
      recipient: "highend-merchant.eth",
      metadata: {
        routing: "instant"
      }
    },
    purpose: "hotel-deposit",
    metadata: {
      product_ref: "stay-premium-3n"
    }
  }
};
