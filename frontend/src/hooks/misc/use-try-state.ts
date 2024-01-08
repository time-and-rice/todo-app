import { useState } from "react";

export function useTryState() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  return {
    loading,
    setLoading,
    error,
    setError,
  };
}
