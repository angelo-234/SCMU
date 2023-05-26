import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Stack, useRouter } from "expo-router";

export default function Page() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/img/logo.png")}
                style={styles.logo}
            />
            <View style={styles.background}>
                <Text h1 style={styles.title}>
                    Welcome to Our Gym!
                </Text>
                <Text h3 style={styles.tagline}>
                    Let's start your fitness journey today.
                </Text>
                <Button
                    icon={<Icon name='user' size={15} color='white' />}
                    title='  Log into an Account'
                    buttonStyle={styles.buttonGreen}
                    onPress={() => router.push("/login")}
                />
                <Button
                    icon={<Icon name='user-plus' size={15} color='white' />}
                    title='  Create an Account'
                    buttonStyle={styles.buttonPurple}
                    onPress={() => router.push("/register")}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: -100,
        backgroundColor: "#F5F5F5",
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        marginTop: 100,
    },
    background: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 20,
        elevation: 4,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#38434D",
        marginTop: 20,
        marginBottom: 20,
        textAlign: "center",
    },
    tagline: {
        fontSize: 24,
        color: "#7C7C7C",
        textAlign: "center",
        marginHorizontal: 20,
        marginBottom: 40,
    },
    buttonGreen: {
        backgroundColor: "green",
        borderRadius: 30,
        width: "90%",
        marginBottom: 20,
        alignItems: "center",
        paddingLeft: 10,
        left: 10,
    },
    buttonPurple: {
        backgroundColor: "#841584",
        borderRadius: 30,
        width: "90%",
        paddingLeft: 10,
        left: 10,
    },
});
