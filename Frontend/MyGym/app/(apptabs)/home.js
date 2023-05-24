import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, Tabs } from "expo-router";

export default function Home() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.title}>Home Page!</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate("Classes");
                    }}>
                    <Ionicons name='calendar-outline' size={24} color='white' />
                    <Text style={styles.buttonText}>Go to Classes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate("Profile");
                    }}>
                    <Ionicons name='person-outline' size={24} color='white' />
                    <Text style={styles.buttonText}>Go to your Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24,
        backgroundColor: "#F5F5F5",
    },
    main: {
        flex: 1,
        justifyContent: "center",
        maxWidth: 960,
        width: "100%",
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 64,
        fontWeight: "bold",
        color: "#38434D",
        marginBottom: 40,
        textAlign: "center",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#841584",
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        marginLeft: 10,
    },
});
