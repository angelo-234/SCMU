import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import ClassShower from "../../components/ClassShower";

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
};

export default function Classes() {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [items, setItems] = useState({});

    useEffect(() => {
        GetClasses();
    }, []);

    const onAddSticker = () => {
        setIsModalVisible(true);
    };

    const onModalClose = () => {
        setIsModalVisible(false);
    };

    async function GetClasses() {
        try {
            const response = await fetch(
                "http://localhost:5000/Class/available",
                {
                    method: "GET",
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "application/json",
                    },
                    mode: "cors",
                }
            );
            const classes = await response.json();
            localStorage.setItem("allclasses", JSON.stringify(classes));
            loadItems();
        } catch (error) {
            console.error(error);
        }
    }

    const loadItems = () => {
        const classes = JSON.parse(localStorage.getItem("allclasses"));
        console.log(classes);
        console.log(classes[0].date);

        const newItems = {};

        for (let i = 0; i < classes.length; i++) {
            const time = timeToString(classes[i].date);

            const ticket = classes[i].lotation - classes[i].participants;

            if (!newItems[time]) {
                newItems[time] = [];
            }

            newItems[time].push({
                name: classes[i].description,
                day: classes[i].date,
                ticket: ticket,
                id: classes[i].id,
            });
        }

        console.log(newItems);

        setItems(newItems);
    };

    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                <Card>
                    <Card.Content>
                        <TouchableOpacity
                            onPress={() => {
                                localStorage.setItem(
                                    "class",
                                    JSON.stringify(item)
                                );
                                onAddSticker();
                            }}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                        <ClassShower
                            isVisible={isModalVisible}
                            onClose={onModalClose}></ClassShower>
                    </Card.Content>
                </Card>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                showClosingKnob={true}
                refreshing={true}
                renderItem={renderItem}
                theme={{
                    agendaDayTextColor: "black",
                    agendaTodayColor: "green",
                    monthTextColor: "grey",
                    textDefaultColor: "maroon",
                    todayBackgroundColor: "#90EE90",
                    selectedDayBackgroundColor: "green",
                    dotColor: "green",
                    textDisabledColor: "grey",
                }}
                onDayPress={(day) => {
                    console.log("selected day", day);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
    item: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
});
