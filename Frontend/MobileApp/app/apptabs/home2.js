import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
// context imports
import { useContext } from 'react';
import { BathroomContext } from './BathroomContext';

export default function Home2() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  // context
  const { hasSelectedBathroom } = useContext(BathroomContext);
  const { hasSelectedTimeslot } = useContext(BathroomContext);

  const handleSelectBathroom = () => {
    navigation.navigate('selectBathroom');
  };

  const handleCancelReservation = () => {
    navigation.navigate('selectBathroom');
  };

  const handleViewBathroomStatus = () => {
    navigation.navigate('bathroomStatus');
  };

  const handleSelectTimeslot = () => {
    navigation.navigate('reserveSlot');
  };

  const handleBathroomCode = () => {
    setModalVisible(true);
  };

  return (
    <View style={tw`flex-1 items-center justify-center p-4  bg-blue-100`}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={tw`flex-1 justify-center items-center`}>
          <View style={tw`bg-white rounded-2xl p-16 shadow-lg`}>
            <Text style={tw`mb-4 text-center text-xl`}>Bathroom Code:</Text>
            <Text style={tw`mb-4 text-center text-lg`}>1234</Text>
            <Pressable
              style={tw`bg-blue-500 rounded-lg px-4 py-2`}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={tw`text-white font-bold text-center`}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {(hasSelectedBathroom) ? (
        <View style={tw`items-center`}>
          <Text style={tw`text-xl font-bold mb-2`}>{`Bathroom ${hasSelectedBathroom}`}</Text>
          {hasSelectedTimeslot && (
            <Text style={tw`text-base mb-4`}>{`Selected Timeslot: ${hasSelectedTimeslot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</Text>
          )}
          <View style={tw`flex-col justify-center w-full`}>
            {hasSelectedTimeslot && (
              <View>
              <TouchableOpacity
                style={tw`m-1 px-1 py-2 bg-blue-500 rounded`}
                onPress={handleViewBathroomStatus}
              >
                <Text style={tw`text-white text-base font-bold text-center`}>Bathroom Status</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`m-1 px-1 py-2 bg-green-500 rounded`}
                onPress={handleBathroomCode}
              >
                <Text style={tw`text-white text-base font-bold text-center`}>Bathroom Code</Text>
              </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              style={tw`m-1 px-1 py-2 bg-blue-500 rounded`}
              onPress={handleCancelReservation}
            >
              <Text style={tw`text-white text-base font-bold text-center`}>Cancel Bathroom</Text>
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