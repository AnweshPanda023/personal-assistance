// hooks/useTasks.js
import { useState, useEffect } from "react";
import { TaskService } from "../services/taskService";
import { Task } from "../models/Tasks";

export const useTasks = () => {
  const [tasks, setTasks] =  useState<Task[]>([]);

  useEffect(() => {
    setTasks(TaskService.getTasks());
  }, []);

  const addTask = (taskName : string) => {
    const newTask = TaskService.addTask(taskName);
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id : string) => {
    TaskService.removeTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return { tasks, addTask, removeTask };
};
