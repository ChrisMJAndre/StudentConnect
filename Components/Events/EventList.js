// Imports - Chris
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
//import { useHistory } from "react-router-dom";

// Define component - Chris
const EventList = ({ navigation }) => {
  const [events, setevents] = useState();
  const [filterKey, setFilterKey] = useState(null);

  // We snapshot the events defined - Chris - read up on what a snapshot is- Chris
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

  // If there is not events then display message - Chris
  if (!events) {
    return <Text>Loading... or Database is empty</Text>;
  }

  // We search in the array for events and find the event object that matches the id we sendt with - Chris
  const handleSelectEvent = (id) => {
    const event = Object.entries(events).find(
      (event) => event[0] === id /*id*/
    );

    navigation.navigate("Event Details", { event });
  };

  const handleToggle = (key) => {
    setFilterKey(key);
  };

  // Flatlist expects an array. Therefore we take all our values from our event object and use an array for the list - Chris
  const eventArray = Object.values(events);
  const eventKeys = Object.keys(events);

  // We use eventKeys to find the ID of the event and return it as a key - Chris
  // console.log(eventArray, "hele");

  const filter = filterKey
    ? eventArray.filter((item) => item.EventType == filterKey)
    : eventArray;

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Button onPress={() => handleToggle(null)} title={"All"} />
        <Button onPress={() => handleToggle("Study")} title={"Study"} />
        <Button onPress={() => handleToggle("Nightout")} title={"Nightout"} />
        <Button onPress={() => handleToggle("Social")} title={"Social"} />
      </View>
      <FlatList
        //data={filter}
        data={filter}
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

// Export component - Chris
export default EventList;

// Styles - Chris
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
});
