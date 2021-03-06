// React Imports
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

// Defining the component that is later exported to App.js
const Add_edit_Event = ({ navigation, route }) => {
  // Setting useState for the picker, initial state set to empty string
  const [selectedValue, setSelectedValue] = useState("");

  // Defining the initial state of the array that contains information about the Event
  const initialState = {
    EventName: "",
    DateOfEvent: "",
    Time: "",
    Description: "",
    Group: "",
    Programme: "",
    ContactInfo: "",
    EventType: "",
    Members: "",
  };

  // Defining newEvent and its state
  const [newEvent, setnewEvent] = useState(initialState);

  // Depending on if isEditEvent is true or not we know if the user want to create a new Event or edit an existing one
  const isEditEvent = route.params.item === "EditEvent";

  // If it is true we should store the params in const Event - this is only necessary when we want to edit a event, otherwise it can be empty.
  useEffect(() => {
    if (isEditEvent) {
      const event = route.params.event[1];
      setnewEvent(event);
    }
    // Remove the data when we leave the view - so it is empty the next time we enter the view
    return () => {
      setnewEvent(initialState);
    };
  }, []);

  // Sets the name of the event
  const changeTextInput = (name, event) => {
    setnewEvent({ ...newEvent, [name]: event });
  };

  // Sets the name of the picker
  const setPicker = (name, event) => {
    setSelectedValue(event);
    setnewEvent({ ...newEvent, [name]: event });
  };

  // this function handles save, and checks that the elements within the array are not empty
  const handleSave = () => {
    // Defining initialstate of new event
    const {
      EventName,
      DateOfEvent,
      Time,
      Description,
      Group,
      Programme,
      ContactInfo,
      EventType,
      Members,
    } = newEvent;

    // If statement that check so that none of the boxes are left empty else return an alert
    // Members is not a part of this statement because we auto-add the user when he/she creates an event
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
      return Alert.alert("One or more of the textboxs are empty!!");
    }

    // Finds the current users email using firebase methode
    // This email is then auto-added to the members of the new Event - chris
    const CurrentUserMember = firebase.auth().currentUser.email;

    // We save the new values in the database and redirect to EventDetails
    // This runs if isEditEvent is true and we want to edit an event - therefore the firebase method "update"
    if (isEditEvent) {
      const id = route.params.event[0];
      try {
        firebase
          .database()
          .ref(`/events/${id}`)
          // Vi bruger update, s?? kun de felter vi angiver, bliver ??ndret
          .update({
            EventName,
            DateOfEvent,
            Time,
            Description,
            Group,
            Programme,
            ContactInfo,
            EventType,
            Members,
          });
        // when the event is changed, return an alert
        // then navigate back to event details
        Alert.alert("Changes Saved!");
        const event = [id, newEvent];
        navigation.navigate("Event Details", { event });
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    // If the Event does not exist we should create it
    // Meaning isEditEvent is false - therefore we use firebase method "push"
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
          Members: CurrentUserMember,
        });
        Alert.alert(`Event Created!`);
        setnewEvent(initialState);
        navigation.navigate("Event List");
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
  };
  // JS POWERMOVE - Supplied by exercise teachers
  // This move maps the events based on keys and index
  // There is an if statement here to ensure that eventType is defined
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
                  <Picker.Item label="V??lg en af nedenst??ende" value="" />
                  <Picker.Item label="Study" value="Study" />
                  <Picker.Item label="Night out" value="Nightout" />
                  <Picker.Item label="Social" value="Social" />
                </Picker>
              </View>
            );
        })}
        <Button
          // Depending on the state of isEditEvent render the button to either of the two strings
          title={isEditEvent ? "Save changes" : "Add Event"}
          onPress={() => handleSave()}
          color="#3F5992"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// Export the component
export default Add_edit_Event;

// Styles
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
