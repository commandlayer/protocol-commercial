export interface CleanRequest {
  // TODO: mirror protocol-commons clean.request.schema.json
  input: unknown;
}

export interface CleanReceipt {
  // TODO: mirror protocol-commons clean.receipt.schema.json
  cleaned: unknown;
  meta?: Record<string, unknown>;
}

/**
 * Runtime stub for the Commons "clean" verb.
 */
export async function handleClean(req: CleanRequest): Promise<CleanReceipt> {
  return {
    cleaned: req.input,
    meta: {
      note: "protocol-commercial/clean stub — replace with real implementation"
    }
  };
}
