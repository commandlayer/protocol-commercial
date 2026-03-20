// examples/v1.1.0/commercial/checkout/ts/checkout.receipt.examples.ts

export interface Money {
  amount: string;
  currency: string;
  decimals?: number;
  includes?: "subtotal" | "tax" | "shipping" | "fees" | "discount" | "total";
}

export interface AmountBreakdown {
  subtotal: Money;
  tax?: Money;
  fees?: Money;
  discount?: Money;
  shipping?: Money;
  total: Money;
}

export interface Settlement {
  status: "captured" | "failed" | "pending";
  method: "x402" | "stablecoin" | "card" | "bank_transfer" | "credit";
  settlement_ref: string;
  network_ref?: string;
  amount: Money;
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

export interface CheckoutReceipt {
  protocol: "commercial";
  version: "1.1.0";
  verb: "checkout";
  receipt_id: string;
  issued_at: string;
  request_id: string;
  status: "captured" | "failed" | "pending";
  payer: ActorIdentity & { role: "payer" };
  merchant: ActorIdentity & { role: "merchant" };
  order_ref: Reference & { type: "order" };
  settlement: Settlement;
  amount_breakdown: AmountBreakdown;
  payee?: ActorIdentity & { role: "payee" };
  invoice_ref?: Reference & { type: "invoice" };
  fulfillment_ref?: Reference & { type: "fulfillment" };
  payment_proof?: PaymentProof;
  reason?: string;
}

export const validCheckoutReceiptExample: CheckoutReceipt = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "checkout",
  receipt_id: "checkoutrcpt-001",
  issued_at: "2026-03-19T10:05:03Z",
  request_id: "checkoutreq-001",
  status: "captured",
  payer: {
    role: "payer",
    id: "buyer-001",
    kind: "account"
  },
  merchant: {
    role: "merchant",
    id: "merchant.example",
    kind: "organization"
  },
  payee: {
    role: "payee",
    id: "merchant-settlement",
    kind: "wallet"
  },
  order_ref: {
    type: "order",
    id: "ord-1001"
  },
  invoice_ref: {
    type: "invoice",
    id: "inv-1001"
  },
  settlement: {
    status: "captured",
    method: "x402",
    settlement_ref: "settle-001",
    network_ref: "0xabc123",
    amount: {
      amount: "49.99",
      currency: "USDC",
      decimals: 2
    }
  },
  amount_breakdown: {
    subtotal: {
      amount: "49.99",
      currency: "USDC",
      decimals: 2
    },
    total: {
      amount: "49.99",
      currency: "USDC",
      decimals: 2
    }
  },
  fulfillment_ref: {
    type: "fulfillment",
    id: "fulfill-001",
    uri: "https://merchant.example/fulfillment/fulfill-001"
  },
  payment_proof: {
    scheme: "x402",
    proof_type: "payment-proof",
    proof_ref: "proof-001",
    uri: "https://merchant.example/x402/proofs/proof-001"
  }
};

export const invalidCheckoutReceiptExample: any = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "checkout",
  receipt_id: "checkoutrcpt-invalid-001",
  issued_at: "2026-03-19T10:05:03Z",
  request_id: "checkoutreq-001",
  status: "captured",
  payer: { role: "payer", id: "buyer-001" },
  merchant: { role: "merchant", id: "merchant.example" },
  order_ref: { type: "order", id: "ord-1001" },
  settlement: {
    status: "captured",
    method: "x402",
    amount: { amount: "49.99", currency: "USDC" }
  },
  amount_breakdown: {
    subtotal: { amount: "49.99", currency: "USDC" }
  }
};
