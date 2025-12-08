export type ReceiptStatus = "success" | "error" | "delegated";

export type VerifyResultStatus = "success" | "pending" | "failed" | "not_found";

export interface X402VerifyReceiptEnvelope {
  verb: "verify";
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

export interface VerifyReceiptResult {
  target: string;
  verified: boolean;
  status: VerifyResultStatus;
  amount?: PaymentAmount;
  settlement?: PaymentSettlement;
  reason?: string;
  metadata?: Record<string, unknown>;
}

export interface VerifyReceipt {
  x402: X402VerifyReceiptEnvelope;
  trace: TraceEnvelope;
  status: ReceiptStatus;
  result: VerifyReceiptResult;
  usage?: Record<string, unknown>;
  error?: {
    code?: string;
    message?: string;
    retryable?: boolean;
    details?: Record<string, unknown>;
  };
}

export const verifyReceiptValid1: VerifyReceipt = {
  x402: {
    verb: "verify",
    version: "1.0.0",
    request_id: "req-verify-2025-12-07-0001",
    network: "eip155:1"
  },
  trace: {
    trace_id: "trace-verify-0001",
    started_at: "2025-12-07T19:30:00Z",
    completed_at: "2025-12-07T19:30:01Z",
    duration_ms: 1000,
    provider: "commandlayer-demo",
    region: "us-east-1",
    model: "verify-engine-001"
  },
  status: "success",
  result: {
    target: "pay-12345",
    verified: true,
    status: "success",
    amount: {
      value: "100.00",
      asset: "USD"
    },
    settlement: {
      chain: "eip155:1",
      recipient: "merchant.example.eth"
    },
    metadata: {
      source: "psp-main",
      reconciled_at: "2025-12-07T19:30:01Z"
    }
  },
  usage: {
    tokens: 360
  }
};
