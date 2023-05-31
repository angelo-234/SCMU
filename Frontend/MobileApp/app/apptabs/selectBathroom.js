import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import tw from 'twrnc';

const { width } = Dimensions.get('window');

export default function BathroomSelectionScreen() {
  const availableBathrooms = ['Bathroom 1', 'Bathroom 2', 'Bathroom 3', 'Bathroom 4', 'Bathroom 5', 'Bathroom 6', 'Bathroom 7', 'Bathroom 8'];
  const [selectedBathroom, setSelectedBathroom] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleBathroomSelection = (bathroom) => {
    setSelectedBathroom(bathroom);
  };

  const handleCancelSelection = () => {
    setSelectedBathroom(null);
    setIsConfirmed(false);
  };

  const renderBathroomSquare = (bathroom) => {
    const isSelected = selectedBathroom === bathroom;
    const squareStyle = isSelected ? tw`border-2 border-blue-500` : tw`border-2 border-slate-500`;

    return (
      <TouchableOpacity
        key={bathroom}
        style={[squareStyle, tw`w-40 h-${width / 4} justify-center items-center m-2`]}
        onPress={() => handleBathroomSelection(bathroom)}
        disabled={isConfirmed}
      >
        <Text style={tw`text-base font-bold text-center`}>{`Bathroom ${bathroom}`}</Text>
      </TouchableOpacity>
    );
  };

  const renderAvailableBathrooms = () => {
    return availableBathrooms.map((bathroom) => renderBathroomSquare(bathroom));
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-blue-100 p-4 rounded pt-10`}>
      <Text style={tw`text-xl font-bold mb-4`}>Select Bathroom</Text>
      <ScrollView contentContainerStyle={tw`flex-grow w-full p-4`}>
        <View style={tw`flex-row flex-wrap justify-center items-center`}>{renderAvailableBathrooms()}</View>
      </ScrollView>
      {!isConfirmed && (
        <TouchableOpacity
          style={tw`mt-2 px-4 py-2 bg-blue-500 rounded`}
          onPress={handleConfirm}
          disabled={!selectedBathroom}
        >
          <Text style={tw`text-white text-base font-bold`}>Confirm</Text>
        </TouchableOpacity>
      )}
      {isConfirmed && (
        <View style={tw`mt-5`}>
          <Text style={tw`text-base font-bold text-gray-500`}>{`Bathroom ${selectedBathroom} Selected`}</Text>
          <TouchableOpacity style={tw`mt-2 px-4 py-2 bg-red-500 rounded`} onPress={handleCancelSelection}>
            <Text style={tw`text-white text-base font-bold`}>Cancel Selection</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
