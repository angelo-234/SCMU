import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

export default function Home2() {
  const navigation = useNavigation();
  const [selectedBathroom, setSelectedBathroom] = useState(null);

  const handleSelectBathroom = () => {
    navigation.navigate('selectBathroom');
    setSelectedBathroom(true);
  };

  const handleCancelReservation = () => {
    setSelectedBathroom(null);
    // Add your logic here for canceling the reservation
  };

  const handleViewBathroomStatus = () => {
    navigation.navigate('bathroomStatus');
  };

  const handleSelectTimeslot = () => {
    navigation.navigate('reserveSlot');
  };

  return (
    <View style={tw`flex-1 items-center justify-center p-4`}>
      {selectedBathroom ? (
        <View style={tw`items-center`}>
          <Text style={tw`text-xl font-bold mb-2`}>Bathroom {selectedBathroom}</Text>
          <Text style={tw`text-base mb-4`}>Changing animation...</Text>
          <View style={tw`flex-col justify-center w-full`}>
            <TouchableOpacity
                style={tw`m-1 px-1 py-2 bg-blue-500 rounded`}
                onPress={handleViewBathroomStatus}
              >
              <Text style={tw`text-white text-base font-bold text-center`}>Bathroom Status</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={tw`m-1 px-1 py-2 bg-blue-500 rounded`}
                onPress={handleCancelReservation}
              >
              <Text style={tw`text-white text-base font-bold text-center`}>Cancel Reservation</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={tw`m-1 px-1 py-2 bg-blue-500 rounded`}
                onPress={handleSelectTimeslot}
              >
              <Text style={tw`text-white text-base font-bold text-center`}>Select Timeslot</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={tw`items-center`}>
          <Text style={tw`text-xl font-bold mb-2`}>No bathroom selected</Text>
          <Button
            title="Select a Bathroom"
            onPress={handleSelectBathroom}
            color="#007AFF"
          />
        </View>
      )}
    </View>
  );
}