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
const Add_edit_Group = ({ navigation, route }) => {
  const [selectedValue, setSelectedValue] = useState("");

  // Defining the initial state of the array that contains information about the user
  const initialState = {
    GroupName: "",
    Description: "",
    Programme: "",
    ContactInfo: "",
    GroupType: "",
    Members: "",
  };

  // Defining newGroup and its state
  const [newGroup, setnewGroup] = useState(initialState);

  // Depending on if isEditGroup is true or not we know if the user want to create a new Group or edit an existing one
  const isEditGroup = route.params.item === "EditGroup";

  // If it is true we should store the params in const Group
  // Meaning we want to edit a group
  useEffect(() => {
    if (isEditGroup) {
      const group = route.params.group[1];
      setnewGroup(group);
    }
    // Remove the data when we leave the view
    return () => {
      setnewGroup(initialState);
    };
  }, []);

  // Sets the name of the event
  const changeTextInput = (name, event) => {
    setnewGroup({ ...newGroup, [name]: event });
  };

  // Sets the name of the picker
  const setPicker = (name, event) => {
    setSelectedValue(event);
    setnewGroup({ ...newGroup, [name]: event });
  };

  // this function handles save, and checks that the elements within the array are not empty
  const handleSave = () => {
    const {
      GroupName,
      Description,
      Programme,
      ContactInfo,
      GroupType,
      Members,
    } = newGroup;

    // If statement that check so that none of the boxes are left empty else return an alert
    // Members is not a part of this statement because we auto-add the user when he/she creates a group
    if (
      GroupName.length === 0 ||
      Description.length === 0 ||
      Programme.length === 0 ||
      GroupType.length === 0 ||
      ContactInfo.length === 0
    ) {
      return Alert.alert("One or more of the textboxs are empty!!");
    }

    // Finds the current users email using firebase methode
    // This email is then auto-added to the members of the new group - chris
    const CurrentUserMember = firebase.auth().currentUser.email;

    // We save the new values in the database and redirect to GroupDetails
    // This runs if isEditGroup is true and we want to edit a group - therefore the firebase method "update"
    if (isEditGroup) {
      const id = route.params.group[0];
      try {
        firebase.database().ref(`/groups/${id}`).update({
          GroupName,
          Description,
          Programme,
          ContactInfo,
          GroupType,
          Members,
        });
        // when the group is changed, return an alert
        // then navigate back to group details
        Alert.alert("Changes Saved!");
        const group = [id, newGroup];
        navigation.navigate("Group Details", { group });
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }

    // If the Group does not exist we should create it
    // Meaning isEditGroup is false - therefore we use firebase method "push"
    else {
      try {
        firebase.database().ref("/groups/").push({
          GroupName,
          Description,
          Programme,
          ContactInfo,
          GroupType,
          Members: CurrentUserMember,
        });
        Alert.alert(`Group Created!`);
        setnewGroup(initialState);
        navigation.navigate("Group List");
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
  };
  // JS POWERMOVE - Supplied by exercise teachers
  // This move maps the events based on keys and index
  // There is an if statement here to ensure that GroupType is defined
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {Object.keys(initialState).map((key, index) => {
          if (key !== "GroupType") {
            return (
              <View style={styles.row} key={index}>
                <Text style={styles.label}>{key}</Text>
                <TextInput
                  value={newGroup[key].toString()}
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
                    setPicker("GroupType", itemValue.toString())
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
          title={isEditGroup ? "Save changes" : "Add Group"}
          onPress={() => handleSave()}
          color="#3F5992"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// Export the component
export default Add_edit_Group;

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
