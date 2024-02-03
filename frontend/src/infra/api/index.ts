import { getHome } from "./root";
import {
  CreateTask,
  createTask,
  deleteTask,
  getTasks,
  Task,
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

export type { CreateTask, Task };
