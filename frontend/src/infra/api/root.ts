import { api } from "./axios";

export function getIndex() {
  return api.get("/");
}
