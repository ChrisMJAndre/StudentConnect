// Import - Chris
import React, { useState } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  changeTextInput,
  Alert,
} from "react-native";
import firebase from "firebase";
import { createIconSetFromFontello } from "react-native-vector-icons";

// Define function and their constant that can be altered, aswell as their initial state - Chris
function SetProfile() {
  const initialStateProfile = {
    Name: "",
    DateOfBirth: "",
    StudyProgramme: "",
    PhoneNumber: "",
    Email: "",
  };

  // Defining newprofile and its state - Chris
  const [newProfile, setnewProfile] = useState(initialStateProfile);

  // THis function allows us to find the ID of the current user login (but it is the auth ID), if we send the auth id with and then find the emails for both databases
  // IF both emails match we know it is the right user
  // Throws function bound error tho
  const UserID = firebase.auth().onAuthStateChanged((user) => {
    //console.log(user.uid);
  });

  //console.log(UserID);

  const changeTextInput = (name, event) => {
    setnewProfile({ ...newProfile, [name]: event });
  };

  // Onpress button this actives. It checks if the email and password entered matches anything in the database - Chris
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
      return Alert.alert("Et af felterne er tomme!");
    }

    firebase.database().ref("/testProfile/").push({
      Name,
      DateOfBirth,
      StudyProgramme,
      PhoneNumber,
      Email,
    });
    Alert.alert(`Saved`);
    setnewProfile(initialStateProfile);
  };

  // The Front end of the signup view - Chris
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
      </ScrollView>
    </SafeAreaView>
  );
}

// Export Component - Chris
export default SetProfile;

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
