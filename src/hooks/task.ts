import { useEffect, useState } from "react";
import { TaskService } from "../services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = TaskService.subscribeTasks(setTasks);
    return unsubscribe;
  }, []);

  return {
    tasks,
    addTask: TaskService.addTask,
    removeTask: TaskService.removeTask,
    toggleTask: TaskService.toggleTask,
  };
};
