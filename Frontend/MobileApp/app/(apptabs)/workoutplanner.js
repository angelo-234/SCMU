import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function WorkoutPlanner() {
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [workout, setWorkout] = useState([]);

    const muscleGroups = {
        arms: ["Bicep Curls", "Tricep Dips", "Hammer Curls", "Skull Crushers"],
        legs: ["Squats", "Lunges", "Leg Press", "Calf Raises"],
        chest: ["Bench Press", "Pushups", "Chest Fly", "Dumbbell Pullover"],
        // Add more muscle groups and exercises as needed
    };

    const generateWorkout = () => {
        if (selectedGroup) {
            const exercises = muscleGroups[selectedGroup];
            let workout = [];
            for (let i = 0; i < 3; i++) {
                if (exercises.length > 0) {
                    const randomIndex = Math.floor(
                        Math.random() * exercises.length
                    );
                    workout.push(exercises[randomIndex]);
                    exercises.splice(randomIndex, 1); // Remove the chosen exercise so it won't be selected again
                }
            }

            // Add a random exercise from each other muscle group
            for (let group in muscleGroups) {
                if (group !== selectedGroup) {
                    const otherExercises = muscleGroups[group];
                    const randomIndex = Math.floor(
                        Math.random() * otherExercises.length
                    );
                    workout.push(otherExercises[randomIndex]);
                }
            }

            setWorkout(workout);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Workout Planner</Text>
            <Picker
                selectedValue={selectedGroup}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) => setSelectedGroup(itemValue)}>
                {Object.keys(muscleGroups).map((group) => (
                    <Picker.Item key={group} label={group} value={group} />
                ))}
            </Picker>
            <Button title='Generate Workout' onPress={generateWorkout} />
            {workout.length > 0 && (
                <Text style={styles.workoutTitle}>Your workout is:</Text>
            )}

            {workout.map((exercise, index) => (
                <Text style={styles.workout} key={index}>
                    {exercise}
                </Text>
            ))}
        </View>
    );
}

// add modal to show workout
// change picker to 4 boxes of the muscle groups
// add a button to generate workout - opens the modal
//inside the modal, show the workout, and have option to save it
// main page add at the bottom a list horizontally of the saved workouts
// when you click on a saved workout, it opens the modal and shows the workout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F5F5",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#38434D",
        marginBottom: 20,
    },
    workoutTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#38434D",
        marginTop: 60,
    },

    workout: {
        fontSize: 15,
        color: "#38434D",
        marginBottom: 10,
    },
});
