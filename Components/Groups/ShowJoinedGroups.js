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
const ShowJoinedGroups = ({ route, navigation }) => {
  const [group, setgroup] = useState({});

  // Fetches the Groups values and set them - Chris
  useEffect(() => {
    setgroup(route.params.group[1]);

    // When we leave the view, empty the object - Chris
    return () => {
      setgroup({});
    };
  });

  if (!group) {
    return <Text>No data</Text>;
  }

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
    // Remove the data when we leave the view - Chris
    return () => {
      setnewGroup(initialState);
    };
  }, []);

  const handleLeaveGroup = () => {
    const { Members } = newGroup;

    // We save the new values in the database and redirect to GroupDetails - Chris
    const id = route.params.group[0];
    try {
      firebase
        .database()
        .ref(`/groups/${id}`)
        // Vi bruger update, så kun de felter vi angiver, bliver ændret
        .update({
          Members: "",
        });
      // Når bilen er ændret, går vi tilbage.
      Alert.alert("You have left the group");
      const group = [id, newGroup];
      navigation.navigate("Group List", { group });
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  //All content rendered - Chris
  return (
    <View style={styles.container}>
      {Object.entries(group).map((item, index) => {
        return (
          <View style={styles.row} key={index}>
            <Text style={styles.label}>{item[0]} </Text>
            <Text style={styles.value}>{item[1]}</Text>
          </View>
        );
      })}
      <Button title="Leave Group" onPress={() => handleLeaveGroup()} />
    </View>
  );
};

// Export component - Chris
export default ShowJoinedGroups;

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
