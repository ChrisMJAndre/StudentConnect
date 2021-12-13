// React imports
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

// Define component that is later exported to app.js
const GroupList = ({ navigation }) => {
  const [groups, setgroups] = useState();
  const [filterKey, setFilterKey] = useState(null);

  // We snapshot the groups defined - Chris - read up on what a snapshot is
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

  // If there is not groups then display message
  if (!groups) {
    return <Text>Loading... or Database is empty</Text>;
  }

  // Define to be an empty object
  let filteredGroup = {};

  // loops based on filter key which equals the key we want to show in list
  filterKey
    ? Object.entries(groups).map((group) => {
        return (
          group[1].GroupType == filterKey &&
          Object.assign(filteredGroup, { [group[0]]: group[1] })
        );
      })
    : (filteredGroup = groups);

  const groupArray = Object.values(filteredGroup);
  const groupKeys = Object.keys(filteredGroup);

  // We search in the array for groups and find the group object that matches the id we sendt with
  const handleSelectGroup = (id) => {
    const group = Object.entries(groups).find((group) => group[0] === id);

    // Navigate to group details with the object so that we can display the information
    navigation.navigate("Group Details", { group });
  };

  // Simple functions that sets the value of Filterkey to the selected value
  const handleToggle = (key) => {
    setFilterKey(key);
  };

  // All content rendered
  // 4 Filter Options
  // And a flatlist containing all Groups
  return (
    <View>
      <View style={styles.filter}>
        <Button
          onPress={() => handleToggle(null)}
          title={"All"}
          color={"#3F5992"}
        />
        <Button
          onPress={() => handleToggle("Study")}
          title={"Study"}
          color={"#3F5992"}
        />
        <Button
          onPress={() => handleToggle("Nightout")}
          title={"Nightout"}
          color={"#3F5992"}
        />
        <Button
          onPress={() => handleToggle("Social")}
          title={"Social"}
          color={"#3F5992"}
        />
      </View>
      <FlatList
        data={groupArray}
        keyExtractor={(item, index) => groupKeys[index]}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                console.log(groups);
                handleSelectGroup(groupKeys[index]);
              }}
            >
              <Text style={styles.title}>{item.GroupName}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

// Export component
export default GroupList;

// Styles
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
    backgroundColor: "#3F5992",
    marginVertical: 5,
    marginHorizontal: 70,
  },
  label: { fontWeight: "bold" },
  but: {},
  buttonContainer: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
    color: "#F7F7F3",
    fontSize: 15,
  },
  filter: {
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "#FF0000",
    textAlign: "center",
    marginVertical: 5,
    color: "#F7F7F3",
    fontSize: 15,
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
  },
});
