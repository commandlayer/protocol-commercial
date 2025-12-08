export interface X402ShipRequestEnvelope {
  verb: "ship";
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

export interface Identity {
  id: string;
  kind: string;
}

export interface ShipItem {
  sku: string;
  quantity: number;
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

export interface ShipPayload {
  order_id: string;
  items?: ShipItem[];
  shipping_address?: ShippingAddress;
  carrier_preference?: string;
  service_level?: string;
  metadata?: Record<string, unknown>;
}

export interface ShipRequest {
  x402: X402ShipRequestEnvelope;
  trace: TraceEnvelope;
  actor: Identity;
  payload: ShipPayload;
}

export const shipRequestValid1: ShipRequest = {
  x402: {
    verb: "ship",
    version: "1.0.0",
    request_id: "req-ship-2025-12-07-0001",
    network: "eip155:1"
  },
  trace: {
    trace_id: "trace-ship-0001",
    started_at: "2025-12-07T19:20:00Z",
    completed_at: "2025-12-07T19:20:01Z",
    duration_ms: 950,
    provider: "commandlayer-demo",
    region: "us-east-1",
    model: "ship-engine-001"
  },
  actor: {
    id: "fulfillment-service-01",
    kind: "service"
  },
  payload: {
    order_id: "order-1001",
    items: [
      {
        sku: "sku-shirt-black-m",
        quantity: 1
      },
      {
        sku: "sku-hat-standard",
        quantity: 2
      }
    ],
    shipping_address: {
      name: "Alice Example",
      line1: "123 Main St",
      line2: "Apt 4B",
      city: "Exampleville",
      state: "NY",
      postal_code: "10001",
      country: "US"
    },
    carrier_preference: "UPS",
    service_level: "express",
    metadata: {
      batch_id: "batch-ship-001",
      priority: "high"
    }
  }
};
