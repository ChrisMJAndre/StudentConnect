import React, { Component } from "react";
import firebase from "firebase";
import { StyleSheet, Text, View, Image, Button } from "react-native";

//KOMMENTER NEDENSTÅNDE UD, HVIS DU ØNSKER AT TILBAGEFØRE GAMMELT PROFIL-VIEW

const MyProfile = (props) => {
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://i.imgur.com/HSfOA5y.jpg",
            }}
          />

          <Text style={styles.name}>{firebase.auth().currentUser.email}</Text>
          <Button onPress={() => handleLogOut()} title="Log out" />
          <Text style={styles.info}>Student at Copenhagen Business School</Text>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTittle}>Name</Text>
        <Text> Johan Isak Fink Lundtoft</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTittle}>Date of Birth</Text>
        <Text> 27 / 06 - 1998</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTittle}>Study Programme</Text>
        <Text> Erhvervsøkonomi og IT (HA.it)</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTittle}>Phone Number</Text>
        <Text> +45 60 25 04 44</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTittle}>Email</Text>
        <Text> Jolu19ac@student.cbs.dk</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyContent}></View>
      </View>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
  },
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
    color: "#FFFFFF",
    fontWeight: "600",
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
