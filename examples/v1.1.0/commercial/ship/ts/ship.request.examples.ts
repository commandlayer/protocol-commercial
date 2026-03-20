// examples/v1.1.0/commercial/ship/ts/ship.request.examples.ts

export interface ActorIdentity {
  role: "payer" | "payee" | "merchant" | "provider" | "carrier" | "verifier";
  id: string;
  kind?: "agent" | "organization" | "wallet" | "account" | "service" | "human";
  display_name?: string;
  uri?: string;
}

export interface Reference {
  type:
    | "order"
    | "invoice"
    | "authorization"
    | "checkout"
    | "purchase"
    | "fulfillment"
    | "shipment"
    | "payment"
    | "settlement"
    | "receipt"
    | "payment_requirement"
    | "payment_session"
    | "payment_proof"
    | "agent_card";
  id: string;
  uri?: string;
}

export interface ShipmentItem {
  sku: string;
  quantity: number;
}

export interface Destination {
  country_code: string;
  postal_code: string;
  locality: string;
  region?: string;
  address_line1?: string;
  address_line2?: string;
}

export interface ShipRequest {
  protocol: "commercial";
  version: "1.1.0";
  verb: "ship";
  request_id: string;
  requested_at: string;
  merchant: ActorIdentity & { role: "merchant" };
  payer: ActorIdentity & { role: "payer" };
  provider: ActorIdentity & { role: "provider" };
  order_ref: Reference & { type: "order" };
  commercial_ref: (Reference & { type: "checkout" }) | (Reference & { type: "purchase" });
  fulfillment_ref: Reference & { type: "fulfillment" };
  items: ShipmentItem[];
  destination: Destination;
  service_level: "standard" | "expedited" | "express" | "overnight";
}

export const validShipRequestExample: ShipRequest = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "ship",
  request_id: "shipreq-001",
  requested_at: "2026-03-19T10:15:00Z",
  merchant: {
    role: "merchant",
    id: "merchant.example",
    kind: "organization"
  },
  payer: {
    role: "payer",
    id: "buyer-001",
    kind: "account"
  },
  provider: {
    role: "provider",
    id: "warehouse.example",
    kind: "service"
  },
  order_ref: {
    type: "order",
    id: "ord-3001"
  },
  commercial_ref: {
    type: "purchase",
    id: "purchase-3001"
  },
  fulfillment_ref: {
    type: "fulfillment",
    id: "fulfillment-3001"
  },
  items: [
    {
      sku: "device-001",
      quantity: 1
    }
  ],
  destination: {
    country_code: "US",
    postal_code: "10001",
    locality: "New York"
  },
  service_level: "express"
};

export const invalidShipRequestExample: any = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "ship",
  request_id: "shipreq-invalid-001",
  requested_at: "2026-03-19T10:15:00Z",
  merchant: { role: "merchant", id: "merchant.example" },
  payer: { role: "payer", id: "buyer-001" },
  provider: { role: "provider", id: "warehouse.example" },
  order_ref: { type: "order", id: "ord-3001" },
  commercial_ref: { type: "authorization", id: "auth-3001" },
  fulfillment_ref: { type: "fulfillment", id: "fulfillment-3001" },
  items: [{ sku: "device-001", quantity: 0 }],
  destination: { country_code: "USA", postal_code: "10001", locality: "New York" },
  service_level: "same-day"
};
