export interface VerifyRequest {
  // TODO: align with commercial verify.request schema
  payload: unknown;
}

export interface VerifyReceipt {
  // TODO: align with commercial verify.receipt schema
  verified: boolean;
  reason?: string;
}

/**
 * Runtime stub for the commercial "verify" verb.
 */
export async function handleVerify(req: VerifyRequest): Promise<VerifyReceipt> {
  return {
    verified: false,
    reason: "protocol-commercial/verify stub — replace with real implementation"
  };
}
