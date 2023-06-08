import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import tw from 'twrnc';
import Slider from "@react-native-community/slider";
import { firebase } from "../../config";
import { useContext } from 'react';
import { BathroomContext } from './BathroomContext';

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

  // firebase realtime database stuff
  const { hasSelectedBathroom } = useContext(BathroomContext);

  const getValues = () => {
    firebase.database().ref("/wc"+hasSelectedBathroom+"/aquecedor").once("value")
      .then(snapshot => {
        //console.log("Data: ", snapshot.val())
        setHeatingOn(snapshot.val())
      });

    firebase.database().ref("/wc"+hasSelectedBathroom+"/desembacador").once("value")
      .then(snapshot => {
        //console.log("Data: ", snapshot.val())
        setCleanerOn(snapshot.val())
      });

    firebase.database().ref("/wc"+hasSelectedBathroom+"/humidade").once("value")
      .then(snapshot => {
        //console.log("Data: ", snapshot.val())
        setHumidity(snapshot.val())
      });

    firebase.database().ref("/wc"+hasSelectedBathroom+"/temp").once("value")
      .then(snapshot => {
        //console.log("Data: ", snapshot.val())
        setTemperature(snapshot.val())
      });
  }

  getValues();
  // aux

  const heatingTitle = heatingOn ? 'Switch Off Heating' : 'Switch On Heating';
  const mirrorTitle = cleanerOn ? "Switch Off Mirror Cleaner" : "Switch On Mirror Cleaner";

  const handleToggleHeating = async () => {
    const newHeatingStatus = !heatingOn;
    
    firebase.database().ref("/wc"+hasSelectedBathroom).update({aquecedor:newHeatingStatus}).then(() => getValues());
  };

  const handleMirrorCleaner = async () => {
    const newCleanerStatus = !cleanerOn;

    firebase.database().ref("/wc"+hasSelectedBathroom).update({desembacador:newCleanerStatus}).then(() => getValues());
  };

  const handleSetTemperature = async () => {
    Alert.alert("Temperature Set Succesfully")
  };

  const handleNewTemperatureChange = (value) => {
    setNewTemperature(value);
  };

  /** 
  firebase.database().ref("/wc"+hasSelectedBathroom).on('child_changed', (childSnapshot, prevChildKey) => { 
    firebase.database().ref("/wc"+hasSelectedBathroom+"/humidade").once("value")
      .then(snapshot => {
        //console.log("Data: ", snapshot.val())
        setHumidity(snapshot.val())
      });

    firebase.database().ref("/wc"+hasSelectedBathroom+"/temp").once("value")
      .then(snapshot => {
        //console.log("Data: ", snapshot.val())
        setTemperature(snapshot.val())
      });
    firebase.database().ref("/wc"+hasSelectedBathroom).off("child_changed");
   } );
   */

   useEffect(() => {
    getValues();
  });

  return (
    <View style={tw`flex-1 p-4 items-center justify-center bg-blue-100 `}>
      <View style={tw`flex-row items-center mb-5`}>
        <Button title="Back" onPress={handleGoBack} color="#007AFF" />
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