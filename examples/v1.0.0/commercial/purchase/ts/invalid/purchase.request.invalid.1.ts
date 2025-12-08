export const purchaseRequestInvalid1: any = {
  x402: {
    verb: "purchase",
    version: "1.0.0"
  },
  trace: {
    trace_id: "trace-purchase-err-001"
  },
  actor: {
    id: "buyer-pc-err-001",
    kind: "user"
  },
  payload: {
    item_id: "item-ebook-001",
    quantity: 0,
    amount: {
      value: "9.99",
      asset: "USD"
    },
    settlement: {
      chain: "eip155:1",
      recipient: "creator.eth"
    }
  }
};
