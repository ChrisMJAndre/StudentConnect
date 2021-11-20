// Imports - Chris
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
  SafeAreaView,
  Picker,
} from "react-native";
import firebase from "firebase";
import { useEffect, useState } from "react";

// Defining the component that is later exported to App.js - Chris
const Add_edit_Event = ({ navigation, route }) => {
  const [selectedValue, setSelectedValue] = useState("");
  // Defining the initial state of the array that contains information about the user - Chris
  const initialState = {
    EventName: "",
    DateOfEvent: "",
    Time: "",
    Description: "",
    Group: "",
    Programme: "",
    ContactInfo: "",
    EventType: "",
  };

  // Defining newEvent and its state - Chris
  const [newEvent, setnewEvent] = useState(initialState);

  // This statement should return true if we are in Edit Event - Chris
  const isEditEvent = route.params.item === "EditEvent";

  // If it is true we should store the params in const Event  - Chris
  useEffect(() => {
    if (isEditEvent) {
      const event = route.params.event[1];
      setnewEvent(event);
    }
    // Remove the data when we leave the view - Chris
    return () => {
      setnewEvent(initialState);
    };
  }, []);

  //
  const changeTextInput = (name, event) => {
    setnewEvent({ ...newEvent, [name]: event });
  };

  const setPicker = (name, event) => {
    setSelectedValue(event);
    setnewEvent({ ...newEvent, [name]: event });
  };

  // this function handles save, and checks that the elements within the array are not empty - Chris
  const handleSave = () => {
    const {
      EventName,
      DateOfEvent,
      Time,
      Description,
      Group,
      Programme,
      ContactInfo,
      EventType,
    } = newEvent;

    if (
      EventName.length === 0 ||
      DateOfEvent.length === 0 ||
      Time.length === 0 ||
      Description.length === 0 ||
      Group.length === 0 ||
      Programme.length === 0 ||
      EventType.length === 0 ||
      ContactInfo.length === 0
    ) {
      return Alert.alert("Et af felterne er tomme!");
    }

    // We save the new values in the database and redirect to EventDetails - Chris
    if (isEditEvent) {
      const id = route.params.event[0];
      try {
        firebase
          .database()
          .ref(`/events/${id}`)
          // Vi bruger update, så kun de felter vi angiver, bliver ændret
          .update({
            EventName,
            DateOfEvent,
            Time,
            Description,
            Group,
            Programme,
            ContactInfo,
            EventType,
          });
        // Når bilen er ændret, går vi tilbage.
        Alert.alert("Din info er nu opdateret");
        const event = [id, newEvent];
        navigation.navigate("Event Details", { event });
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    // If the Event does not exist we should create it - Chris
    else {
      try {
        firebase.database().ref("/events/").push({
          EventName,
          DateOfEvent,
          Time,
          Description,
          Group,
          Programme,
          ContactInfo,
          EventType,
        });
        Alert.alert(`Saved`);
        setnewEvent(initialState);
        navigation.navigate("Event List");
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
  };
  // JS POWERMOVE - read up on this more, i understand basics - Chris
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {Object.keys(initialState).map((key, index) => {
          if (key !== "EventType") {
            return (
              <View style={styles.row} key={index}>
                <Text style={styles.label}>{key}</Text>
                <TextInput
                  value={newEvent[key].toString()}
                  onChangeText={(event) => changeTextInput(key, event)}
                  style={styles.input}
                />
              </View>
            );
          } else
            return (
              <View key={key}>
                <Picker
                  selectedValue={selectedValue}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue, itemIndex) =>
                    setPicker("EventType", itemValue.toString())
                  }
                >
                  <Picker.Item label="Vælg en af nedenstående" value="" />
                  <Picker.Item label="Study" value="Study" />
                  <Picker.Item label="Night out" value="Nightout" />
                  <Picker.Item label="Social" value="Social" />
                </Picker>
              </View>
            );
        })}
        <Button
          title={isEditEvent ? "Save changes" : "Add event"}
          onPress={() => handleSave()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// Export the function - Chris
export default Add_edit_Event;

// Styles - Chris
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    height: 30,
    margin: 10,
  },
  label: {
    fontWeight: "bold",
    width: 100,
  },
  input: {
    borderWidth: 1,
    padding: 5,
    flex: 1,
  },
  picker: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
});