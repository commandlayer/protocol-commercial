// examples/v1.1.0/commercial/authorize/ts/authorize.receipt.examples.ts

export interface Money {
  amount: string;
  currency: string;
  decimals?: number;
  includes?: "subtotal" | "tax" | "shipping" | "fees" | "discount" | "total";
}

export interface PaymentProof {
  scheme: "x402";
  proof_type: "payment-session" | "payment-authorization" | "payment-proof";
  proof_ref: string;
  uri?: string;
}

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

export interface AuthorizeReceipt {
  protocol: "commercial";
  version: "1.1.0";
  verb: "authorize";
  receipt_id: string;
  issued_at: string;
  request_id: string;
  status: "approved" | "denied" | "pending";
  payer: ActorIdentity & { role: "payer" };
  payee: ActorIdentity & { role: "payee" };
  amount: Money;
  authorization_id?: string;
  merchant: ActorIdentity & { role: "merchant" };
  approved_until?: string;
  payment_requirement_ref?: Reference & { type: "payment_requirement" };
  order_ref?: Reference;
  invoice_ref?: Reference;
  payment_proof?: PaymentProof;
  reason?: string;
}

export const validAuthorizeReceiptExample: AuthorizeReceipt = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "authorize",
  receipt_id: "authrcpt-001",
  issued_at: "2026-03-19T10:00:05Z",
  request_id: "authreq-001",
  status: "approved",
  authorization_id: "auth-001",
  payer: {
    role: "payer",
    id: "buyer-001",
    kind: "account"
  },
  payee: {
    role: "payee",
    id: "merchant-settlement",
    kind: "wallet"
  },
  merchant: {
    role: "merchant",
    id: "merchant.example",
    kind: "organization"
  },
  amount: {
    amount: "49.99",
    currency: "USDC",
    decimals: 2
  },
  approved_until: "2026-03-20T10:00:00Z",
  payment_requirement_ref: {
    type: "payment_requirement",
    id: "x402-auth-001"
  },
  order_ref: {
    type: "order",
    id: "ord-1001"
  },
  invoice_ref: {
    type: "invoice",
    id: "inv-1001"
  },
  payment_proof: {
    scheme: "x402",
    proof_type: "payment-authorization",
    proof_ref: "proof-auth-001",
    uri: "https://merchant.example/x402/proofs/proof-auth-001"
  }
};

export const invalidAuthorizeReceiptExample: any = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "authorize",
  receipt_id: "authrcpt-invalid-001",
  issued_at: "not-a-date",
  request_id: "authreq-001",
  status: "approved",
  payer: {
    role: "payer",
    id: "buyer-001"
  },
  payee: {
    role: "payee",
    id: "merchant-settlement"
  },
  merchant: {
    role: "merchant",
    id: "merchant.example"
  },
  amount: {
    amount: "49.99",
    currency: "USDC"
  },
  payment_proof: {
    scheme: "x402",
    proof_type: "authorization",
    proof_ref: "proof-auth-001"
  }
};
