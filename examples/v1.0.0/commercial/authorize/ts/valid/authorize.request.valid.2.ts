import type {
  X402AuthorizeRequestEnvelope,
  TraceEnvelope,
  Identity,
  AuthorizePayload,
  AuthorizeRequest
} from "./authorize.request.valid.1";

export const authorizeRequestValid2: AuthorizeRequest = {
  x402: {
    verb: "authorize",
    version: "1.0.0",
    request_id: "req-authorize-2025-12-07-0002",
    network: "eip155:8453",
    tenant: "platform-merchant-01"
  } as X402AuthorizeRequestEnvelope,
  trace: {
    trace_id: "trace-authorize-0002",
    started_at: "2025-12-07T18:56:00Z",
    completed_at: "2025-12-07T18:56:02Z",
    duration_ms: 2000,
    provider: "commandlayer-demo",
    region: "us-west-2",
    model: "authorize-engine-001",
    tags: ["authorize", "stablecoin"]
  } as TraceEnvelope,
  actor: {
    id: "service-checkout-01",
    kind: "service"
  } as Identity,
  payload: {
    amount: {
      value: "2500.00",
      asset: "USDC",
      metadata: {
        tier: "enterprise"
      }
    },
    settlement: {
      chain: "eip155:8453",
      recipient: "0xMerchantBase000000000000000000000001",
      metadata: {
        route: "base-usdc",
        settlement_window: "T+1"
      }
    },
    purpose: "pre-authorize enterprise SaaS invoice",
    metadata: {
      integration: "partner-api",
      region: "US"
    }
  } as AuthorizePayload
};
