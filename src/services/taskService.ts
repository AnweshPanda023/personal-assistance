import { auth, db } from "@/src/firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

const getTaskCollection = () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  return collection(db, "users", user.uid, "tasks");
};

export const TaskService = {
  subscribeTasks: (callback: any) => {
    return onSnapshot(getTaskCollection(), (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(tasks);
    });
  },

  addTask: async (title: string) => {
    await addDoc(getTaskCollection(), {
      title,
      completed: false,
      createdAt: new Date(),
    });
  },

  removeTask: async (id: string) => {
    await deleteDoc(doc(getTaskCollection(), id));
  },

  toggleTask: async (id: string, completed: boolean) => {
    await updateDoc(doc(getTaskCollection(), id), {
      completed: !completed,
    });
  },
};
