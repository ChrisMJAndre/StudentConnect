import React, { Component } from "react";
import firebase from "firebase";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
} from "react-native";

import { useEffect, useState } from "react";

//Imports for Camera
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CameraScreen from "./CameraScreen";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageScreen from "./ImageScreen";

//KOMMENTER NEDENSTÅNDE UD, HVIS DU ØNSKER AT TILBAGEFØRE GAMMELT PROFIL-VIEW

const MyProfile = (props) => {
  // We snapshot the profiles defined - Chris - read up on what a snapshot is- Chris

  const [Profiles, setProfiles] = useState();

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

  const handleLogOut = async () => {
    await firebase.auth().signOut();
  };

  if (!firebase.auth().currentUser) {
    return (
      <View>
        <Text>Not found</Text>
      </View>
    );
  }

  const currentEmail = firebase.auth().currentUser.email;

  // Logs the email of the current user

  const CurrentUserish = Profiles
    ? Object.values(Profiles).filter(
        (Item) => Item.Email.toString() == currentEmail
      )[0]
    : {};

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://picsum.photos/200",
              }}
            />

            <Text style={styles.name1}>{CurrentUserish.Name}</Text>
            <Button
              onPress={() => handleLogOut()}
              title="Log out"
              color={"#3F5992"}
            />
            <Text style={styles.info}>
              Student at Copenhagen Business School
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTittle}>Name</Text>
          <Text> {CurrentUserish.Name}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTittle}>Date of Birth</Text>
          <Text> {CurrentUserish.DateOfBirth} </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTittle}>Study Programme</Text>
          <Text> {CurrentUserish.StudyProgramme}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTittle}>Phone Number</Text>
          <Text> {CurrentUserish.PhoneNumber} </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTittle}>Email</Text>
          <Text> {CurrentUserish.Email} </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.bodyContent}></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  headerContent: {
    padding: 30,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    height: 65,
    marginTop: 10,
  },
  cardTittle: {
    color: "#808080",
    fontSize: 14,
    marginBottom: 5,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#00BFFF",
    fontWeight: "600",
  },
  name1: {
    fontSize: 22,
    color: "#00BFFF",
    fontWeight: "600",
    color: "#3F5992",
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#696969",
  },
  bodyContent: {
    paddingTop: 40,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  menuBox: {
    backgroundColor: "#DCDCDC",
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    margin: 12,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    elevation: 4,
  },
  icon: {
    width: 60,
    height: 60,
  },
  info: {
    fontSize: 14,
    color: "#696969",
  },
});

/* SOURCE
https://www.bootdey.com/react-native-snippet/16/profile-detail
https://www.bootdey.com/react-native-snippet/23/Profile-ui-example
*/

// NEDENSTÅENDE ER DEN GAMLE UI IMPLEMENTERING AF PROFILE PAGE

/*
// Allows the user to sign out using a predetermined firebase methode - Chris
const MyProfile = (props) => {
  const handleLogOut = async () => {
    await firebase.auth().signOut();
  };
  // If the user cannot be found in the database, show "not found" - Chris
  if (!firebase.auth().currentUser) {
    return (
      <View>
        <Text>Not found</Text>
      </View>
    );
  }
  // Returns (hardcoded) data which will be replaced by a more dynamical method later - it should check for the user signed in and render it dynamically - Chris
  
  
  return (
    <View>
      <Text> Name: Christopher Maximilian John Andr </Text>
      <Text> Age: 22 </Text>
      <Text> Mail: Chan19af@student.cbs.dk </Text>
      <Text> Nationality: Sweden/China </Text>
      <Text> Study: Ha(it). </Text>
      <Text></Text>

      <Text>Current user: {firebase.auth().currentUser.email}</Text>
      <Button onPress={() => handleLogOut()} title="Log out" />

      <Text style={styles.Top}>Notes: </Text>
      <Text style={styles.Top}>
        In the future you will have the ability to upload your own profile
        picture, this is just a placehold
      </Text>

      {// Placeholder for an upload image function - Chris
      }
      <Image
        style={styles.Image}
        source={{ uri: "https://picsum.photos/200/300" }}
      />
    </View>
  );
};


// Export component - Chris
export default MyProfile;

// Styles - Chris
const styles = StyleSheet.create({
  Image: {
    top: 25,
    width: 200,
    height: 300,
    alignSelf: "center",
  },
  Top: {
    top: 25,
  },
  Top2: {
    top: 0,
  },
});

*/
