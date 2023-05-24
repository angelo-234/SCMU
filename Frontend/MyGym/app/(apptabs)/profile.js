import React from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import QrCodeShower from "../../components/QrCodeShower";

export default function Profile() {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onAddSticker = () => {
        setIsModalVisible(true);
    };

    const onModalClose = () => {
        setIsModalVisible(false);
    };

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient
                    colors={["#3F51B5", "#03A9F4"]}
                    style={styles.linearGradient}>
                    <View style={styles.titleBar}>
                        <Ionicons
                            name='ios-arrow-back'
                            size={30}
                            color='white'
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />
                        <Ionicons
                            name='cog-outline'
                            size={30}
                            color='white'
                            onPress={() => {
                                navigation.navigate("Settings");
                            }}
                        />
                    </View>

                    <View style={styles.profileImage}>
                        <Image
                            source={require("../../assets/img/profile-pic.jpg")}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.add}>
                        <Ionicons
                            name='qr-code-outline'
                            size={30}
                            color='white'
                            onPress={onAddSticker}
                        />
                    </View>
                    <QrCodeShower
                        isVisible={isModalVisible}
                        onClose={onModalClose}></QrCodeShower>

                    <View style={styles.infoContainer}>
                        <Text style={[styles.text, styles.name]}>
                            {user.name}
                        </Text>
                    </View>

                    <View style={styles.statsContainer}>
                        <View style={styles.statsBox}>
                            <Text style={[styles.text, styles.statsValue]}>
                                55
                            </Text>
                            <Text style={[styles.text, styles.statsLabel]}>
                                Classes
                            </Text>
                        </View>
                    </View>

                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.mediaContainer}>
                        <View style={styles.mediaImageContainer}>
                            <Image
                                source={require("../../assets/img/media1.jpg")}
                                style={styles.mediaImage}
                                resizeMode='cover'
                            />
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image
                                source={require("../../assets/img/media1.jpg")}
                                style={styles.mediaImage}
                                resizeMode='cover'
                            />
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image
                                source={require("../../assets/img/media1.jpg")}
                                style={styles.mediaImage}
                                resizeMode='cover'
                            />
                        </View>
                    </ScrollView>
                    <View style={styles.mediaCount}>
                        <Text style={[styles.text, styles.statsValue]}>55</Text>
                        <Text style={[styles.text, styles.statsLabel]}>
                            Classes
                        </Text>
                    </View>

                    <View style={styles.statsBox}>
                        <Text style={[styles.text, styles.statsValue]}>
                            Peso: {user.weight} kg
                        </Text>
                        <Text style={[styles.text, styles.statsValue]}>
                            Altura: {user.height} cm
                        </Text>
                        <Text style={[styles.text, styles.statsValue]}>
                            Idade: {user.age}
                        </Text>
                        <Text style={[styles.text, styles.statsValue]}>
                            Sexo: {user.gender}
                        </Text>
                    </View>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    linearGradient: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: "hidden",
        marginBottom: 20,
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    add: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3F51B5",
        elevation: 5,
    },
    infoContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    text: {
        color: "#FFF",
        fontFamily: "Roboto",
        textAlign: "center",
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        width: "100%",
    },
    statsBox: {
        flex: 1,
        alignItems: "center",
    },
    statsValue: {
        fontSize: 20,
        fontWeight: "bold",
    },
    statsLabel: {
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginTop: 4,
    },
    mediaContainer: {
        marginBottom: 20,
    },
    mediaImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 10,
        overflow: "hidden",
        marginRight: 10,
    },
    mediaImage: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    mediaCount: {
        backgroundColor: "#3F51B5",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: "center",
        elevation: 5,
        marginTop: 10,
        marginBottom: 20,
    },
});
