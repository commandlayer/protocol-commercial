export type ReceiptStatus = "success" | "error" | "delegated";

export type CheckoutOrderStatus =
  | "created"
  | "authorized"
  | "captured"
  | "failed"
  | "canceled";

export interface X402CheckoutReceiptEnvelope {
  verb: "checkout";
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

export interface CheckoutReceiptResult {
  order_id: string;
  status: CheckoutOrderStatus;
  amount?: PaymentAmount;
  settlement?: PaymentSettlement;
  line_items?: Array<Record<string, unknown>>;
  reason?: string;
  metadata?: Record<string, unknown>;
}

export interface CheckoutReceipt {
  x402: X402CheckoutReceiptEnvelope;
  trace: TraceEnvelope;
  status: ReceiptStatus;
  result: CheckoutReceiptResult;
  usage?: Record<string, unknown>;
  error?: {
    code?: string;
    message?: string;
    retryable?: boolean;
    details?: Record<string, unknown>;
  };
}

export const checkoutReceiptValid1: CheckoutReceipt = {
  x402: {
    verb: "checkout",
    version: "1.0.0",
    request_id: "req-checkout-2025-12-07-0001",
    network: "eip155:1"
  },
  trace: {
    trace_id: "trace-checkout-0001",
    started_at: "2025-12-07T19:00:00Z",
    completed_at: "2025-12-07T19:00:01Z",
    duration_ms: 1000,
    provider: "commandlayer-demo",
    region: "us-east-1",
    model: "checkout-engine-001"
  },
  status: "success",
  result: {
    order_id: "order-001",
    status: "authorized",
    amount: {
      value: "50.00",
      asset: "USD"
    },
    settlement: {
      chain: "eip155:1",
      recipient: "merchant-store.eth"
    },
    line_items: [
      {
        sku: "sku-shirt-black-m",
        quantity: 1
      },
      {
        sku: "sku-hat-standard",
        quantity: 2
      }
    ],
    metadata: {
      payment_intent_id: "pi_123",
      psp: "stripe"
    }
  },
  usage: {
    tokens: 1200
  }
};
