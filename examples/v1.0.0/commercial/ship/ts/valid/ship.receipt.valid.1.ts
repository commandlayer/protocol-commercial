export type ReceiptStatus = "success" | "error" | "delegated";

export type ShipStatus =
  | "label_created"
  | "in_transit"
  | "delivered"
  | "failed"
  | "returned";

export interface X402ShipReceiptEnvelope {
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

export interface ShipReceiptResult {
  shipment_id: string;
  order_id?: string;
  status: ShipStatus;
  carrier?: string;
  tracking_number?: string;
  eta?: string;
  metadata?: Record<string, unknown>;
}

export interface ShipReceipt {
  x402: X402ShipReceiptEnvelope;
  trace: TraceEnvelope;
  status: ReceiptStatus;
  result: ShipReceiptResult;
  usage?: Record<string, unknown>;
  error?: {
    code?: string;
    message?: string;
    retryable?: boolean;
    details?: Record<string, unknown>;
  };
}

export const shipReceiptValid1: ShipReceipt = {
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
  status: "success",
  result: {
    shipment_id: "shp-0001",
    order_id: "order-1001",
    status: "in_transit",
    carrier: "UPS",
    tracking_number: "1Z999AA10123456784",
    eta: "2025-12-10T18:00:00Z",
    metadata: {
      warehouse: "WH1",
      label_id: "lbl-0001"
    }
  },
  usage: {
    tokens: 320
  }
};
