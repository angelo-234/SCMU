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
    const [classTitle, setClassTitle] = useState("");
    const [classLotation, setClassLotation] = useState("");
    const [classDescription, setClassDescription] = useState("");
    const [classDay, setClassDay] = useState("");
    const [classMonth, setClassMonth] = useState("");
    const [classHour, setClassHour] = useState("");
    const router = useRouter();

    function CreateClass(
        classTitle,
        classLotation,
        classDay,
        classMonth,
        classHour,
        classDescription
    ) {
        const date = new Date(0);
        date.setUTCDate(classDay);
        date.setUTCMonth(classMonth - 1);
        date.setUTCHours(classHour);
        date.setUTCFullYear(2023);
        date.setUTCMilliseconds(555);

        const dateString = date.toISOString();

        const Lotation = parseInt(classLotation);
        console.log(classLotation);
        console.log(Lotation);

        fetch("http://localhost:5000/Class", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                lotation: Lotation,
                subject: classTitle,
                description: classDescription,
                date: dateString,
                participants: 0,
            }),
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
                <Text style={styles.LoginText}>Create Class</Text>
            </View>
            <View style={styles.text2}>
                <Text> Please enter the class information!</Text>
            </View>

            {/* Class Name Input Field */}
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
                        placeholder='Class Title'
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                        type='classTitle'
                        onChangeText={(text) => setClassTitle(text)}
                    />
                </View>
            </View>

            {/* Class Duration Input Field */}
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
                        placeholder='Class Lotation'
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                        onChangeText={(number) => setClassLotation(number)}
                    />
                </View>
            </View>

            {/* Class Time Input Field */}
            <View style={styles.buttonStyleX}>
                <View style={styles.emailInput}>
                    <Input
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name='clock' />}
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
                        placeholder='Class Day'
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                        type='classDay'
                        onChangeText={(text) => setClassDay(text)}
                    />
                </View>
            </View>
            <View style={styles.buttonStyleX}>
                <View style={styles.emailInput}>
                    <Input
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name='clock' />}
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
                        placeholder='Class Month'
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                        type='classTime'
                        onChangeText={(text) => setClassMonth(text)}
                    />
                </View>
            </View>
            <View style={styles.buttonStyleX}>
                <View style={styles.emailInput}>
                    <Input
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name='clock' />}
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
                        placeholder='Class Hour'
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                        type='classHour'
                        onChangeText={(text) => setClassHour(text)}
                    />
                </View>
            </View>

            {/* Class Description Input Field */}
            <View style={styles.buttonStyleX}>
                <View style={styles.emailInput}>
                    <Input
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name='quote-left' />}
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
                        placeholder='Class Description'
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                        type='classDiscription'
                        onChangeText={(text) => setClassDescription(text)}
                    />
                </View>
            </View>

            {/* Button */}
            <View style={styles.buttonStyle}>
                <Button
                    onPress={() => {
                        CreateClass(
                            classTitle,
                            classLotation,
                            classDay,
                            classMonth,
                            classHour,
                            classDescription
                        );
                    }}
                    style={styles.buttonDesign}>
                    CREATE
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
