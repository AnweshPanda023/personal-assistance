import { auth, db } from "@/src/firebaseConfig";
import { useRouter } from "expo-router";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const TaskSettingsScreen = () => {
  const router = useRouter();

  const [taskInput, setTaskInput] = useState("");
  const [taskCount, setTaskCount] = useState(0);

  const getTasksCountByTitle = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "User not logged in");
      return;
    }

    if (!taskInput.trim()) {
      Toast.show({
        type: "error",
        text1: "Enter a Task Title",
      });
      return;
    }

    const q = query(
      collection(db, "users", user.uid, "tasks"),
      where("title", "==", taskInput),
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      setTaskCount(0);
      Toast.show({
        type: "error",
        text1: "No tasks found",
      });
      return;
    } else {
      Toast.show({
        type: "success",
        text1: `${snapshot.size} tasks found`,
      });
    }

    setTaskCount(snapshot.size);
  };

  const deleteTasksByTitle = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "User not logged in");
      return;
    }

    const q = query(
      collection(db, "users", user.uid, "tasks"),
      where("title", "==", taskInput),
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      setTaskCount(0);

      Toast.show({
        type: "error",
        text1: "No tasks found",
      });
      return;
    }

    const deletions = snapshot.docs.map((task) =>
      deleteDoc(doc(db, "users", user.uid, "tasks", task.id)),
    );

    await Promise.all(deletions);

    setTaskCount(0);
    setTaskInput("");

    Toast.show({
      type: "success",
      text1: `${snapshot.size} tasks deleted`,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Deletion Settings</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        placeholderTextColor="#999"
        value={taskInput}
        onChangeText={setTaskInput}
      />

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={getTasksCountByTitle}
      >
        <Text style={styles.buttonText}>Get Task Count</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardText}>Tasks Found</Text>
        <Text style={styles.count}>{taskCount}</Text>
      </View>

      <TouchableOpacity
        style={[styles.deleteButton, taskCount === 0 && { opacity: 0.5 }]}
        onPress={deleteTasksByTitle}
        disabled={taskCount === 0}
      >
        <Text style={styles.buttonText}>Delete All</Text>
      </TouchableOpacity>

      <View style={styles.navButtons}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/(tabs)")}
        >
          <Text style={styles.buttonText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },

  primaryButton: {
    backgroundColor: "#1976D2",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },

  deleteButton: {
    backgroundColor: "#E53935",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  secondaryButton: {
    flex: 1,
    backgroundColor: "#555",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  navButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 30,
  },

  buttonText: {
    color: "white",
    fontWeight: "500",
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    elevation: 2,
  },

  cardText: {
    fontSize: 16,
    color: "#777",
  },

  count: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 5,
  },
});
