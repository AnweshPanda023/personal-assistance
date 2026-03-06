import { auth } from "@/src/firebaseConfig";
import { Task } from "@/src/models/TasksModel";
import { useEffect, useState } from "react";
import { TaskService } from "../services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const user = auth.currentUser;
      if (user) {
        setIsReady(true);
      } else {
        // User not logged in yet, set as ready but empty
        setIsReady(true);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    setLoading(true);

    try {
      // Subscribe to all tasks
      const unsubscribe = TaskService.subscribeTasks((tasks: Task[]) => {
        setTasks(tasks);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.log("Error subscribing to tasks:", error);
      setLoading(false);
      setTasks([]);
    }
  }, [isReady]);

  const addTask = (title: string, dueDate?: Date, dueTime?: string) => {
    return TaskService.addTask(title, dueDate, dueTime);
  };

  const removeTask = (id: string) => {
    return TaskService.removeTask(id);
  };

  const toggleTask = (id: string, completed: boolean) => {
    return TaskService.toggleTask(id, completed);
  };

  const updateTask = (id: string, title: string) => {
    return TaskService.updateTask(id, title);
  };

  const updateTaskDate = (id: string, dueDate: Date) => {
    return TaskService.updateTaskDate(id, dueDate);
  };

  const updateTaskTime = (id: string, dueTime: string) => {
    return TaskService.updateTaskTime(id, dueTime);
  };

  const updateTaskDateAndTime = (
    id: string,
    dueDate: Date,
    dueTime: string,
  ) => {
    return TaskService.updateTaskDateAndTime(id, dueDate, dueTime);
  };

  const updateTaskWithDateTime = (
    id: string,
    title: string,
    dueDate: Date,
    dueTime?: string,
  ) => {
    return TaskService.updateTaskWithDateTime(id, title, dueDate, dueTime);
  };

  return {
    tasks,
    loading,
    addTask,
    removeTask,
    toggleTask,
    updateTask,
    updateTaskDate,
    updateTaskTime,
    updateTaskDateAndTime,
    updateTaskWithDateTime,
  };
};

// Hook to get tasks for a specific day
export const useTasksByDay = (date: Date | null) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const user = auth.currentUser;
      setIsReady(!!user);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!date || !isReady) return;

    setLoading(true);

    try {
      const unsubscribe = TaskService.subscribeTasksByDay(
        date,
        (tasks: Task[]) => {
          setTasks(tasks);
          setLoading(false);
        },
      );

      return () => unsubscribe();
    } catch (error) {
      console.log("Error subscribing to tasks by day:", error);
      setLoading(false);
      setTasks([]);
    }
  }, [date, isReady]);

  return { tasks, loading };
};
