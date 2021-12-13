// React Imports
import React from "react";
import { View, Text, Platform, StyleSheet, Button, Alert } from "react-native";
import firebase from "firebase";
import { useEffect, useState } from "react";

// Define the Component that is later exported to app.js
const GroupDetails = ({ route, navigation }) => {
  const [group, setgroup] = useState({});

  // Fetches the Groups values and set them
  useEffect(() => {
    setgroup(route.params.group[1]);

    // When we leave the view, empty the object
    return () => {
      setgroup({});
    };
  });

  // We navigate to the editGroup view and send the object with
  // The key we send here is cruical, it defines if we want to edit or add a Group
  const handleEdit = () => {
    const group = route.params.group;
    navigation.navigate("Add / Edit Group", {
      group: group,
      item: "EditGroup",
    });
  };

  // We ask the user for confirmation
  const confirmDelete = () => {
    // which OS is used? in this case we ask if it is mobile
    if (Platform.OS === "ios" || Platform.OS === "android") {
      Alert.alert("Are you sure?", "Do you want to delete the Group?", [
        { text: "Cancel", style: "cancel" },
        // If yes, then trigger handleDelete function
        { text: "Delete", style: "destructive", onPress: () => handleDelete() },
      ]);
    }
  };

  // We Delete the car using firebase methods
  const handleDelete = () => {
    const id = route.params.group[0];
    try {
      firebase
        .database()
        // The Groups ID is used
        .ref(`/groups/${id}`)
        // Remove the data
        .remove();
      // And navigate back
      navigation.goBack();
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  // If there are no created Groups, we should render that there is no data
  if (!group) {
    return <Text>No data</Text>;
  }

  // Defining the initial state of the array that contains information about the Group
  const initialState = {
    GroupName: "",
    Description: "",
    Programme: "",
    ContactInfo: "",
    GroupType: "",
    Members: "",
  };
  const [newGroup, setnewGroup] = useState(initialState);

  useEffect(() => {
    const group = route.params.group[1];
    setnewGroup(group);
    // Remove the data when we leave the view
    return () => {
      setnewGroup(initialState);
    };
  }, []);

  // Function that allows a user to join a group by pushing their email to the group
  const handleJoinGroup = () => {
    const CurrUserMail = firebase.auth().currentUser.email;
    const { Members } = newGroup;

    // We save the new values in the database and redirect to GroupDetails
    const id = route.params.group[0];
    try {
      firebase
        .database()
        .ref(`/groups/${id}`)
        // We use update to update the firebase database
        .update({
          Members: CurrUserMail,
        });
      // When group is altered, we return to group list view
      Alert.alert("Group Joined!");
      const group = [id, newGroup];
      navigation.navigate("Group List", { group });
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  //All content rendered
  return (
    <View style={styles.container}>
      <Button title="Edit" onPress={() => handleEdit()} color="#3F5992" />
      <Button title="Delete" onPress={() => confirmDelete()} color="#3F5992" />
      {Object.entries(group).map((item, index) => {
        return (
          <View style={styles.row} key={index}>
            <Text style={styles.label}>{item[0]} </Text>
            <Text style={styles.value}>{item[1]}</Text>
          </View>
        );
      })}
      <Button
        title="Join Group"
        onPress={() => handleJoinGroup()}
        color="#3F5992"
      />
    </View>
  );
};

// Export component
export default GroupDetails;

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-start" },
  row: {
    margin: 5,
    padding: 5,
    flexDirection: "row",
  },
  label: { width: 100, fontWeight: "bold" },
  value: { flex: 1 },
});
