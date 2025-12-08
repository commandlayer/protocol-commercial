export const purchaseRequestValid2: any = {
  x402: {
    verb: "purchase",
    version: "1.0.0",
    request_id: "req-purchase-2025-12-07-0002",
    network: "eip155:8453",
    tenant: "platform-purchase-01"
  },
  trace: {
    trace_id: "trace-purchase-0002",
    started_at: "2025-12-07T19:11:00Z",
    completed_at: "2025-12-07T19:11:02Z",
    duration_ms: 2000,
    provider: "commandlayer-demo",
    region: "us-west-2",
    model: "purchase-engine-001"
  },
  actor: {
    id: "service-buyer-01",
    kind: "service"
  },
  payload: {
    item_id: "item-api-seat-10",
    quantity: 10,
    amount: {
      value: "1000.00",
      asset: "USDC"
    },
    settlement: {
      chain: "eip155:8453",
      recipient: "0xEnterpriseVendor0000000000000000000001"
    },
    metadata: {
      plan: "business",
      team_size: 10
    }
  }
};
