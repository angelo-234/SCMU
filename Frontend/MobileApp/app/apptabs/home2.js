import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function Home2() {
  
  const navigation = useNavigation();

  const [selectedBathroom, setSelectedBathroom] = useState(null);

  // Function to handle bathroom selection
  const handleSelectBathroom = () => {
    navigation.navigate('selectBathroom');
    setSelectedBathroom(true);
  };

  // Function to handle canceling the reservation
  const handleCancelReservation = () => {
    setSelectedBathroom(null);
    // Add your logic here for canceling the reservation
  };

  // Function to view bathroom status
  const handleViewBathroomStatus = () => {
    navigation.navigate("bathroomStatus")
  };

  // Function to view bathroom status
  const handleSelectTimeslot = () => {
    navigation.navigate("reserveSlot")
  };

  return (
    <View style={styles.container}>
      {selectedBathroom ? (
        <View style={styles.selectedBathroomContainer}>
          <Text style={styles.selectedBathroomText}>Bathroom {selectedBathroom}</Text>
          <Text style={styles.animationText}>Changing animation...</Text>
          <View style={styles.menuContainer}>
            <Button
              title="Bathroom Status"
              onPress={handleViewBathroomStatus}
            />
            <Button
              title="Cancel Reservation"
              onPress={handleCancelReservation}
            />
            <Button
              title="Select Timeslot"
              onPress={handleSelectTimeslot}
            />
          </View>
        </View>
      ) : (
        <View style={styles.noBathroomContainer}>
          <Text style={styles.noBathroomText}>No bathroom selected</Text>
          <Button
            title="Select a Bathroom"
            onPress={handleSelectBathroom}
          />
        </View>
      )}
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
  noBathroomContainer: {
    alignItems: 'center',
  },
  noBathroomText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedBathroomContainer: {
    alignItems: 'center',
  },
  selectedBathroomText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  animationText: {
    fontSize: 16,
    marginBottom: 20,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
