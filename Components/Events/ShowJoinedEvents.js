// Imports - Chris
import React from "react";
import {
  View,
  Text,
  Platform,
  FlatList,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import firebase from "firebase";
import { useEffect, useState } from "react";

// Define the Component functionality- Chris
const ShowJoinedEvents = ({ route, navigation }) => {
  const [event, setevent] = useState({});

  // Fetches the events values and set them - Chris
  useEffect(() => {
    setevent(route.params.event[1]);

    // When we leave the view, empty the object - Chris
    return () => {
      setevent({});
    };
  });

  if (!event) {
    return <Text>No data</Text>;
  }

  const initialState = {
    ContactInfo: "",
    DateOfEvent: "",
    Description: "",
    EventName: "",
    EventType: "",
    Group: "",
    Programme: "",
    Time: "",
    Members: "",
  };
  const [newEvent, setnewEvent] = useState(initialState);

  useEffect(() => {
    const event = route.params.event[1];
    setnewEvent(event);
    // Remove the data when we leave the view - Chris
    return () => {
      setnewEvent(initialState);
    };
  }, []);

  const handleLeaveEvent = () => {
    const { Members } = newEvent;

    // We save the new values in the database and redirect to EventDetails - Chris
    const id = route.params.event[0];
    try {
      firebase
        .database()
        .ref(`/events/${id}`)
        // Vi bruger update, så kun de felter vi angiver, bliver ændret
        .update({
          Members: "",
        });
      // Når event er ændret, går vi tilbage.
      Alert.alert("You have left the event");
      const event = [id, newEvent];
      navigation.navigate("Event List", { event });
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  //All content rendered - Chris
  return (
    <View style={styles.container}>
      {Object.entries(event).map((item, index) => {
        return (
          <View style={styles.row} key={index}>
            <Text style={styles.label}>{item[0]} </Text>
            <Text style={styles.value}>{item[1]}</Text>
          </View>
        );
      })}
      <Button title="Leave Event" onPress={() => handleLeaveEvent()} />
    </View>
  );
};

// Export component - Chris
export default ShowJoinedEvents;

// Styles - Chris
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-start" },
  row: {
    margin: 5,
    padding: 5,
    flexDirection: "row",
  },
  label: { width: 100, fontWeight: "bold" },
  value: { flex: 1 },
});
