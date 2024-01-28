import { appAxios } from "./axios";

export function getHome(): Promise<string> {
  return appAxios.get<string>("/").then((r) => r.data);
}
