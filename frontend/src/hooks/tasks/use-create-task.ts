import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api, CreateTask } from "~/infra/api";

import { useAppToast } from "../misc/use-app-toast";

export function useCreateTask() {
  const toast = useAppToast();
  const client = useQueryClient();

  const createTask = useMutation({
    mutationFn: (v: CreateTask) => {
      return api.createTask(v);
    },
    onSuccess: () => {
      toast.success("Created.");
      client.invalidateQueries({
        queryKey: ["me", "tasks"],
      });
    },
  });

  return createTask;
}
