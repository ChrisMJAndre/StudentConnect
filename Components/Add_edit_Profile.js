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
} from "react-native";
import firebase from "firebase";
import { useEffect, useState } from "react";

// Defining the component that is later exported to App.js - Chris
const Add_edit_Profile = ({ navigation, route }) => {
  // Defining the initial state of the array that contains information about the user - Chris
  const initialState = {
    Name: "",
    Age: "",
    Mail: "",
    Nationality: "",
    Study: "",
    Reason: "",
  };

  // Defining newprofile and its state - Chris
  const [newProfile, setnewProfile] = useState(initialState);

  // This statement should return true if we are in Edit Profile - Chris
  const isEditProfile = route.name === "EditProfile";

  // If it is true we should store the params in const profile  - Chris
  useEffect(() => {
    if (isEditProfile) {
      const profile = route.params.profile[1];
      setnewProfile(profile);
    }
    // Remove the data when we leave the view - Chris
    return () => {
      setnewProfile(initialState);
    };
  }, []);

  //
  const changeTextInput = (name, event) => {
    setnewProfile({ ...newProfile, [name]: event });
  };

  // this function handles save, and checks that the elements within the array are not empty - Chris
  const handleSave = () => {
    const { Name, Age, Mail, Nationality, Study, Reason } = newProfile;

    if (
      Name.length === 0 ||
      Age.length === 0 ||
      Mail.length === 0 ||
      Nationality.length === 0 ||
      Study.length === 0 ||
      Reason.length === 0
    ) {
      return Alert.alert("Et af felterne er tomme!");
    }

    // We save the new values in the database and redirect to profileDetails - Chris
    if (isEditProfile) {
      const id = route.params.profile[0];
      try {
        firebase
          .database()
          .ref(`/profiles/${id}`)
          // Vi bruger update, så kun de felter vi angiver, bliver ændret
          .update({ Name, Age, Mail, Nationality, Study, Reason });
        // Når bilen er ændret, går vi tilbage.
        Alert.alert("Din info er nu opdateret");
        const profile = [id, newProfile];
        navigation.navigate("profileDetails", { profile });
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    // If the profile does not exist we should create it - Chris
    else {
      try {
        firebase
          .database()
          .ref("/profiles/")
          .push({ Name, Age, Mail, Nationality, Study, Reason });
        Alert.alert(`Saved`);
        setnewProfile(initialState);
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
          title={isEditProfile ? "Save changes" : "Add profile"}
          onPress={() => handleSave()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// Export the function - Chris
export default Add_edit_Profile;

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
});
