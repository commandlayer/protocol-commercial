export const shipRequestInvalid1: any = {
  x402: {
    verb: "ship",
    version: "1.0.0"
  },
  trace: {
    trace_id: "trace-ship-err-0001"
  },
  actor: {
    id: "fulfillment-service-err",
    kind: "service"
  },
  payload: {
    items: [
      {
        sku: "sku-shirt-black-m",
        quantity: 1
      }
    ],
    service_level: "express"
  }
};
