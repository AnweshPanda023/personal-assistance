import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBar,
          { paddingBottom: insets.bottom + 10, marginLeft: insets.left + 10 }, // safe area + extra padding
        ],
        tabBarIcon: ({ focused }) => {
          let iconName: any;
          switch (route.name) {
            case "index":
              iconName = focused ? "home" : "home-outline";
              break;
            case "tasks":
              iconName = focused ? "list" : "list-outline";
              break;
            case "calendar":
              iconName = focused ? "calendar" : "calendar-outline";
              break;
            case "ai":
              iconName = focused ? "sparkles" : "sparkles-outline";
              break;
            case "analytics":
              iconName = focused ? "bar-chart" : "bar-chart-outline";
              break;
          }
          return (
            <View style={[{ alignItems: "center", justifyContent: "center" }]}>
              <Ionicons
                name={iconName}
                size={26} // slightly larger for smaller phones
                color={focused ? "#4CAF50" : "gray"}
                bottom={10}
              />
            </View>
          );
        },
      })}
    >
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="tasks" options={{ headerShown: false }} />
      <Tabs.Screen name="calendar" options={{ headerShown: false }} />
      <Tabs.Screen name="ai" options={{ headerShown: false }} />
      <Tabs.Screen name="analytics" options={{ headerShown: false }} />
      <Tabs.Screen
        name="profile/profile"
        options={{
          href: null, // ✅ Hides from tab bar completely
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 10, // distance from bottom
    height: 70,
    borderRadius: 25, // fully rounded corners
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around", // icons evenly spaced
    alignItems: "center",
    elevation: 5,
    alignSelf: "center",
    marginRight: 10,
  },
});
