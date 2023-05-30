import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
    return (
        <Tabs
            initialRouteName='home2'
            screenOptions={{
                headerShown: false,
            }}>
            <Tabs.Screen
                name='selectBathroom'
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
                name='bathroomStatus'
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
                name='home2'
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='home' color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name='reserveSlot'
                options={{
                    title: "Reserve",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='person' color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}