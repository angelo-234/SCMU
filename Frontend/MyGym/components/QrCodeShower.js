import { Modal, View, Text, Pressable, StyleSheet, Image } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function QrCodeShower({ isVisible, children, onClose }) {
    return (
        <Modal animationType='slide' transparent={true} visible={isVisible}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Your Qr Code</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name='close' color='#fff' size={30} />
                    </Pressable>
                </View>
                <Image
                    source={require("../assets/img/QRCODE.png")}
                    style={styles.image}
                    resizeMode='cover'></Image>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        height: "50%",
        width: "100%",
        backgroundColor: "#25292e",
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        bottom: 0,
        marginTop: "50%",
    },
    titleContainer: {
        height: "16%",
        backgroundColor: "#464C55",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        color: "#fff",
        fontSize: 16,
    },
    image: {
        marginLeft: 50,
        marginTop: 20,
    },
});
