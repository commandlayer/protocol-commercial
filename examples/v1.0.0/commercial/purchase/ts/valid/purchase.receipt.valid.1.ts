export type ReceiptStatus = "success" | "error" | "delegated";

export type PurchaseStatus = "success" | "pending" | "failed" | "canceled";

export interface X402PurchaseReceiptEnvelope {
  verb: "purchase";
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

export interface PurchaseReceiptResult {
  purchase_id: string;
  status: PurchaseStatus;
  amount?: PaymentAmount;
  settlement?: PaymentSettlement;
  reason?: string;
  metadata?: Record<string, unknown>;
}

export interface PurchaseReceipt {
  x402: X402PurchaseReceiptEnvelope;
  trace: TraceEnvelope;
  status: ReceiptStatus;
  result: PurchaseReceiptResult;
  usage?: Record<string, unknown>;
}

export const purchaseReceiptValid1: PurchaseReceipt = {
  x402: {
    verb: "purchase",
    version: "1.0.0",
    request_id: "req-purchase-2025-12-07-0001",
    network: "eip155:1"
  },
  trace: {
    trace_id: "trace-purchase-0001",
    started_at: "2025-12-07T19:10:00Z",
    completed_at: "2025-12-07T19:10:01Z",
    duration_ms: 1000,
    provider: "commandlayer-demo",
    region: "us-east-1",
    model: "purchase-engine-001"
  },
  status: "success",
  result: {
    purchase_id: "purchase-001",
    status: "success",
    amount: {
      value: "9.99",
      asset: "USD"
    },
    settlement: {
      chain: "eip155:1",
      recipient: "creator.eth"
    },
    metadata: {
      delivery_status: "sent",
      license_key: "key-xxxx-xxxx"
    }
  },
  usage: {
    tokens: 900
  }
};
