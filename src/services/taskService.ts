import { Task } from "../models/TasksModel";

export const createTask = (title: string): Task => ({
  id: Date.now().toString(),
  title,
  completed: false,
});

export const toggleTaskById = (tasks: Task[], id: string): Task[] =>
  tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );

export const deleteTaskById = (tasks: Task[], id: string): Task[] =>
  tasks.filter((task) => task.id !== id);
