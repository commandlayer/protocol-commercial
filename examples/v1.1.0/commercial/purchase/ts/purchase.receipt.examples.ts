// examples/v1.1.0/commercial/purchase/ts/purchase.receipt.examples.ts

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

export interface PurchaseReceipt {
  protocol: "commercial";
  version: "1.1.0";
  verb: "purchase";
  receipt_id: string;
  issued_at: string;
  request_id: string;
  status: "captured" | "failed" | "pending";
  purchase_id: string;
  payer: ActorIdentity & { role: "payer" };
  merchant: ActorIdentity & { role: "merchant" };
  amount_breakdown: AmountBreakdown;
  settlement: Settlement;
  payee?: ActorIdentity & { role: "payee" };
  provider?: ActorIdentity & { role: "provider" };
  order_ref?: Reference & { type: "order" };
  invoice_ref?: Reference & { type: "invoice" };
  payment_proof?: PaymentProof;
  reason?: string;
}

export const validPurchaseReceiptExample: PurchaseReceipt = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "purchase",
  receipt_id: "purchasercpt-001",
  issued_at: "2026-03-19T10:10:02Z",
  request_id: "purchasereq-001",
  status: "captured",
  purchase_id: "purchase-001",
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
  provider: {
    role: "provider",
    id: "runtime.commandlayer",
    kind: "service"
  },
  amount_breakdown: {
    subtotal: {
      amount: "15.00",
      currency: "USDC",
      decimals: 2
    },
    total: {
      amount: "15.00",
      currency: "USDC",
      decimals: 2
    }
  },
  order_ref: {
    type: "order",
    id: "ord-2001"
  },
  invoice_ref: {
    type: "invoice",
    id: "inv-2001"
  },
  settlement: {
    status: "captured",
    method: "x402",
    settlement_ref: "settle-2001",
    network_ref: "0xdef456",
    amount: {
      amount: "15.00",
      currency: "USDC",
      decimals: 2
    }
  },
  payment_proof: {
    scheme: "x402",
    proof_type: "payment-proof",
    proof_ref: "proof-2001",
    uri: "urn:cl:x402:proof:proof-2001"
  }
};

export const invalidPurchaseReceiptExample: any = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "purchase",
  receipt_id: "purchasercpt-invalid-001",
  issued_at: "2026-03-19T10:10:02Z",
  request_id: "purchasereq-001",
  status: "captured",
  purchase_id: "purchase-001",
  payer: { role: "payer", id: "buyer-001" },
  merchant: { role: "merchant", id: "merchant.example" },
  amount_breakdown: {
    subtotal: { amount: "15.00", currency: "USDC" },
    total: { amount: "15.00", currency: "USDC" }
  },
  settlement: {
    status: "captured",
    method: "cash",
    amount: { amount: "15.00", currency: "USDC" }
  }
};
