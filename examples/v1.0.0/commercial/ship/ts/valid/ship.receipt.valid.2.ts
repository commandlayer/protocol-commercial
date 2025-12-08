import type { ShipReceipt, ShipStatus } from "./ship.receipt.valid.1";

export const shipReceiptValid2: ShipReceipt = {
  x402: {
    verb: "ship",
    version: "1.0.0",
    request_id: "req-ship-2025-12-07-0002",
    network: "eip155:1"
  },
  trace: {
    trace_id: "trace-ship-0002",
    started_at: "2025-12-07T19:21:00Z",
    completed_at: "2025-12-07T19:21:03Z",
    duration_ms: 2800,
    provider: "commandlayer-demo",
    region: "us-west-2",
    model: "ship-engine-001"
  },
  status: "success",
  result: {
    shipment_id: "shp-0002",
    order_id: "order-1002",
    status: "delivered" as ShipStatus,
    carrier: "FedEx",
    tracking_number: "9876543210",
    eta: "2025-12-09T14:30:00Z",
    metadata: {
      delivered_at: "2025-12-09T14:10:00Z",
      received_by: "Front desk"
    }
  },
  usage: {
    tokens: 410
  }
};
