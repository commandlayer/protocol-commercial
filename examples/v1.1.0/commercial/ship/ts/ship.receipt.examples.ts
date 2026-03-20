// examples/v1.1.0/commercial/ship/ts/ship.receipt.examples.ts

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

export interface ShipReceipt {
  protocol: "commercial";
  version: "1.1.0";
  verb: "ship";
  receipt_id: string;
  issued_at: string;
  request_id: string;
  status: "label_created" | "in_transit" | "delivered" | "failed" | "returned";
  shipment_id: string;
  merchant: ActorIdentity & { role: "merchant" };
  payer: ActorIdentity & { role: "payer" };
  order_ref: Reference & { type: "order" };
  commercial_ref: (Reference & { type: "checkout" }) | (Reference & { type: "purchase" });
  fulfillment_ref: Reference & { type: "fulfillment" };
  event_at: string;
  carrier?: ActorIdentity & { role: "carrier" };
  tracking_number?: string;
  tracking_url?: string;
  delivered_at?: string;
  delivery_proof_ref?: Reference & { type: "receipt" };
  payment_ref?: Reference;
  reason?: string;
}

export const validShipReceiptExample: ShipReceipt = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "ship",
  receipt_id: "shiprcpt-001",
  issued_at: "2026-03-19T10:15:05Z",
  request_id: "shipreq-001",
  status: "delivered",
  shipment_id: "shipment-001",
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
  carrier: {
    role: "carrier",
    id: "ups",
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
  payment_ref: {
    type: "payment_proof",
    id: "proof-2001"
  },
  tracking_number: "1Z999AA10123456784",
  tracking_url: "https://carrier.example/track/1Z999AA10123456784",
  event_at: "2026-03-19T10:15:05Z",
  delivered_at: "2026-03-19T10:15:05Z",
  delivery_proof_ref: {
    type: "receipt",
    id: "delivery-scan-3001",
    uri: "https://carrier.example/proof/delivery-scan-3001"
  }
};

export const invalidShipReceiptExample: any = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "ship",
  receipt_id: "shiprcpt-invalid-001",
  issued_at: "2026-03-19T10:15:05Z",
  request_id: "shipreq-001",
  status: "delivered",
  shipment_id: "shipment-001",
  merchant: { role: "merchant", id: "merchant.example" },
  payer: { role: "payer", id: "buyer-001" },
  order_ref: { type: "order", id: "ord-3001" },
  commercial_ref: { type: "purchase", id: "purchase-3001" },
  fulfillment_ref: { type: "fulfillment", id: "fulfillment-3001" },
  event_at: "not-a-date",
  payment_ref: { type: "payment", id: "pay-2001" }
};
