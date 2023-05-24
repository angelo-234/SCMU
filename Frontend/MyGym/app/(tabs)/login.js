import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
    Input,
    NativeBaseProvider,
    Button,
    Icon,
    Box,
    Image,
    AspectRatio,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();

    const router = useRouter();

    function validateForm(username, password) {
        if (username.length > 0 && password.length > 0) {
            router.push("/home");
            //GetUser(username, password);
        } else {
            alert("Please enter your email and password");
        }
    }

    async function GetUser(username, password) {
        await fetch("http://localhost:5000/User/" + username + "/" + password, {
            method: "Get",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
            },
            mode: "cors",
        })
            .then(async (response) => {
                localStorage.setItem(
                    "user",
                    JSON.stringify(await response.json())
                );

                router.push("/home");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>Login</Text>
            <Text style={styles.signupText}>
                Don't have an account?{" "}
                <TouchableOpacity
                    onPress={() => {
                        router.push("/register");
                    }}>
                    <Text style={styles.signupLink}>Sign up</Text>
                </TouchableOpacity>
            </Text>

            {/* Username or Email Input Field */}
            <View style={styles.inputContainer}>
                <Input
                    InputLeftElement={
                        <Icon
                            as={<FontAwesome5 name='user-secret' />}
                            size='sm'
                            m={2}
                            _light={{
                                color: "black",
                            }}
                            _dark={{
                                color: "gray.300",
                            }}
                        />
                    }
                    variant='outline'
                    placeholder='Username'
                    _light={{
                        placeholderTextColor: "blueGray.400",
                    }}
                    _dark={{
                        placeholderTextColor: "blueGray.50",
                    }}
                    type='email'
                    onChangeText={(usernameInput) => setUsername(usernameInput)}
                />
            </View>

            {/* Password Input Field */}
            <View style={styles.inputContainer}>
                <Input
                    InputLeftElement={
                        <Icon
                            as={<FontAwesome5 name='key' />}
                            size='sm'
                            m={2}
                            _light={{
                                color: "black",
                            }}
                            _dark={{
                                color: "gray.300",
                            }}
                        />
                    }
                    variant='outline'
                    secureTextEntry={true}
                    placeholder='Password'
                    _light={{
                        placeholderTextColor: "blueGray.400",
                    }}
                    _dark={{
                        placeholderTextColor: "blueGray.50",
                    }}
                    type='password'
                    onChangeText={(passwordInput) => setPassword(passwordInput)}
                />
            </View>

            {/* Button */}
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        validateForm(username, password);
                    }}
                    style={styles.buttonDesign}>
                    LOGIN
                </Button>
            </View>

            <StatusBar style='auto' />
        </View>
    );
}

export default () => {
    return (
        <NativeBaseProvider>
            <Login />
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    loginText: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
    signupText: {
        fontSize: 16,
        marginBottom: 20,
    },
    signupLink: {
        fontWeight: "bold",
        color: "blue",
    },
    inputContainer: {
        marginBottom: 20,
        width: "100%",
    },
    buttonContainer: {
        width: "100%",
        marginBottom: 20,
    },
    buttonDesign: {
        backgroundColor: "green",
        borderRadius: 100,
    },
});
