export const authorizeReceiptInvalid1: any = {
  x402: {
    verb: "authorize",
    version: "1.0.0"
  },
  trace: {
    trace_id: "auth-trace-err-003",
    started_at: "2025-12-07T18:43:00Z",
    completed_at: "2025-12-07T18:43:01Z",
    duration_ms: 1000
  },
  status: "ok",
  result: {
    status: "ok",
    metadata: {
      note: "completely wrong enums"
    }
  }
};
