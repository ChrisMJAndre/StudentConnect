// Imports - Chris
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import firebase from "firebase";
import { useEffect, useState } from "react";
//import { useHistory } from "react-router-dom";

// Define component - Chris
const GroupList = ({ navigation }) => {
  const [groups, setgroups] = useState();
  const [filterKey, setFilterKey] = useState(null);
  const [JoinedKey, setJoinedKey] = useState(null);

  // We snapshot the groups defined - Chris - read up on what a snapshot is- Chris
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

  // If there is not groups then display message - Chris
  if (!groups) {
    return <Text>Loading... or Database is empty</Text>;
  }

  // We search in the array for groups and find the group object that matches the id we sendt with - Chris
  const handleSelectGroup = (id) => {
    const group = Object.entries(groups).find(
      (group) => group[0] === id /*id*/
    );

    navigation.navigate("Group Details", { group });
  };

  const handleToggle = (key) => {
    setFilterKey(key);
  };

  // Flatlist expects an array. Therefore we take all our values from our group object and use an array for the list - Chris
  const groupArray = Object.values(groups);
  const groupKeys = Object.keys(groups);

  // We use groupKeys to find the ID of the group and return it as a key - Chris
  // console.log(groupArray, "hele");

  const filter = filterKey
    ? groupArray.filter((item) => item.GroupType == filterKey)
    : groupArray;

  return (
    <View>
      <View style={styles.filter}>
        <Button onPress={() => handleToggle(null)} title={"All"} />
        <Button onPress={() => handleToggle("Study")} title={"Study"} />
        <Button onPress={() => handleToggle("Nightout")} title={"Nightout"} />
        <Button onPress={() => handleToggle("Social")} title={"Social"} />
      </View>
      <FlatList
        //data={filter}
        data={filter}
        keyExtractor={(item, index) => groupKeys[index]}
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
    alignItems: "center",
    flexDirection: "row",
  },
  label: { fontWeight: "bold" },
  but: {},
  buttonContainer: {
    flex: 1,
  },
  filter: {
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "#FF0000",
  },
});
