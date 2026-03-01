import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import TasksScreen from "../components/task/TasksScreen";
import { BottomTabParamList } from "../models/NavigationModel";

// import DashboardScreen from "../components/dashboard/DashboardScreen";
// import TasksScreen from "../components/tasks/TasksScreen";
// import CalendarScreen from "../components/calendar/CalendarScreen";
// import AIScreen from "../components/ai/AIScreen";
// import AnalyticsScreen from "../components/analytics/AnalyticsScreen";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => {
          let iconName: any;

          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Tasks") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Calendar") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "AI") {
            iconName = focused ? "sparkles" : "sparkles-outline";
          } else if (route.name === "Analytics") {
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          }

          return (
            <View style={focused ? styles.activeIcon : undefined}>
              <Ionicons
                name={iconName}
                size={24}
                color={focused ? "#4CAF50" : "gray"}
              />
            </View>
          );
        },
      })}
    >
      {/* <Tab.Screen name="Dashboard" component={DashboardScreen} /> */}
      <Tab.Screen name="Tasks" component={TasksScreen} />
      {/* <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="AI" component={AIScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 25,
    backgroundColor: "#fff",
    elevation: 5,
  },
  activeIcon: {
    backgroundColor: "#E8F5E9",
    padding: 10,
    borderRadius: 20,
  },
});
