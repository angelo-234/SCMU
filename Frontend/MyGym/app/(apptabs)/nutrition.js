import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
    TouchableOpacity,
    Modal,
} from "react-native";
import { Card } from "react-native-paper";
import { Agenda } from "react-native-calendars";

export default function NutritionAppointment() {
    const [appointmentDate, setAppointmentDate] = useState("");
    const [notes, setNotes] = useState({});
    const [items, setItems] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [requestName, setRequestName] = useState("");
    const [requestDate, setRequestDate] = useState("");
    const [requestTime, setRequestTime] = useState("");

    const scheduleAppointment = () => {
        if (appointmentDate !== "") {
            const newItems = { ...items };
            newItems[appointmentDate] = newItems[appointmentDate] || [];
            newItems[appointmentDate].push({
                date: appointmentDate,
                notes: "",
            });
            setItems(newItems);
            setAppointmentDate("");
        }
    };

    const updateNotes = (day, index, text) => {
        const newItems = { ...items };
        newItems[day][index].notes = text;
        setItems(newItems);
    };

    const renderItem = (item, firstItemInDay) => (
        <View style={styles.item}>
            <Card>
                <Card.Content>
                    <TouchableOpacity onPress={() => {}}>
                        <Text>Date: {item.date}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Enter notes'
                            onChangeText={(text) =>
                                updateNotes(item.date, firstItemInDay, text)
                            }
                            value={item.notes}
                        />
                    </TouchableOpacity>
                </Card.Content>
            </Card>
        </View>
    );

    const submitRequest = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nutrition Appointment</Text>
            <Button
                title='Request Nutrition Appointment'
                onPress={() => setModalVisible(true)}
            />
            <Agenda
                items={items}
                loadItemsForMonth={(month) => {
                    console.log("triggered items loading");
                }}
                renderItem={renderItem}
                refreshing={true}
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
            />

            <Modal visible={modalVisible} animationType='slide'>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Request Nutrition Appointment
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter name'
                        onChangeText={(text) => setRequestName(text)}
                        value={requestName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Enter date'
                        onChangeText={(text) => setRequestDate(text)}
                        value={requestDate}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Enter time'
                        onChangeText={(text) => setRequestTime(text)}
                        value={requestTime}
                    />
                    <Button title='Submit Request' onPress={submitRequest} />
                    <Button
                        title='Cancel'
                        onPress={() => setModalVisible(false)}
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#38434D",
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        width: "80%",
        marginBottom: 20,
    },
    item: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
});
