import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Slider } from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

export default function BathroomStatusScreen() {

  const navigation = useNavigation();

  const handleGoBack = () => {
        navigation.navigate("home2");
  };

  const [heatingOn, setHeatingOn] = useState(false);
  const [temperature, setTemperature] = useState(20);
  const [humidity, setHumidity] = useState(45);
  const [currentTemperature, setCurrentTemperature] = useState(20);

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Back" onPress={handleGoBack} />
        <Text style={styles.title}>Bathroom Status</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Heating: {heatingOn ? 'On' : 'Off'}</Text>
        <Text style={styles.infoText}>Temperature: {temperature}°C</Text>
        <Text style={styles.infoText}>Humidity: {humidity}%</Text>
        {heatingOn && (
          <>
            <Slider
              style={styles.slider}
              minimumValue={15}
              maximumValue={30}
              value={temperature}
              onValueChange={handleTemperatureChange}
              step={1}
              minimumTrackTintColor="#007AFF"
            />
            <Button title="Set" onPress={handleSetTemperature} disabled={temperature === currentTemperature} />
          </>
        )}
      </View>
      <View style={styles.commandsContainer}>
        <Button
          title={heatingOn ? 'Switch Off Heating' : 'Switch On Heating'}
          onPress={handleToggleHeating}
        />
        <Button title="Switch On Mirror Cleaner" onPress={handleMirrorCleaner} />
      </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  slider: {
    width: '80%',
    alignSelf: 'center',
  },
  commandsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});
