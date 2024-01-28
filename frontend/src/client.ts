import { QueryClient } from "@tanstack/react-query";

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchInterval: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});
