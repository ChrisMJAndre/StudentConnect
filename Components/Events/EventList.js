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
const EventList = ({ navigation }) => {
  // Set state for event and filterkey
  // Filterkey is set to null to ensure that we do not filter as a standard
  const [events, setevents] = useState();
  const [filterKey, setFilterKey] = useState(null);

  // We snapshot the events already defined
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

  // Define to be an empty object
  let filteredEvent = {};

  // loops based on filter key which equals the key we want to show in list
  filterKey
    ? Object.entries(events).map((event) => {
        return (
          event[1].EventType == filterKey &&
          Object.assign(filteredEvent, { [event[0]]: event[1] })
        );
      })
    : (filteredEvent = events);

  const eventArray = Object.values(filteredEvent);
  const eventKeys = Object.keys(filteredEvent);

  // We search in the array for events and find the event object that matches the id we sendt with - Chris
  const handleSelectEvent = (id) => {
    const event = Object.entries(events).find((event) => event[0] === id);

    // Once an event has been pressed navigate to event details and display that events details
    navigation.navigate("Event Details", { event });
  };

  // Simple functions that sets the value of Filterkey to the selected value
  const handleToggle = (key) => {
    setFilterKey(key);
  };

  // All content rendered
  // 4 Filter Options
  // And a flatlist containing all events
  return (
    <View>
      <View style={styles.buttonTitle}>
        <Button
          onPress={() => handleToggle(null)}
          title={"All"}
          color={"#3F5992"}
        />
        <Button
          onPress={() => handleToggle("Study")}
          title={"Study"}
          color={"#3F5992"}
        />
        <Button
          onPress={() => handleToggle("Nightout")}
          title={"Nightout"}
          color={"#3F5992"}
        />
        <Button
          onPress={() => handleToggle("Social")}
          title={"Social"}
          color={"#3F5992"}
        />
      </View>
      <Text title="Available Groups" style={styles.title} />
      <FlatList
        data={eventArray}
        keyExtractor={(item, index) => eventKeys[index]}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() => handleSelectEvent(eventKeys[index])}
            >
              <Text style={styles.title}>{item.EventName}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

// Export component
export default EventList;

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
    backgroundColor: "#3F5992",
    marginVertical: 5,
    marginHorizontal: 70,
  },
  label: { fontWeight: "bold" },
  but: {},
  buttonContainer: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
    color: "#F7F7F3",
    fontSize: 15,
  },
  buttonTitle: {
    textAlign: "center",
    marginVertical: 10,
    color: "#F7F7F3",
    fontSize: 15,
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
  },
});
