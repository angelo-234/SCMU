import { StatusBar } from "expo-status-bar";
import React from "react";
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
import { alignContent, flex, flexDirection, width } from "styled-system";
import { useRouter } from "expo-router";
import { TextInput, NumberInput } from "react-native-gesture-handler";
import { useState } from "react";

function Create() {
    const [bathroomID, setClassTitle] = useState("");
    const router = useRouter();
    const bathroomNumber = 0;

    function addBathroom(
    ) {
        bathroomNumber++;
        fetch("http://localhost:8080/bathroom/" + bathroomNumber, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            mode: "cors",
        })
            .then((response) => {
                console.log(response);
                router.push("/home");
            })
            .catch((error) => {
                console.error(error);
                bathroomNumber--;
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.Middle}>
                <Text style={styles.LoginText}>Create Bathroom</Text>
            </View>
            <View style={styles.text2}>
                <Text> Please enter the class information!</Text>
            </View>

            
            {/* Button */}
            <View style={styles.buttonStyle}>
                <Button
                    onPress={() => {
                        addBathroom(
                        );
                    }}
                    style={styles.buttonDesign}>
                    ADD BATHROOM
                </Button>
            </View>

            {/* Line */}

            <StatusBar style='auto' />
        </View>
    );
}

export default () => {
    return (
        <NativeBaseProvider>
            <Create />
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    LoginText: {
        marginTop: 100,
        fontSize: 30,
        fontWeight: "bold",
    },
    Middle: {
        alignItems: "center",
        justifyContent: "center",
    },
    text2: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 5,
    },
    signupText: {
        fontWeight: "bold",
    },
    emailField: {
        marginTop: 30,
        marginLeft: 15,
    },
    emailInput: {
        marginTop: 10,
        marginRight: 5,
    },
    buttonStyle: {
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
    },
    buttonStyleX: {
        marginTop: 12,
        marginLeft: 15,
        marginRight: 15,
    },
    buttonDesign: {
        backgroundColor: "#841584",
        borderRadius: 100,
    },
    lineStyle: {
        flexDirection: "row",
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        alignItems: "center",
    },
    imageStyle: {
        width: 80,
        height: 80,
        marginLeft: 20,
    },
    boxStyle: {
        flexDirection: "row",
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: "space-around",
    },
});
