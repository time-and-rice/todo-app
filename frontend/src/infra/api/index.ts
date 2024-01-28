import { getHome } from "./root";
import { CreateTask, createTask, deleteTask, getTasks } from "./tasks";

export const api = {
  // root
  getHome,

  // tasks
  getTasks,
  createTask,
  deleteTask,
};

export type { CreateTask };
