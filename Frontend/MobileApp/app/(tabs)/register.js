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
import { ScrollView } from "react-native-gesture-handler";

function CreateUser(
    username,
    email,
    password,
    name,
    age,
    qrCode,
    weight,
    canSaveData,
    height,
    gender
) {
    fetch("http://localhost:5000/User", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            name: name,
            age: age,
            qrCode: qrCode,
            weight: weight,
            canSaveData: canSaveData,
            height: height,
            gender: gender,
        }),
        mode: "cors",
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
}

function Login() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [qrCode, setQrCode] = useState("");
    const [weight, setWeight] = useState("");
    const [canSaveData, setCanSaveData] = useState("");
    const [height, setHeight] = useState("");
    const [gender, setGender] = useState("");

    const router = useRouter();

    function validateForm() {
        if (email.length > 0 && password.length > 0) {
            const parsedAge = parseInt(age);
            const parsedWeight = parseInt(weight);
            const parsedHeight = parseInt(height);
            const parsedCanSaveData = true;
            CreateUser(
                username,
                email,
                password,
                name,
                parsedAge,
                qrCode,
                parsedWeight,
                parsedCanSaveData,
                parsedHeight,
                gender
            );
        } else {
            alert("Please enter your email and password");
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity
                    onPress={() => {
                        router.push("/");
                    }}
                    style={styles.backIcon}>
                    <Icon
                        as={<FontAwesome5 name='arrow-alt-circle-left' />}
                        size='lg'
                        m={2}
                        _light={{
                            color: "gray.500",
                        }}
                        _dark={{
                            color: "gray.300",
                        }}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Sign Up</Text>
                <TouchableOpacity
                    onPress={() => {
                        router.push("/login");
                    }}>
                    <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
            </View>

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
                    placeholder='Username'
                    type='username'
                    onChangeText={(usernameInput) => setUsername(usernameInput)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Input
                    InputLeftElement={
                        <Icon
                            as={<FontAwesome5 name='address-book' />}
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
                    placeholder='Email'
                    type='email'
                    onChangeText={(emailInput) => setEmail(emailInput)}
                />
            </View>

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
                    secureTextEntry={true}
                    placeholder='Password'
                    type='password'
                    onChangeText={(passwordInput) => setPassword(passwordInput)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Input
                    InputLeftElement={
                        <Icon
                            as={<FontAwesome5 name='address-book' />}
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
                    placeholder='Name'
                    type='name'
                    onChangeText={(nameInput) => setName(nameInput)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Input
                    InputLeftElement={
                        <Icon
                            as={<FontAwesome5 name='address-book' />}
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
                    placeholder='Age'
                    type='age'
                    onChangeText={(ageInput) => setAge(ageInput)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Input
                    InputLeftElement={
                        <Icon
                            as={<FontAwesome5 name='address-book' />}
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
                    placeholder='QR Code'
                    type='qrCode'
                    onChangeText={(qrCodeInput) => setQrCode(qrCodeInput)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Input
                    InputLeftElement={
                        <Icon
                            as={<FontAwesome5 name='address-book' />}
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
                    placeholder='Weight'
                    type='weight'
                    onChangeText={(weightInput) => setWeight(weightInput)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Input
                    InputLeftElement={
                        <Icon
                            as={<FontAwesome5 name='address-book' />}
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
                    placeholder='Can Save Data'
                    type='canSaveData'
                    onChangeText={(canSaveDataInput) =>
                        setCanSaveData(canSaveDataInput)
                    }
                />
            </View>

            <View style={styles.inputContainer}>
                <Input
                    InputLeftElement={
                        <Icon
                            as={<FontAwesome5 name='address-book' />}
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
                    placeholder='Height'
                    type='height'
                    onChangeText={(heightInput) => setHeight(heightInput)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Input
                    InputLeftElement={
                        <Icon
                            as={<FontAwesome5 name='address-book' />}
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
                    placeholder='Gender'
                    type='gender'
                    onChangeText={(genderInput) => setGender(genderInput)}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        validateForm();
                    }}
                    style={styles.buttonDesign}>
                    Sign Up
                </Button>
            </View>

            <StatusBar style='auto' />
        </ScrollView>
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
        flexGrow: 1,
        backgroundColor: "#fff",
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        marginTop: 50,
    },
    backIcon: {
        marginTop: 5,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    },
    loginLink: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
        color: "green",
        marginTop: 10,
    },
    inputContainer: {
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 20,
    },
    buttonDesign: {
        backgroundColor: "green",
        borderRadius: 100,
    },
});
