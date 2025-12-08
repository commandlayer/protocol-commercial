export interface X402CheckoutRequestEnvelope {
  verb: "checkout";
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

export interface CheckoutLineItem {
  sku: string;
  quantity: number;
  unit_price?: PaymentAmount;
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

export interface ShippingAddress {
  name?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}

export interface CheckoutPayload {
  cart_id?: string;
  items: CheckoutLineItem[];
  amount: PaymentAmount;
  settlement: PaymentSettlement;
  shipping_address?: ShippingAddress;
  payment_method_hint?: string;
  metadata?: Record<string, unknown>;
}

export interface CheckoutRequest {
  x402: X402CheckoutRequestEnvelope;
  trace: TraceEnvelope;
  actor: Identity;
  payload: CheckoutPayload;
}

export const checkoutRequestValid1: CheckoutRequest = {
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
  actor: {
    id: "buyer-ck-001",
    kind: "user"
  },
  payload: {
    cart_id: "cart-001",
    items: [
      {
        sku: "sku-shirt-black-m",
        quantity: 1,
        unit_price: {
          value: "30.00",
          asset: "USD"
        },
        metadata: {
          size: "M",
          color: "black"
        }
      },
      {
        sku: "sku-hat-standard",
        quantity: 2,
        unit_price: {
          value: "10.00",
          asset: "USD"
        }
      }
    ],
    amount: {
      value: "50.00",
      asset: "USD"
    },
    settlement: {
      chain: "eip155:1",
      recipient: "merchant-store.eth",
      metadata: {
        channel: "online"
      }
    },
    shipping_address: {
      name: "Alice Example",
      line1: "123 Main St",
      line2: "Apt 4B",
      city: "Exampleville",
      state: "NY",
      postal_code: "10001",
      country: "US"
    },
    payment_method_hint: "card",
    metadata: {
      campaign: "winter-2025",
      first_time_buyer: true
    }
  }
};
