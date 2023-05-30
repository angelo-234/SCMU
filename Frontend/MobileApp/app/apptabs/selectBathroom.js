import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function BathroomSelectionScreen() {
  const availableBathrooms = ['Bathroom 1', 'Bathroom 2', 'Bathroom 3', 'Bathroom 4', 'Bathroom 5', 'Bathroom 6', 'Bathroom 7', 'Bathroom 8'];
  const [selectedBathroom, setSelectedBathroom] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleBathroomSelection = (bathroom) => {
    setSelectedBathroom(bathroom);
  };

  const renderBathroomSquare = (bathroom) => {
    const isSelected = selectedBathroom === bathroom;
    const squareStyle = isSelected ? styles.selectedSquare : styles.bathroomSquare;

    return (
      <TouchableOpacity
        key={bathroom}
        style={[squareStyle]}
        onPress={() => handleBathroomSelection(bathroom)}
        disabled={isConfirmed}
      >
        <Text style={styles.bathroomText}>{`Bathroom ${bathroom}`}</Text>
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.bathroomContainer}>{renderAvailableBathrooms()}</View>
        </View>
      </ScrollView>
      {!isConfirmed && (
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm} disabled={!selectedBathroom}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      )}
      {isConfirmed && (
        <View style={styles.selectedBathroomContainer}>
          <Text style={styles.selectedBathroomText}>{`Bathroom ${selectedBathroom} Selected`}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  bathroomContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bathroomSquare: {
    width: width / 2,
    height: width / 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  selectedSquare: {
    width: width / 2,
    height: width / 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'blue',
  },
  bathroomText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedBathroomContainer: {
    marginTop: 20,
  },
  selectedBathroomText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
});
