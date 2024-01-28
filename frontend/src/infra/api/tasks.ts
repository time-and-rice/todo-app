import { appAxios } from "./axios";

type Task = {
  id: string;
  title: string;
  status: "Incomplete" | "Complete";
  createdAt: string;
  updatedAt: string;
};

export function getTasks(): Promise<Task[]> {
  return appAxios.get<Task[]>("/me/tasks").then((r) => r.data);
}

export type CreateTask = {
  title: string;
};

export function createTask(input: CreateTask) {
  return appAxios.post("/me/tasks", input);
}

export function deleteTask(taskId: string) {
  return appAxios.delete(`/me/tasks/${taskId}`);
}