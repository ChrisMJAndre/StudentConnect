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

// Define component - Chris
const ProfileList = ({ navigation }) => {
  const [profiles, setprofiles] = useState();

  // We snapshot the profiles defined - Chris - read up on what a snapshot is- Chris
  useEffect(() => {
    if (!profiles) {
      firebase
        .database()
        .ref("/profiles")
        .on("value", (snapshot) => {
          setprofiles(snapshot.val());
        });
    }
  }, []);

  // If there is not profiles then display message - Chris
  if (!profiles) {
    return <Text>Loading... or Database is empty</Text>;
  }

  // We search in the array for profiles and find the profile object that matches the id we sendt with - Chris
  const handleSelectProfile = (id) => {
    const profile = Object.entries(profiles).find(
      (profile) => profile[0] === id /*id*/
    );
    navigation.navigate("ProfileDetails", { profile });
  };

  // Flatlist expects an array. Therefore we take all our values from our profile object and use an array for the list - Chris
  const profileArray = Object.values(profiles);
  const profileKeys = Object.keys(profiles);

  // We use profileKeys to find the ID of the profile and return it as a key - Chris
  return (
    <FlatList
      data={profileArray}
      keyExtractor={(item, index) => profileKeys[index]}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            style={styles.container}
            onPress={() => handleSelectProfile(profileKeys[index])}
          >
            <Text>{item.Name}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

// Export component - Chris
export default ProfileList;

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
  },
  label: { fontWeight: "bold" },
});
