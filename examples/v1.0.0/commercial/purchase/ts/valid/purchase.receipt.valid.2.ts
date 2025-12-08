import type { PurchaseReceipt } from "./purchase.receipt.valid.1";

export const purchaseReceiptValid2: PurchaseReceipt = {
  x402: {
    verb: "purchase",
    version: "1.0.0",
    request_id: "req-purchase-2025-12-07-0002",
    network: "eip155:8453"
  },
  trace: {
    trace_id: "trace-purchase-0002",
    started_at: "2025-12-07T19:11:00Z",
    completed_at: "2025-12-07T19:11:02Z",
    duration_ms: 2000,
    provider: "commandlayer-demo",
    region: "us-west-2",
    model: "purchase-engine-001"
  },
  status: "success",
  result: {
    purchase_id: "purchase-002",
    status: "failed",
    amount: {
      value: "1000.00",
      asset: "USDC"
    },
    settlement: {
      chain: "eip155:8453",
      recipient: "0xEnterpriseVendor0000000000000000000001"
    },
    reason: "payment_rejected",
    metadata: {
      psp: "onchain-router",
      failure_code: "PAYMENT_REJECTED"
    }
  },
  usage: {
    tokens: 1400
  }
};
