import { useQuery } from "@tanstack/react-query";

import { api } from "~/infra/api";

export function useTasks() {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => {
      return api.getTasks();
    },
    queryKey: ["me", "tasks"],
  });

  return {
    tasks: tasks || [],
    loading: isLoading,
    error,
  };
}
