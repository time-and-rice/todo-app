import { api } from "./axios";

export function getTasks() {
  return api.get("/me/tasks");
}
