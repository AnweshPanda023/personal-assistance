import { auth, db } from "@/src/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const getTaskCollection = () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");
  return collection(db, "users", user.uid, "tasks");
};

// Helper function to format date as YYYY-MM-DD
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const TaskService = {
  // Subscribe to all tasks
  subscribeTasks: (callback: any) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        callback([]);
        return () => {};
      }

      let unsubscribeRef: any = null;

      try {
        unsubscribeRef = onSnapshot(
          getTaskCollection(),
          (snapshot) => {
            const tasks = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            callback(tasks);
          },
          (error: any) => {
            // Silently ignore all errors - don't log, don't throw
            callback([]);
          },
        );
      } catch (error) {
        // Silently catch any setup errors
        callback([]);
      }

      return () => {
        if (unsubscribeRef) {
          try {
            unsubscribeRef();
          } catch (e) {
            // Ignore unsubscribe errors
          }
        }
      };
    } catch (error) {
      callback([]);
      return () => {};
    }
  },

  // Subscribe to tasks for a specific day
  subscribeTasksByDay: (date: Date, callback: any) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        callback([]);
        return () => {};
      }

      const dateStr = formatDate(date);
      const tasksRef = getTaskCollection();
      const q = query(tasksRef, where("dueDate", "==", dateStr));

      let unsubscribeRef: any = null;

      try {
        unsubscribeRef = onSnapshot(
          q,
          (snapshot) => {
            const tasks = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            callback(tasks);
          },
          (error: any) => {
            // Silently ignore all errors
            callback([]);
          },
        );
      } catch (error) {
        // Silently catch any setup errors
        callback([]);
      }

      return () => {
        if (unsubscribeRef) {
          try {
            unsubscribeRef();
          } catch (e) {
            // Ignore unsubscribe errors
          }
        }
      };
    } catch (error) {
      callback([]);
      return () => {};
    }
  },

  // Add task with specific day and optional time
  addTask: async (title: string, dueDate?: Date, dueTime?: string) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not logged in");
      }

      const payload: any = {
        title,
        completed: false,
        createdAt: new Date(),
      };

      if (dueDate) {
        payload.dueDate = formatDate(dueDate);
      }

      if (dueTime) {
        payload.dueTime = dueTime;
      }

      await addDoc(getTaskCollection(), payload);
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  },

  // Remove task
  removeTask: async (id: string) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not logged in");
      }
      await deleteDoc(doc(getTaskCollection(), id));
    } catch (error) {
      console.error("Error removing task:", error);
      throw error;
    }
  },

  // Toggle task completion
  toggleTask: async (id: string, completed: boolean) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not logged in");
      }
      await updateDoc(doc(getTaskCollection(), id), {
        completed: !completed,
      });
    } catch (error) {
      console.error("Error toggling task:", error);
      throw error;
    }
  },

  // Update task
  updateTask: async (id: string, title: string) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not logged in");
      }
      await updateDoc(doc(getTaskCollection(), id), {
        title,
      });
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  // Update only task date
  updateTaskDate: async (id: string, dueDate: Date) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not logged in");
      }
      await updateDoc(doc(getTaskCollection(), id), {
        dueDate: formatDate(dueDate),
      });
    } catch (error) {
      console.error("Error updating task date:", error);
      throw error;
    }
  },

  // Update only task time
  updateTaskTime: async (id: string, dueTime: string) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not logged in");
      }
      await updateDoc(doc(getTaskCollection(), id), {
        dueTime,
      });
    } catch (error) {
      console.error("Error updating task time:", error);
      throw error;
    }
  },

  // Update task date and time
  updateTaskDateAndTime: async (id: string, dueDate: Date, dueTime: string) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not logged in");
      }
      await updateDoc(doc(getTaskCollection(), id), {
        dueDate: formatDate(dueDate),
        dueTime,
      });
    } catch (error) {
      console.error("Error updating task date and time:", error);
      throw error;
    }
  },

  // Update task with date and time
  updateTaskWithDateTime: async (
    id: string,
    title: string,
    dueDate: Date,
    dueTime?: string,
  ) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not logged in");
      }
      const payload: any = {
        title,
        dueDate: formatDate(dueDate),
      };

      if (dueTime) {
        payload.dueTime = dueTime;
      }

      await updateDoc(doc(getTaskCollection(), id), payload);
    } catch (error) {
      console.error("Error updating task with date and time:", error);
      throw error;
    }
  },
};
