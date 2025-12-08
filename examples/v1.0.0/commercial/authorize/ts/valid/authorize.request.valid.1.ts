export interface X402AuthorizeRequestEnvelope {
  verb: "authorize";
  version: "1.0.0";
  request_id?: string;
  network?: string;
  tenant?: string;
}

export interface PaymentAmount {
  value: string;
  asset: string;
  pricing_tier?: string;
  metadata?: Record<string, unknown>;
}

export interface PaymentSettlement {
  chain: string;
  recipient: string;
  refund_address?: string;
  merchant_id?: string;
  metadata?: Record<string, unknown>;
}

export interface TraceEnvelope {
  trace_id: string;
  parent_trace_id?: string;
  started_at?: string;
  completed_at?: string;
  duration_ms?: number;
  provider?: string;
  region?: string;
  model?: string;
  tags?: string[];
}

export interface Identity {
  id: string;
  kind: string;
}

export interface AuthorizePayload {
  amount: PaymentAmount;
  settlement: PaymentSettlement;
  purpose?: string;
  metadata?: Record<string, unknown>;
}

export interface AuthorizeRequest {
  x402: X402AuthorizeRequestEnvelope;
  trace: TraceEnvelope;
  actor: Identity;
  payload: AuthorizePayload;
}

export const authorizeRequestValid1: AuthorizeRequest = {
  x402: {
    verb: "authorize",
    version: "1.0.0",
    request_id: "req-authorize-2025-12-07-0001",
    network: "eip155:1"
  },
  trace: {
    trace_id: "trace-authorize-0001",
    started_at: "2025-12-07T18:55:00Z",
    completed_at: "2025-12-07T18:55:01Z",
    duration_ms: 1000,
    provider: "commandlayer-demo",
    region: "us-east-1",
    model: "authorize-engine-001",
    tags: ["authorize", "example", "v1.0.0"]
  },
  actor: {
    id: "buyer-123",
    kind: "user"
  },
  payload: {
    amount: {
      value: "100.00",
      asset: "USD"
    },
    settlement: {
      chain: "eip155:1",
      recipient: "merchant.example.eth",
      metadata: {
        channel: "web",
        flow: "card_auth"
      }
    },
    purpose: "card authorization for later capture",
    metadata: {
      session_id: "sess-auth-0001",
      risk_score: 0.12
    }
  }
};
