import { getHome } from "./root";
import {
  CreateTask,
  createTask,
  deleteTask,
  getTasks,
  toggleTaskComplete,
} from "./tasks";

export const api = {
  // root
  getHome,

  // tasks
  getTasks,
  createTask,
  deleteTask,
  toggleTaskComplete,
};

export type { CreateTask };
