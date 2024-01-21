export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "unknown error";
}
