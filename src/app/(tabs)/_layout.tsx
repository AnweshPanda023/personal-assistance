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
          { paddingBottom: insets.bottom + 10, backgroundColor: "#f4f4f4" }, // safe area + extra padding
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
    </Tabs>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    height: 70,
    // borderRadius: 25,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    // marginRight: 10,

    // Android
    elevation: 8,

    // iOS + Web
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
});
