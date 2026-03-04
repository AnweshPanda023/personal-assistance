// screens/TodoScreen.tsx
import { useTasks } from "@/src/hooks/task";
import { Task } from "@/src/models/TasksModel";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TaskList } from "./TaskList";

export default function TasksScreen() {
  const [taskInput, setTaskInput] = useState<string>("");
  const { tasks, addTask, removeTask, toggleTask } = useTasks();
  const handleAdd = () => {
    if (taskInput.trim()) {
      addTask(taskInput);
      setTaskInput("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Lists</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={taskInput}
          onChangeText={setTaskInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item: Task) => item.id}
        renderItem={({ item }: { item: Task }) => (
          <View style={styles.taskContainer}>
            <TaskList task={item} onRemove={removeTask} onToggle={toggleTask} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { marginTop: 15, fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  inputContainer: { flexDirection: "row", marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  taskContainer: {
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
