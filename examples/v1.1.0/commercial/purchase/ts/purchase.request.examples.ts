// examples/v1.1.0/commercial/purchase/ts/purchase.request.examples.ts

export interface Money {
  amount: string;
  currency: string;
  decimals?: number;
  includes?: "subtotal" | "tax" | "shipping" | "fees" | "discount" | "total";
}

export interface LineItem {
  sku: string;
  description: string;
  quantity: number;
  unit_price: Money;
}

export interface AmountBreakdown {
  subtotal: Money;
  tax?: Money;
  fees?: Money;
  discount?: Money;
  shipping?: Money;
  total: Money;
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

export interface PaymentProof {
  scheme: "x402";
  proof_type: "payment-session" | "payment-authorization" | "payment-proof";
  proof_ref: string;
  uri?: string;
}

export interface PaymentInput {
  payment_requirement_ref?: Reference & { type: "payment_requirement" };
  payment_session_ref?: Reference & { type: "payment_session" };
  payment_proof?: PaymentProof;
}

export interface PurchaseRequest {
  protocol: "commercial";
  version: "1.1.0";
  verb: "purchase";
  request_id: string;
  requested_at: string;
  payer: ActorIdentity & { role: "payer" };
  merchant: ActorIdentity & { role: "merchant" };
  items: LineItem[];
  amount_breakdown: AmountBreakdown;
  payment_input: PaymentInput;
  payee?: ActorIdentity & { role: "payee" };
  provider?: ActorIdentity & { role: "provider" };
  order_ref?: Reference & { type: "order" };
  invoice_ref?: Reference & { type: "invoice" };
  merchant_reference?: string;
}

export const validPurchaseRequestExample: PurchaseRequest = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "purchase",
  request_id: "purchasereq-001",
  requested_at: "2026-03-19T10:10:00Z",
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
  items: [
    {
      sku: "svc-analysis-pack",
      description: "One analysis execution bundle",
      quantity: 1,
      unit_price: {
        amount: "12.50",
        currency: "USDC",
        decimals: 2
      }
    },
    {
      sku: "svc-priority-routing",
      description: "Priority routing add-on",
      quantity: 1,
      unit_price: {
        amount: "2.50",
        currency: "USDC",
        decimals: 2
      }
    }
  ],
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
  merchant_reference: "instant-purchase-2001",
  payment_input: {
    payment_requirement_ref: {
      type: "payment_requirement",
      id: "x402-req-2001"
    }
  }
};

export const invalidPurchaseRequestExample: any = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "purchase",
  request_id: "purchasereq-invalid-001",
  requested_at: "2026-03-19T10:10:00Z",
  payer: { role: "payer", id: "buyer-001" },
  merchant: { role: "merchant", id: "merchant.example" },
  items: [
    {
      sku: "svc-analysis-pack",
      description: "One analysis execution bundle",
      quantity: 0,
      unit_price: { amount: "12.50", currency: "USDC" }
    }
  ],
  amount_breakdown: {
    subtotal: { amount: "15.00", currency: "USDC" },
    total: { amount: "15.00", currency: "USDC" }
  },
  payment_input: {}
};
