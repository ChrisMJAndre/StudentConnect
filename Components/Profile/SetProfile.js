// React Imports
import React, { useState } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import firebase from "firebase";

// Define function and their constant that can be altered, aswell as their initial state
function SetProfile() {
  const initialStateProfile = {
    Name: "",
    DateOfBirth: "",
    StudyProgramme: "",
    PhoneNumber: "",
    Email: "",
  };

  // Defining newprofile and its state
  const [newProfile, setnewProfile] = useState(initialStateProfile);

  const changeTextInput = (name, event) => {
    setnewProfile({ ...newProfile, [name]: event });
  };

  // Onpress button this actives. It sumbits a new profile to the database.
  // It also checks if any of the fields are empty
  const handleSubmitProfile = () => {
    const { Name, DateOfBirth, StudyProgramme, PhoneNumber, Email } =
      newProfile;

    if (
      Name.length === 0 ||
      DateOfBirth.length === 0 ||
      StudyProgramme.length === 0 ||
      PhoneNumber.length === 0 ||
      Email.length === 0
    ) {
      return Alert.alert("One or more of the textboxs are empty!");
    }

    firebase.database().ref("/testProfile/").push({
      Name,
      DateOfBirth,
      StudyProgramme,
      PhoneNumber,
      Email,
    });
    Alert.alert(`Profile Created!`);
    setnewProfile(initialStateProfile);
  };

  // Function that allows user to signout
  const handleLogOut = async () => {
    await firebase.auth().signOut();
  };

  // All content rendered
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {Object.keys(initialStateProfile).map((key, index) => {
          return (
            <View style={styles.row} key={index}>
              <Text style={styles.label}>{key}</Text>
              <TextInput
                value={newProfile[key]}
                onChangeText={(event) => changeTextInput(key, event)}
                style={styles.input}
              />
            </View>
          );
        })}
        <Button
          title={"Create Profile"}
          onPress={() => handleSubmitProfile()}
          color={"#3F5992"}
        />
        <Button
          onPress={() => handleLogOut()}
          title="Log out"
          color={"#3F5992"}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// Export Component
export default SetProfile;

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
