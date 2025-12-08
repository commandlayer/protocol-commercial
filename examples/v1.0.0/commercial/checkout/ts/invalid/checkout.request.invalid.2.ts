export const checkoutRequestInvalid2: any = {
  x402: {
    verb: "checkout",
    version: "1.0.0"
  },
  trace: {
    trace_id: "trace-checkout-err-002"
  },
  actor: {
    id: "buyer-ck-err-002",
    kind: "user"
  },
  payload: {
    items: [
      {
        sku: "sku-product-001",
        quantity: 1
      }
    ]
  },
  unexpected: "extra field not allowed"
};
