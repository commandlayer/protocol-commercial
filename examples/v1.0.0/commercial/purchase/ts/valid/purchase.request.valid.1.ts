export interface X402PurchaseRequestEnvelope {
  verb: "purchase";
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

export interface PurchasePayload {
  item_id: string;
  quantity: number;
  amount: PaymentAmount;
  settlement: PaymentSettlement;
  metadata?: Record<string, unknown>;
}

export interface PurchaseRequest {
  x402: X402PurchaseRequestEnvelope;
  trace: TraceEnvelope;
  actor: Identity;
  payload: PurchasePayload;
}

export const purchaseRequestValid1: PurchaseRequest = {
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
  actor: {
    id: "buyer-pc-001",
    kind: "user"
  },
  payload: {
    item_id: "item-ebook-001",
    quantity: 1,
    amount: {
      value: "9.99",
      asset: "USD"
    },
    settlement: {
      chain: "eip155:1",
      recipient: "creator.eth"
    },
    metadata: {
      delivery: "email",
      license: "single-user"
    }
  }
};
