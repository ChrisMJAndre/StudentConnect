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
const Add_edit_Group = ({ navigation, route }) => {
  const [selectedValue, setSelectedValue] = useState("");
  // Defining the initial state of the array that contains information about the user - Chris
  const initialState = {
    GroupName: "",
    Description: "",
    Programme: "",
    ContactInfo: "",
    GroupType: "",
    Members: "",
  };

  // Defining newGroup and its state - Chris
  const [newGroup, setnewGroup] = useState(initialState);

  // This statement should return true if we are in Edit Group - Chris
  const isEditGroup = route.params.item === "EditGroup";

  // If it is true we should store the params in const Group  - Chris
  useEffect(() => {
    if (isEditGroup) {
      const group = route.params.group[1];
      setnewGroup(group);
    }
    // Remove the data when we leave the view - Chris
    return () => {
      setnewGroup(initialState);
    };
  }, []);

  //
  const changeTextInput = (name, event) => {
    setnewGroup({ ...newGroup, [name]: event });
  };

  const setPicker = (name, event) => {
    setSelectedValue(event);
    setnewGroup({ ...newGroup, [name]: event });
  };

  // this function handles save, and checks that the elements within the array are not empty - Chris
  const handleSave = () => {
    const {
      GroupName,
      Description,
      Programme,
      ContactInfo,
      GroupType,
      Members,
    } = newGroup;

    if (
      GroupName.length === 0 ||
      Description.length === 0 ||
      Programme.length === 0 ||
      GroupType.length === 0 ||
      ContactInfo.length === 0
    ) {
      return Alert.alert("Et af felterne er tomme!");
    }

    // We save the new values in the database and redirect to GroupDetails - Chris
    if (isEditGroup) {
      const id = route.params.group[0];
      try {
        firebase
          .database()
          .ref(`/groups/${id}`)
          // Vi bruger update, så kun de felter vi angiver, bliver ændret
          .update({
            GroupName,
            Description,
            Programme,
            ContactInfo,
            GroupType,
            Members,
          });
        // Når bilen er ændret, går vi tilbage.
        Alert.alert("Din info er nu opdateret");
        const group = [id, newGroup];
        navigation.navigate("Group Details", { group });
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    // If the Group does not exist we should create it - Chris
    else {
      try {
        firebase.database().ref("/groups/").push({
          GroupName,
          Description,
          Programme,
          ContactInfo,
          GroupType,
          Members: firebase.auth().currentUser.email,
        });
        Alert.alert(`Saved`);
        setnewGroup(initialState);
        navigation.navigate("Group List");
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
          title={isEditGroup ? "Save changes" : "Add group"}
          onPress={() => handleSave()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// Export the function - Chris
export default Add_edit_Group;

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
