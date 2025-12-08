export type ReceiptStatus = "success" | "error" | "delegated";

export type AuthorizationStatus =
  | "authorized"
  | "declined"
  | "expired"
  | "canceled";

export interface X402AuthorizeReceiptEnvelope {
  verb: "authorize";
  version: "1.0.0";
  request_id?: string;
  network?: string;
  tenant?: string;
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

export interface AuthorizeReceiptResult {
  authorization_id: string;
  status: AuthorizationStatus;
  amount?: PaymentAmount;
  settlement?: PaymentSettlement;
  expires_at?: string;
  reason?: string;
  metadata?: Record<string, unknown>;
}

export interface AuthorizeReceipt {
  x402: X402AuthorizeReceiptEnvelope;
  trace: TraceEnvelope;
  status: ReceiptStatus;
  result: AuthorizeReceiptResult;
  usage?: Record<string, unknown>;
  error?: {
    code?: string;
    message?: string;
    retryable?: boolean;
    details?: Record<string, unknown>;
  };
}

export const authorizeReceiptValid1: AuthorizeReceipt = {
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
    tags: ["authorize", "card_auth"]
  },
  status: "success",
  result: {
    authorization_id: "auth-0001",
    status: "authorized",
    amount: {
      value: "100.00",
      asset: "USD"
    },
    settlement: {
      chain: "eip155:1",
      recipient: "merchant.example.eth"
    },
    expires_at: "2025-12-14T18:55:00Z",
    metadata: {
      scheme: "visa",
      last4: "4242"
    }
  },
  usage: {
    tokens: 420
  }
};
