import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet, Button,Alert } from 'react-native';

export default function TimeSlotScreen() {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const navigation = useNavigation();

  // Generate the timeslots for the current day (48 slots)
  const timeslots = [];
  const startTime = new Date();
  startTime.setHours(0, 0, 0, 0); // Set start time to midnight
  const halfHour = 30 * 60 * 1000; // 30 minutes in milliseconds
  for (let i = 0; i < 48; i++) {
    const timeslotTime = new Date(startTime.getTime() + i * halfHour);
    timeslots.push(timeslotTime);
  }

  // Function to handle timeslot selection
  const handleTimeslotSelection = (timeslot) => {
    setSelectedSlot(timeslot);
  };

  // Function to handle submitting the timeslot
  const handleConfirm = () => {
    if (!selectedSlot) {
      // Notify the user if no timeslot is selected
      Alert.alert('Error', 'Please select a timeslot.');
      return;
    }

    // Add your logic here to handle the selected timeslot
    Alert.alert("Timeslot submitted")

    //http request to confirm user timeslot.

    setSelectedSlot(null); // Reset the selected timeslot after handling

    //navigation.navigate("home2");
  };

  // Get the current date as a string
  const currentDate = new Date().toLocaleDateString();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentDate}</Text>
      <Text style={styles.subtitle}>Select Timeslot</Text>
      <View style={styles.timeslotContainer}>
        {timeslots.map(timeslot => (
          <TouchableOpacity
            key={timeslot}
            style={[
              styles.timeslot,
              selectedSlot === timeslot && styles.selectedTimeslot
            ]}
            onPress={() => handleTimeslotSelection(timeslot)}
          >
            <Text style={styles.timeslotText}>{timeslot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button
        title="Confirm"
        onPress={handleConfirm}
        disabled={!selectedSlot} // Disable the button if no timeslot is selected
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  timeslotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  timeslot: {
    padding: 10,
    margin: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  selectedTimeslot: {
    backgroundColor: 'green',
  },
  timeslotText: {
    fontSize: 16,
  },
});