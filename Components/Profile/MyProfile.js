// React Imports
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

// Define the component that is later exported
const MyProfile = (props) => {
  const [Profiles, setProfiles] = useState();
  // We snapshot the profiles defined
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

  // Firebase method that signs the user out
  const handleLogOut = async () => {
    await firebase.auth().signOut();
  };

  // If the user does not exist in auth database render message
  if (!firebase.auth().currentUser) {
    return (
      <View>
        <Text>Not found</Text>
      </View>
    );
  }

  // We store the current users email in a const
  const currentEmail = firebase.auth().currentUser.email;

  // We find the profile that is created with the same email as the signed in user.
  // In order for this to work - the email that is used to signin has to be the same as the email on the profile
  const CurrentUserish = Profiles
    ? Object.values(Profiles).filter(
        (Item) => Item.Email.toString() == currentEmail
      )[0]
    : {};

  // All content rendered
  // We can here render the content such as name, by fetching the data from the database, now that we have found the specific user
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
            <Text style={styles.nameTitle}>{CurrentUserish.Name}</Text>
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
  nameTitle: {
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
