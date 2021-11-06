// Imports - Chris
import React from "react";
import {
  View,
  Text,
  Platform,
  FlatList,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import firebase from "firebase";
import { useEffect, useState } from "react";

// Define the Component functionality- Chris
const GroupDetails = ({ route, navigation }) => {
  const [group, setgroup] = useState({});

  // Fetches the profiles values and set them - Chris
  useEffect(() => {
    setgroup(route.params.group[1]);

    // When we leave the view, empty the object - Chris
    return () => {
      setgroup({});
    };
  });

  // We navigate to the editprofile view and send the object with - Chris
  const handleEdit = () => {
    const group = route.params.group;
    navigation.navigate("EditGroup", { group });
  };

  // We ask the user for confirmation - Chris
  const confirmDelete = () => {
    // which OS is used? in this case we ask if it is mobile - Chris
    if (Platform.OS === "ios" || Platform.OS === "android") {
      Alert.alert("Are you sure?", "Do you want to delete the group?", [
        { text: "Cancel", style: "cancel" },
        // If yes, then trigger handleDelete function - Chris
        { text: "Delete", style: "destructive", onPress: () => handleDelete() },
      ]);
    }
  };

  // We Delete the car using firebase methods - Chris
  const handleDelete = () => {
    const id = route.params.group[0];
    try {
      firebase
        .database()
        // The profiles ID is used - Chris
        .ref(`/groups/${id}`)
        // Remove the data - Chris
        .remove();
      // And navigate back- Chris
      navigation.goBack();
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  if (!group) {
    return <Text>No data</Text>;
  }

  //All content rendered - Chris
  return (
    <View style={styles.container}>
      <Button title="Edit" onPress={() => handleEdit()} />
      <Button title="Delete" onPress={() => confirmDelete()} />
      {Object.entries(group).map((item, index) => {
        return (
          <View style={styles.row} key={index}>
            {/*Profile key Names* /}
            <Text style={styles.label}>{item[0]} </Text>
            {/*Profile value names */}
            <Text style={styles.value}>{item[1]}</Text>
          </View>
        );
      })}
    </View>
  );
};

// Export component - Chris
export default GroupDetails;

// Styles - Chris
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
