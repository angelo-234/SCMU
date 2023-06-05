import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Button, Alert } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
// context imports
import { useContext } from 'react';
import { BathroomContext } from './BathroomContext';


export default function TimeSlotScreen() {
  const [hasSelection, setHasSelected] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  //navigation
  const navigation = useNavigation();

  // context
  const { hasSelectedBathroom } = useContext(BathroomContext);
  const { updateSelectedTimeslot } = useContext(BathroomContext);
  const { hasSelectedTimeslot } = useContext(BathroomContext);

  // Generate the timeslots for the current day (48 slots)
  const timeslots = [];
  const startTime = new Date();
  startTime.setHours(0, 0, 0, 0); // Set start time to midnight
  const halfHour = 30 * 60 * 1000; // 30 minutes in milliseconds
  for (let i = 0; i < 48; i++) {
    const timeslotTime = new Date(startTime.getTime() + i * halfHour);
    timeslots.push(timeslotTime);
  }

  // Function to convert timeslots to values from 1 to 48
  const convertTimeslotToValue = (timeslot) => {
    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0); // Set start time to midnight
    const halfHour = 30 * 60 * 1000; // 30 minutes in milliseconds
    const differenceInMilliseconds = timeslot - startTime.getTime();
    const differenceInHalfHours = Math.ceil(differenceInMilliseconds / halfHour);
    const value = differenceInHalfHours + 1; // Add 1 to make it 1-based instead of 0-based
    if(value < 10)
      return value.toString().padStart(2, '0');
    else
      return value.toString();
};

  // Function to handle timeslot selection
  const handleTimeslotSelection = (timeslot) => {
    setHasSelected(timeslot);
    setSelectedSlot(timeslot);
  };

  // Function to handle timeslot cancel
  const handleTimeslotCancel = async (timeslot) => {
    
    // Send HTTP request to handle timeslot cancel
    try {
      const response = await axios.put(
        "http://localhost:8080/bathroom/reserve/" + hasSelectedBathroom + "/"+ hasSelectedBathroom + ""  + convertTimeslotToValue(selectedSlot),
        { }
      );
      // Handle response or update UI as needed
    } catch (error) {
      console.log('Error:', error);
    }

    //set selected timeslot to null
    setSelectedSlot(null);
    updateSelectedTimeslot(null);
    navigation.navigate('home2');
  };

  // Function to handle submitting the timeslot
  const handleConfirm = async () => {
    if (!hasSelection) {
      // Notify the user if no timeslot is selected
      Alert.alert('Error', 'Please select a timeslot.');
      return;
    }

    // context parts
    updateSelectedTimeslot(hasSelection);

    // Send HTTP request to handle timeslot confirm
    try {
      const response = await axios.put(
        "http://localhost:8080/bathroom/reserve/" + hasSelectedBathroom + "/" + hasSelectedBathroom + "" + convertTimeslotToValue(selectedSlot),
        { }
      );
      // Handle response or update UI as needed
    } catch (error) {
      console.log('Error:', error);
    }

    setHasSelected(null); // Reset the selected timeslot after handling

    Alert.alert("Timeslot submitted")

    navigation.navigate("home2");
  };

  // Get the current date as a string
  const currentDate = new Date().toLocaleDateString();

  // render available timeslots
  const renderTimeslot = (timeslot) => {

    const isSelected = selectedSlot === timeslot;
    //const squareStyle = tw.style(isSelected && "border-2 border-blue-500");
    const squareStyle = tw.style(isSelected ? "border-2 border-blue-500" : "");

    return(
      <TouchableOpacity
        key={timeslot}
        style={[squareStyle, tw`p-2 m-2 bg-gray-200 rounded`]}
        onPress={() => handleTimeslotSelection(timeslot)}
        //disabled = {isOccupied}
      >
        <Text style={tw`text-sm`}>{timeslot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </TouchableOpacity>
    );
  };

  const renderAvailableTimeslots = () => {

    return timeslots.map((timeslot) => renderTimeslot(timeslot));
  }

  return (
    <View style={tw`flex-1 items-center justify-center p-4`}>
      <Text style={tw`text-lg font-bold mb-2`}>{currentDate}</Text>
      <Text style={tw`text-base mb-2`}>Select Timeslot</Text>
      <View style={tw`flex-row flex-wrap justify-center`}>
        {renderAvailableTimeslots()}
      </View>
      <Button
        title="Confirm"
        onPress={handleConfirm}
        disabled={!(hasSelection && hasSelectedBathroom)} // Disable the button if no timeslot is selected
      />
      <Button
        title="Cancel"
        onPress={handleTimeslotCancel}
        disabled={!(hasSelectedTimeslot && hasSelectedBathroom)} // Disable the button if no timeslot is selected
      />
    </View>
  );
};
