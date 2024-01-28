import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "~/infra/api";

import { useAppToast } from "../misc/use-app-toast";

export function useDeleteTask() {
  const toast = useAppToast();
  const client = useQueryClient();

  const deleteTask = useMutation({
    mutationFn: (taskId: string) => {
      return api.deleteTask(taskId);
    },
    onSuccess: () => {
      toast.success("Deleted");
      client.invalidateQueries({
        queryKey: ["me", "tasks"],
      });
    },
  });

  return deleteTask;
}
