import { Modal, View, Text, Pressable, StyleSheet, Image } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Button } from "native-base";
import { Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function AddUserClass(classId, username, password) {
    console.log(classId);
    console.log(username);
    fetch("http://localhost:5000/Class/" + username + "/" + password, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: {
            gymClassId: classId,
        },
        mode: "cors",
    })
        .then((response) => {
            console.log(response);

            alert("Joined successfully");

            window.location.reload();
        })
        .catch((error) => {
            console.error(error);
        });
}

export default function ClassShower({ isVisible, children, onClose }) {
    const classData = JSON.parse(localStorage.getItem("class"));
    const user = JSON.parse(localStorage.getItem("user"));

    console.log(classData);

    return (
        <Modal animationType='slide' transparent={true} visible={isVisible}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{classData.name}</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name='close' color='#fff' size={30} />
                    </Pressable>
                </View>
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 25,
                        marginLeft: 50,
                        marginTop: 30,
                    }}>
                    Remaining slots: {classData.ticket}
                </Text>
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 25,
                        marginLeft: 50,
                        marginTop: 30,
                    }}>
                    Join Class
                </Text>
                <TouchableOpacity
                    onPress={() =>
                        AddUserClass(classData.id, user.username, user.password)
                    }>
                    <MaterialIcons
                        name='add'
                        color='green'
                        size={50}
                        style={styles.add}
                    />
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        height: "25%",
        width: "75%",
        backgroundColor: "#25292e",
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        bottom: 0,
        marginTop: "50%",
        marginLeft: "12.5%",
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
    buttonStyle: {
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
    },

    buttonDesign: {
        backgroundColor: "green",
        borderRadius: 100,
    },
    add: {
        marginLeft: 180,
        marginTop: -45,
    },
});
