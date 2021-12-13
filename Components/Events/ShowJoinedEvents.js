// React imports
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

// Define the Component that is later exported to app.js
const ShowJoinedEvents = ({ route, navigation }) => {
  const [event, setevent] = useState({});

  // Fetches the events values and set them
  useEffect(() => {
    setevent(route.params.event[1]);

    // When we leave the view, empty the object
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
    // Remove the data when we leave the view
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
        // Members is set to be an empty string so that you are no longer joined
        .update({
          Members: "",
        });
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
