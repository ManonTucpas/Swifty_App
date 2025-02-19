import React from "react";
import { Tabs } from "expo-router";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Icon } from "@/components/ui/icon"
import { ArrowLeft, House, User } from "lucide-react-native"
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Pressable } from "react-native";

export default function TabLayout() {

  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#888888",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 4,
        },
        tabBarStyle: {
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <Icon className="text-typography-500" as={House} color={focused ? "#000000" : "#888888"} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={({ navigation }) => ({
          title: "Profile",
          tabBarIcon: ({ focused }) => <Icon className="text-typography-500" as={User} color={focused ? "#000000" : "#888888"} />,
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate("home")} className="p-4" >
              <ArrowLeft color="black" />
            </Pressable>
          )
        })}
      />
    </Tabs>
  );
}
