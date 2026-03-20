// examples/v1.1.0/commercial/authorize/ts/authorize.request.examples.ts

export interface Money {
  amount: string;
  currency: string;
  decimals?: number;
  includes?: "subtotal" | "tax" | "shipping" | "fees" | "discount" | "total";
}

export interface PaymentRequirement {
  scheme: "x402";
  resource: string;
  network?: string;
  max_amount: Money;
  payment_request_id?: string;
}

export interface AuthorizationScope {
  capture_mode: "manual" | "automatic";
  valid_until?: string;
  reusable?: boolean;
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

export interface AuthorizeRequest {
  protocol: "commercial";
  version: "1.1.0";
  verb: "authorize";
  request_id: string;
  requested_at: string;
  payer: ActorIdentity & { role: "payer" };
  payee: ActorIdentity & { role: "payee" };
  merchant: ActorIdentity & { role: "merchant" };
  amount: Money;
  authorization_scope: AuthorizationScope;
  payment_requirement?: PaymentRequirement;
  order_ref?: Reference;
  invoice_ref?: Reference;
  merchant_reference?: string;
  idempotency_key?: string;
}

export const validAuthorizeRequestExample: AuthorizeRequest = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "authorize",
  request_id: "authreq-001",
  requested_at: "2026-03-19T10:00:00Z",
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
  authorization_scope: {
    capture_mode: "manual",
    valid_until: "2026-03-20T10:00:00Z",
    reusable: false
  },
  payment_requirement: {
    scheme: "x402",
    resource: "https://merchant.example/x402/authorize/authreq-001",
    network: "eip155:8453",
    max_amount: {
      amount: "49.99",
      currency: "USDC",
      decimals: 2
    },
    payment_request_id: "x402-auth-001"
  },
  order_ref: {
    type: "order",
    id: "ord-1001"
  },
  invoice_ref: {
    type: "invoice",
    id: "inv-1001"
  },
  merchant_reference: "web-checkout-1001",
  idempotency_key: "authorize-1001"
};

export const invalidAuthorizeRequestExample: any = {
  protocol: "commercial",
  version: "1.1.0",
  verb: "authorize",
  request_id: "authreq-invalid-001",
  requested_at: "2026-03-19T10:00:00Z",
  payer: {
    role: "payer",
    id: "buyer-001"
  },
  payee: {
    role: "merchant",
    id: "merchant-settlement"
  },
  merchant: {
    role: "merchant",
    id: "merchant.example"
  },
  amount: {
    amount: 49.99,
    currency: "USDC"
  },
  authorization_scope: {
    capture_mode: "delayed"
  }
};
