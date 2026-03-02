// /app/index.tsx (Dashboard)
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Hello User X</Text>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => router.push("/profile/profile")}
        >
          <Ionicons name="person-circle" size={32} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Rest of the screen */}
      <View style={styles.content}>
        <Text>🏠 Welcome to your dashboard!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between", // title left, icon right
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 2,
    borderRadius: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
