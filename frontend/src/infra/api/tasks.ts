import { api } from "./axios";

type Task = {
  id: string;
  title: string;
  status: "Incomplete" | "Complete";
  createdAt: string;
  updatedAt: string;
};

export function getTasks(): Promise<Task[]> {
  return api.get<Task[]>("/me/tasks").then((r) => r.data);
}

type CreateTask = {
  title: string;
};

export function createTask(input: CreateTask) {
  return api.post("/me/tasks", input);
}

export function deleteTask(taskId: string) {
  return api.delete(`/me/tasks/${taskId}`);
}
