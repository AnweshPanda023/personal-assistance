import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { auth, db } from "@/src/firebaseConfig";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      // 🔥 If not logged in → go to login
      if (!user) {
        router.replace("/(auth)/login"); // Correct route path - no leading slash

        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setDisplayName(data.displayName);
          setUsername(data.username);
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/(auth)/login"); // Correct route path - no leading slash
  };

  const MenuButton = ({
    title,
    onPress,
  }: {
    title: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity onPress={onPress} style={styles.menuButton}>
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <Text style={styles.headerText}>👤 Profile</Text>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImage} />
        <Text style={styles.userName}>Hello {displayName || "User"}</Text>
        <Text style={styles.userEmail}>Bio</Text>
      </View>

      {/* Menu Buttons */}
      <View style={styles.menuContainer}>
        <MenuButton title="⚙️ Settings" />
        <MenuButton title="✏️ Edit Profile" />
        <MenuButton title="📘 Learn More" />
        <MenuButton title="📞 Contact Us" />
        <MenuButton
          title="🏠 Dashboard"
          onPress={() => router.replace("/(tabs)")}
        />
        <MenuButton title="🚪 Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#ccc",
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
  },
  userEmail: {
    fontSize: 14,
    color: "gray",
  },
  menuContainer: {
    gap: 15,
  },
  menuButton: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 12,
  },
  menuText: {
    fontSize: 16,
  },
});
