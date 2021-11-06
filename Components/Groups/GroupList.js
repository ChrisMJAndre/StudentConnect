// Imports - Chris
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Image,
} from "react-native";
import firebase from "firebase";
import { useEffect, useState } from "react";
import Add_edit_Group from "./Add_edit_Group";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

// Define component - Chris
const GroupList = ({ navigation }) => {
  const [groups, setgroups] = useState();

  // We snapshot the profiles defined - Chris - read up on what a snapshot is- Chris
  useEffect(() => {
    if (!groups) {
      firebase
        .database()
        .ref("/groups")
        .on("value", (snapshot) => {
          setgroups(snapshot.val());
        });
    }
  }, []);

  // If there is not profiles then display message - Chris
  if (!groups) {
    return <Text>Loading... or Database is empty</Text>;
  }

  // We search in the array for profiles and find the profile object that matches the id we sendt with - Chris
  const handleSelectGroup = (id) => {
    const group = Object.entries(groups).find(
      (group) => group[0] === id /*id*/
    );
    navigation.navigate("GroupDetails", { group });
  };

  // Flatlist expects an array. Therefore we take all our values from our profile object and use an array for the list - Chris
  const groupArray = Object.values(groups);
  const groupKeys = Object.keys(groups);

  const Stack = createNativeStackNavigator();

  // We use profileKeys to find the ID of the profile and return it as a key - Chris
  return (
    <View>
      <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#00cc00"
                align="right"
                style={styles.but}
              />
    <FlatList
      data={groupArray}
      keyExtractor={( item, index) => groupKeys[index]}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            style={styles.container}
            onPress={() => handleSelectGroup(groupKeys[index])}
          >
            <Text>{item.GroupName}</Text>
          </TouchableOpacity>
        );
      }}
    />
    </View>
  );
};

// Export component - Chris
export default GroupList;

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
  but: {
  },
},

);