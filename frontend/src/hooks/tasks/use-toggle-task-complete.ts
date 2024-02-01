import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "~/infra/api";

import { useAppToast } from "../misc/use-app-toast";

export function useToggleTaskComplete() {
  const toast = useAppToast();
  const client = useQueryClient();

  const toggleTaskComplete = useMutation({
    mutationFn: (taskId: string) => {
      return api.toggleTaskComplete(taskId);
    },
    onSuccess: () => {
      toast.success("Updated.");
      client.invalidateQueries({
        queryKey: ["me", "tasks"],
      });
    },
  });

  return toggleTaskComplete;
}
