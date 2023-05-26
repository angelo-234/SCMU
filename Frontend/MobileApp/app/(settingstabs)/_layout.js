import { Tabs } from "expo-router";

export default function Layout() {
    return (
        <Tabs
            initialRouteName='settings'
            screenOptions={{
                headerShown: false,
            }}></Tabs>
    );
}
