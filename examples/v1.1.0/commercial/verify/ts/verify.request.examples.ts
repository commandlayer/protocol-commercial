// examples/v1.1.0/commercial/verify/ts/verify.request.examples.ts

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

export interface VerifyTarget {
  target_type: "receipt" | "payment_proof" | "settlement" | "shipment" | "authorization" | "fulfillment";
  target_ref: Reference;
  authority?: string;
}

export interface VerifyRequest {
  protocol: "commercial";
  version: "1.1.0";
  verb: "verify";
  request_id: string;
  requested_at: string;
  requester: ActorIdentity;
  target: VerifyTarget;
  checks: Array<"existence" | "amount" | "counterparty" | "settlement" | "fulfillment">;
  strict: boolean;
  verifier?: ActorIdentity & { role: "verifier" };
}

export const validVerifyRequestExample: VerifyRequest = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "verify",
  request_id: "verifyreq-001",
  requested_at: "2026-03-19T10:20:00Z",
  requester: {
    role: "provider",
    id: "audit.example",
    kind: "service"
  },
  verifier: {
    role: "verifier",
    id: "ledger.example",
    kind: "service"
  },
  target: {
    target_type: "settlement",
    target_ref: {
      type: "settlement",
      id: "settle-2001"
    },
    authority: "https://ledger.example/verify"
  },
  checks: ["existence", "amount", "settlement"],
  strict: true
};

export const invalidVerifyRequestExample: any = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "verify",
  request_id: "verifyreq-invalid-001",
  requested_at: "2026-03-19T10:20:00Z",
  requester: {
    role: "verifier",
    id: "audit.example"
  },
  target: {
    target_type: "payment",
    target_ref: {
      type: "payment",
      id: "pay-2001"
    }
  },
  checks: ["proof"],
  strict: "yes"
};
