// examples/v1.1.0/commercial/verify/ts/verify.receipt.examples.ts

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

export interface VerifyReceipt {
  protocol: "commercial";
  version: "1.1.0";
  verb: "verify";
  receipt_id: string;
  issued_at: string;
  request_id: string;
  status: "verified" | "not_verified" | "inconclusive";
  verifier: ActorIdentity & { role: "verifier" };
  target_type: "receipt" | "payment_proof" | "settlement" | "shipment" | "authorization" | "fulfillment";
  target_ref: Reference;
  evidence_refs: Reference[];
  basis: string;
  reason?: string;
}

export const validVerifyReceiptExample: VerifyReceipt = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "verify",
  receipt_id: "verifyrcpt-001",
  issued_at: "2026-03-19T10:20:02Z",
  request_id: "verifyreq-001",
  status: "verified",
  verifier: {
    role: "verifier",
    id: "ledger.example",
    kind: "service"
  },
  target_type: "settlement",
  target_ref: {
    type: "settlement",
    id: "settle-2001"
  },
  evidence_refs: [
    {
      type: "payment_proof",
      id: "proof-2001",
      uri: "https://merchant.example/x402/proofs/proof-2001"
    }
  ],
  basis: "Matched canonical x402 settlement proof and merchant ledger entry."
};

export const invalidVerifyReceiptExample: any = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "verify",
  receipt_id: "verifyrcpt-invalid-001",
  issued_at: "2026-03-19T10:20:02Z",
  request_id: "verifyreq-001",
  status: "verified",
  verifier: {
    role: "provider",
    id: "ledger.example"
  },
  target_type: "settlement",
  target_ref: {
    type: "settlement",
    id: "settle-2001"
  },
  evidence_refs: [],
  basis: 123
};
