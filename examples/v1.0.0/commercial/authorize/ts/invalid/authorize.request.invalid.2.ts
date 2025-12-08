export const authorizeRequestInvalid2: any = {
  x402: {
    verb: "authorize",
    version: "1.0.0"
  },
  trace: {
    trace_id: "auth-trace-err-002"
  },
  actor: {
    id: "buyer-999",
    kind: "user"
  },
  payload: {
    purpose: "some purpose only"
  },
  extra_field: "not allowed"
};
