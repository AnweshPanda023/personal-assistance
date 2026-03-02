import { Task } from "@/src/models/TasksModel";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TaskListProps {
  task: Task;
  onRemove: (id: string) => void;
}

export const TaskList = ({ task, onRemove }: TaskListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{task.title}</Text>
      <TouchableOpacity onPress={() => onRemove(task.id)}>
        <Text style={styles.remove}>❌</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  text: { fontSize: 18 },
  remove: { fontSize: 18, color: "red" },
});
