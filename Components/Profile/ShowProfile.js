// Imports - Chris
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import firebase from "firebase";
import { useEffect, useState } from "react";
//import { useHistory } from "react-router-dom";

// Define component - Chris
const ShowProfile = ({ navigation }) => {
  const [Profiles, setProfiles] = useState();

  // We snapshot the profiles defined - Chris - read up on what a snapshot is- Chris
  useEffect(() => {
    if (!Profiles) {
      firebase
        .database()
        .ref(`/testProfile`)
        .on("value", (snapshot) => {
          setProfiles(snapshot.val());
        });
    }
  }, []);

  // If there is not profiles then display message - Chris
  if (!Profiles) {
    return <Text>Shit is empty</Text>;
  }

  // Flatlist expects an array. Therefore we take all our values from our profile object and use an array for the list - Chris
  //const profileArray = Object.values(Profiles);
  //const profileKeys = Object.keys(Profiles);
  //data = [Profiles];

  // THis function logs the ID of the Real Time database
  var ProfileRef = firebase.database().ref(`testProfile/`);

  ProfileRef.orderByKey().on("child_added", function (data) {
    console.log(data.key);
  });

  // THis function allows us to find the ID of the current user login (but it is the auth ID), if we send the auth id with and then find the emails for both databases
  // IF both emails match we know it is the right user
  // Throws function bound error tho if UserID is used outside of the function
  const UserID = firebase.auth().onAuthStateChanged((user) => {
    //console.log(user.uid);
  });
  // Maybe this is useless

  // Logs the email of the current user
  console.log(firebase.auth().currentUser.email);

  //console.log(Profiles);
  //data = JSON.stringify(Profiles);
  //console.log(data);

  // We use profileKeys to find the ID of the profile and return it as a key - Chris
  return (
    <View style={styles.container}>
      <Text> </Text>
    </View>
  );
};

// Export component - Chris
export default ShowProfile;

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
    flex: 1,
    justifyContent: "flex-start",
  },
  label: { fontWeight: "bold" },
  but: {},
  row: {
    margin: 5,
    padding: 5,
    flexDirection: "row",
  },
  label: { width: 100, fontWeight: "bold" },
  value: { flex: 1 },
});
