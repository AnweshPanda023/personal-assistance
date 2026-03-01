import { useState } from "react";
import { Task } from "../models/TasksModel";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  return { tasks, addTask };
};
