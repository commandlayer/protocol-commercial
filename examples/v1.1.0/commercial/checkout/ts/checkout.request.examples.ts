// examples/v1.1.0/commercial/checkout/ts/checkout.request.examples.ts

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

export interface FulfillmentIntent {
  mode: "digital" | "shipment" | "service";
  destination_ref?: string;
}

export interface PaymentSession {
  scheme: "x402";
  session_id: string;
  resource: string;
  network?: string;
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

export interface CheckoutRequest {
  protocol: "commercial";
  version: "1.1.0";
  verb: "checkout";
  request_id: string;
  requested_at: string;
  payer: ActorIdentity & { role: "payer" };
  merchant: ActorIdentity & { role: "merchant" };
  order_ref: Reference & { type: "order" };
  items: LineItem[];
  amount_breakdown: AmountBreakdown;
  capture: "immediate" | "if_authorized";
  payment_session: PaymentSession;
  fulfillment_intent: FulfillmentIntent;
  payee?: ActorIdentity & { role: "payee" };
  provider?: ActorIdentity & { role: "provider" };
  invoice_ref?: Reference & { type: "invoice" };
}

export const validCheckoutRequestExample: CheckoutRequest = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "checkout",
  request_id: "checkoutreq-001",
  requested_at: "2026-03-19T10:05:00Z",
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
  order_ref: {
    type: "order",
    id: "ord-1001"
  },
  invoice_ref: {
    type: "invoice",
    id: "inv-1001"
  },
  items: [
    {
      sku: "sku-pro-plan",
      description: "Protocol Pro Plan",
      quantity: 1,
      unit_price: {
        amount: "49.99",
        currency: "USDC",
        decimals: 2
      }
    }
  ],
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
  capture: "immediate",
  payment_session: {
    scheme: "x402",
    session_id: "x402-session-001",
    resource: "https://merchant.example/x402/sessions/x402-session-001",
    network: "eip155:8453"
  },
  fulfillment_intent: {
    mode: "digital",
    destination_ref: "acct-buyer-001"
  }
};

export const invalidCheckoutRequestExample: any = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "checkout",
  request_id: "checkoutreq-invalid-001",
  requested_at: "2026-03-19T10:05:00Z",
  payer: {
    role: "payer",
    id: "buyer-001"
  },
  merchant: {
    role: "merchant",
    id: "merchant.example"
  },
  order_ref: {
    type: "purchase",
    id: "ord-1001"
  },
  items: [],
  amount_breakdown: {
    subtotal: { amount: "49.99", currency: "USDC" },
    total: { amount: "49.99", currency: "USDC" }
  },
  capture: "capture-later",
  payment_session: {
    scheme: "x402",
    resource: "https://merchant.example/x402/sessions/x402-session-001"
  },
  fulfillment_intent: {
    mode: "digital"
  }
};
