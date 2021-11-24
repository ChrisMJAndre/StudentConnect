// Imports
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

// Define the Component functionality
const EventDetails = ({ route, navigation }) => {
  // Setting useState for event to be an empty array
  const [event, setevent] = useState({});

  // Fetches the events values and set them - Chris
  useEffect(() => {
    setevent(route.params.event[1]);

    // When we leave the view, empty the object - Chris
    return () => {
      setevent({});
    };
  });

  // We navigate to the editevent view and send the object with - Chris
  const handleEdit = () => {
    const event = route.params.event;
    navigation.navigate("Add / Edit Event", {
      event: event,
      item: "EditEvent",
    });
  };

  // We ask the user for confirmation - Chris
  const confirmDelete = () => {
    // which OS is used? in this case we ask if it is mobile - Chris
    if (Platform.OS === "ios" || Platform.OS === "android") {
      Alert.alert("Are you sure?", "Do you want to delete the event?", [
        { text: "Cancel", style: "cancel" },
        // If yes, then trigger handleDelete function - Chris
        { text: "Delete", style: "destructive", onPress: () => handleDelete() },
      ]);
    }
  };

  // We Delete the car using firebase methods - Chris
  const handleDelete = () => {
    const id = route.params.event[0];
    try {
      firebase
        .database()
        // The events ID is used - Chris
        .ref(`/events/${id}`)
        // Remove the data - Chris
        .remove();
      // And navigate back- Chris
      navigation.goBack();
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  // If there are no created events, we should render that there is no data
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

  // Function that allows a user to join an event by pushing their email to the Evenet
  const handleJoinEvent = () => {
    const CurrUserMail = firebase.auth().currentUser.email;
    const { Members } = newEvent;

    // We save the new values in the database and redirect to EventDetails - Chris
    const id = route.params.event[0];
    try {
      firebase
        .database()
        .ref(`/events/${id}`)
        // We use update to update the firebase database
        .update({
          Members: CurrUserMail,
        });
      // When event is altered, we return to event list view
      Alert.alert("Event Joined!");
      const group = [id, newEvent];
      navigation.navigate("Event List", { event });
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  //All content rendered - Chris
  return (
    <View style={styles.container}>
      <Button title="Edit" onPress={() => handleEdit()} color="#3F5992" />
      <Button title="Delete" onPress={() => confirmDelete()} color="#3F5992" />
      {Object.entries(event).map((item, index) => {
        return (
          <View style={styles.row} key={index}>
            <Text style={styles.label}>{item[0]} </Text>
            <Text style={styles.value}>{item[1]}</Text>
          </View>
        );
      })}
      <Button
        title="Join Event"
        onPress={() => handleJoinEvent()}
        color="#3F5992"
      />
    </View>
  );
};

// Export component - Chris
export default EventDetails;

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
