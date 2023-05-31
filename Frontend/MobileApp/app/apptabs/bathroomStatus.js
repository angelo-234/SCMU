import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import tw from 'twrnc';
import Slider from "@react-native-community/slider";

export default function BathroomStatusScreen() {

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate("home2");
  };

  const [heatingOn, setHeatingOn] = useState(false);
  const [cleanerOn, setCleanerOn] = useState(false);
  const [temperature, setTemperature] = useState(20);
  const [humidity, setHumidity] = useState(45);
  const [newTemp, setNewTemperature] = useState(20);
  const disabled = temperature === newTemp;

  // aux

  const heatingTitle = heatingOn ? 'Switch Off Heating' : 'Switch On Heating';
  const mirrorTitle = cleanerOn ? "Switch Off Mirror Cleaner" : "Switch On Mirror Cleaner";

  const handleToggleHeating = async () => {
    const newHeatingStatus = !heatingOn;
    setHeatingOn(newHeatingStatus);

    // Send HTTP request to update heating status
    try {
      const response = await axios.post(
        'https://your-api-url/updateHeatingStatus',
        { heatingOn: newHeatingStatus }
      );
      // Handle response or update UI as needed
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleMirrorCleaner = async () => {
    const newCleanerStatus = !cleanerOn;
    setCleanerOn(newCleanerStatus);

    // Send HTTP request for mirror cleaner command
    try {
      const response = await axios.post(
        'https://your-api-url/switchOnMirrorCleaner'
      );
      // Handle response or update UI as needed
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleSetTemperature = async () => {

    Alert.alert("Temperature Set Succesfully")

    // Send HTTP request to set the temperature
    try {
      const response = await axios.post(
        'https://your-api-url/setTemperature',
        { temperature }
      );
      // Handle response or update UI as needed
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleTemperatureChange = (value) => {
    setTemperature(value);
  };

  const handleNewTemperatureChange = (value) => {
    setNewTemperature(value);
  };

  return (
    <View style={tw`flex-1 p-4 items-center justify-center bg-blue-100 `}>
      <View style={tw`flex-row items-center mb-5`}>
        <Button title="Back" onPress={handleGoBack} />
        <Text style={tw`text-2xl font-bold ml-4`}>Bathroom Status</Text>
      </View>
      <View style={tw`mb-5`}>
        <Text style={tw`text-lg`}>Heating: {heatingOn ? 'On' : 'Off'}</Text>
        <Text style={tw`text-lg`}>Temperature: {temperature}°C</Text>
        <Text style={tw`text-lg`}>Humidity: {humidity}%</Text>
        <Text style={tw`text-lg`}>Mirror Cleaner: {cleanerOn ? 'On' : 'Off'}</Text>
        {heatingOn && (
          <View>
            <Slider
              style={tw`w-4/5 self-center`}
              minimumValue={15}
              maximumValue={30}
              value={newTemp}
              onValueChange={handleNewTemperatureChange}
              step={1}
              minimumTrackTintColor="blue-500"
            />
            <Text style={tw`text-lg`}>Desired Temp: {newTemp}°C</Text>
            {!disabled && (
              <TouchableOpacity
                style={tw`m-1 px-1 py-2 bg-blue-500 rounded`}
                onPress={handleSetTemperature}
              >
                <Text style={tw`text-white text-base font-bold text-center`}>Set</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
      <View style={tw`flex-row justify-center w-full`}>
        <TouchableOpacity
                style={tw`m-1 px-1 py-2 bg-blue-500 rounded`}
                onPress={handleToggleHeating}
              >
                <Text style={tw`text-white text-base font-bold`}>{heatingTitle}</Text>
        </TouchableOpacity>
        <TouchableOpacity
                style={tw`m-1 px-1 py-2 bg-blue-500 rounded`}
                onPress={handleMirrorCleaner}
              >
                <Text style={tw`text-white text-base font-bold`}>{mirrorTitle}</Text>
              </TouchableOpacity>
      </View>
    </View>
  );
}