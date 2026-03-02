import { Task } from "../models/TasksModel";

// services/TaskService.js
let tasks: Task[] = [];

export const TaskService = {
  getTasks: () => [...tasks],
  addTask: (title: string) => {
    const newTask: Task = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      title,
      completed: false,
    };
    tasks.push(newTask);
    return newTask;
  },
  removeTask: (id: string) => {
    tasks = tasks.filter((task) => task.id !== id);
  },
  resetTasks: () => {
    tasks = [];
  },
};
