import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
    return (
        <Tabs
            initialRouteName='home'
            screenOptions={{
                headerShown: false,
            }}>
            <Tabs.Screen
                name='classes'
                options={{
                    title: "Classes",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name='calendar-outline'
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='workoutplanner'
                options={{
                    title: "Workout",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name='barbell-outline'
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='home'
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='home' color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='person' color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name='nutrition'
                options={{
                    title: "Nutrition",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name='nutrition-outline'
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
