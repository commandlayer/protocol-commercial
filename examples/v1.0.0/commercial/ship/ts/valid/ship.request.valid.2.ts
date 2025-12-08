import type { ShipRequest } from "./ship.request.valid.1";

export const shipRequestValid2: ShipRequest = {
  x402: {
    verb: "ship",
    version: "1.0.0",
    request_id: "req-ship-2025-12-07-0002",
    network: "eip155:1",
    tenant: "warehouse-02"
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
  actor: {
    id: "warehouse-02",
    kind: "service"
  },
  payload: {
    order_id: "order-1002",
    items: [
      {
        sku: "sku-bundle-xyz",
        quantity: 1
      }
    ],
    carrier_preference: "FedEx",
    service_level: "standard",
    metadata: {
      partial: true,
      wave: "evening"
    }
  }
};
