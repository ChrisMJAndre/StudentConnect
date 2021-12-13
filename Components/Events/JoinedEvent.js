// React imports
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import firebase from "firebase";
import { useEffect, useState } from "react";

// Define component that is later exported to app.js
const JoinedEvent = ({ navigation }) => {
  const [events, setevents] = useState();

  // We snapshot the events defined
  useEffect(() => {
    if (!events) {
      firebase
        .database()
        .ref("/events")
        .on("value", (snapshot) => {
          setevents(snapshot.val());
        });
    }
  }, []);

  // If there is not events then display message
  if (!events) {
    return <Text>Loading... or Database is empty</Text>;
  }

  // We search in the array for events and find the event object that matches the id we sendt with
  const handleSelectEvent = (id) => {
    const event = Object.entries(events).find((event) => event[0] === id);

    // Navigate to the events that are joined
    navigation.navigate("Show Joined Events", { event });
  };

  // Flatlist expects an array. Therefore we take all our values from our event object and use an array for the list - Chris
  const eventArray = Object.values(events);
  const eventKeys = Object.keys(events);

  // Only show the events that are joined, this is done by looking if the events contains the users email
  const joinedEventFilter = eventArray.filter(
    (item) => item.Members == firebase.auth().currentUser.email
  );

  return (
    <View>
      <FlatList
        data={joinedEventFilter}
        keyExtractor={(item, index) => eventKeys[index]}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() => handleSelectEvent(eventKeys[index])}
            >
              <Text>{item.EventName}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

// Export component
export default JoinedEvent;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    padding: 5,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  label: { fontWeight: "bold" },
  but: {},
  buttonContainer: {
    flex: 1,
  },
  filter: {
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "#FF0000",
  },
});
