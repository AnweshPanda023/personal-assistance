// hooks/useTasks.js
import { useEffect, useState } from "react";
import { Task } from "../models/TasksModel";
import { TaskService } from "../services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(TaskService.getTasks());
  }, []);

  const addTask = (taskName: string) => {
    const newTask = TaskService.addTask(taskName);
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id: string) => {
    TaskService.removeTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return { tasks, addTask, removeTask };
};
