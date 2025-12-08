import type {
  AuthorizeReceipt,
  AuthorizationStatus
} from "./authorize.receipt.valid.1";

export const authorizeReceiptValid2: AuthorizeReceipt = {
  x402: {
    verb: "authorize",
    version: "1.0.0",
    request_id: "req-authorize-2025-12-07-0002",
    network: "eip155:8453",
    tenant: "platform-merchant-01"
  },
  trace: {
    trace_id: "trace-authorize-0002",
    started_at: "2025-12-07T18:56:00Z",
    completed_at: "2025-12-07T18:56:02Z",
    duration_ms: 2000,
    provider: "commandlayer-demo",
    region: "us-west-2",
    model: "authorize-engine-001",
    tags: ["authorize", "stablecoin", "enterprise"]
  },
  status: "success",
  result: {
    authorization_id: "auth-0002",
    status: "declined" as AuthorizationStatus,
    amount: {
      value: "2500.00",
      asset: "USDC"
    },
    settlement: {
      chain: "eip155:8453",
      recipient: "0xMerchantBase000000000000000000000001"
    },
    reason: "risk_score_too_high",
    metadata: {
      risk_score: 0.93,
      rule_id: "RISK_NET_NEW_JURISDICTION"
    }
  },
  usage: {
    tokens: 610
  }
};
