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
    const [bathroomID, setBathroomID] = useState("");
    const [slotID, setSlotID] = useState("");
    const router = useRouter();

    function CreateClass(
        // bathroomID,
        // slotID,
    ) {

        fetch("http://localhost:8080/bathroom/" + bathroomID + "/" + slotID, {
            method: "POST",
            headers: {
            },
            mode: "cors",
        })
            .then((response) => {
                console.log(response);
                router.push("/home");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.Middle}>
                <Text style={styles.LoginText}>Reserve Bathroom Slot</Text>
            </View>
            <View style={styles.text2}>
                <Text> Please enter the desired slot!</Text>
            </View>

            {/* Bathroom ID Input Field */}
            <View style={styles.buttonStyle}>
                <View style={styles.emailInput}>
                    <Input
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name='marker' />}
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
                        placeholder='Bathroom ID'
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                        type='classTitle'
                        onChangeText={(text) => setBathroomID(text)}
                    />
                </View>
            </View>

            {/* Slot ID Input Field */}
            <View style={styles.buttonStyleX}>
                <View style={styles.emailInput}>
                    <Input
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name='hourglass' />}
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
                        placeholder='Slot ID'
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                        onChangeText={(number) => setSlotID(number)}
                    />
                </View>
            </View>

            {/* Button */}
            <View style={styles.buttonStyle}>
                <Button
                    onPress={() => {
                        CreateClass(
                            // bathroomID,
                            // slotID,
                        );
                    }}
                    style={styles.buttonDesign}>
                    RESERVE
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