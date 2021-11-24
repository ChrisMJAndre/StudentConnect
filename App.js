// Found this on website to remove an annoying yellow error message complaining about timeout
// Error - Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake,
// and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info. (Saw setTimeout with duration 3299603ms)
import { Image, LogBox } from "react-native";
import _ from "lodash";

LogBox.ignoreLogs(["Warning:..."]); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

// Import for SetProfileTest Screen
import SetProfile from "./Components/Profile/SetProfile";

// Import of dependencies - Chris
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Imports for Login Screen - Chris
import { useState } from "react";
import { Card } from "react-native-paper";

import SignUpForm from "./Components/LoginCreate/SignUpForm";
import LoginForm from "./Components/LoginCreate/LoginForm";

// Imports for Camera Screen
import CameraScreen from "./Components/Profile/CameraScreen";
import ImageScreen from "./Components/Profile/ImageScreen";

// Imports for TabNavigator - Chris

import MyProfile from "./Components/Profile/MyProfile";
// Group imports
import Add_edit_Group from "./Components/Groups/Add_edit_Group";
import GroupList from "./Components/Groups/GroupList";
import GroupDetails from "./Components/Groups/GroupDetails";

// Event imports
import Add_edit_Event from "./Components/Events/Add_edit_Events";
import EventList from "./Components/Events/EventList";
import EventDetails from "./Components/Events/EventDetails";
import joinedGroup from "./Components/Groups/JoinedGroup";
import ShowJoinedGroups from "./Components/Groups/ShowJoinedGroups";

// Here the code of App.js starts with the start of function App - Chris
export default function App() {
  // Firebase config file obtained from firebase.google.com - Chris
  const firebaseConfig = {
    apiKey: "AIzaSyARPNCZdXnprC5WHf-rsPv4kEhnrVmuezM",
    authDomain: "examapp-77a38.firebaseapp.com",
    projectId: "examapp-77a38",
    storageBucket: "examapp-77a38.appspot.com",
    messagingSenderId: "138974946795",
    appId: "1:138974946795:web:dd2c9566011a6b68fd65ae",
  };

  // We check if an instance of the database is already initialized - Chris
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  // Define user and setUser const, and the usestate to be false by default - Chris
  const [user, setUser] = useState({ loggedIn: false });
  const [Profiles, setProfiles] = useState();
  const [profiled, setProfiled] = useState(false);

  // Define const for stacknavigator and bottomnavigator - Chris
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  // onAuthStateChanged is a predefined methode supplied by Firebase, that constantly observe the status of the user (is he/she logged in or not?) - Chris
  // The users status is used with a callback in the form of setUser methode, that handles the user-state variable's status - Chris
  function onAuthStateChange(callback) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback({ loggedIn: true, user: user });
      } else {
        callback({ loggedIn: false });
      }
    });
  }

  // The listener is here actived so that we can monitor the status of the user - Chris
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  // DENNE KODE SKAL BRUGES TIL AT BESTEMME AT MAN SKAL SÆTTE EN PROFIL FØR MAN MÅ SE EN PROFIL
  // kunne godt tænke mig at smide disse to use effects ind i en if statement der tjekker om man er logget ind eller ej - if (user.loggedIn) {}
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

  useEffect(() => {
    if (Profiles && firebase.auth().currentUser) {
      const isProfiledCreated =
        Object.values(Profiles).filter(
          (item) => item.Email == firebase.auth().currentUser.email
        ).length > 0;

      setProfiled(isProfiledCreated);
    }
  }, [Profiles]);

  // Defing the GuestPage where you can sign up or log in and link to the two corresponding components - Chris
  const GuestPage = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Image
          style={styles.avatar}
          source={require("./assets/StudentConnectLogo.png")}
        />
        <Text style={styles.paragraph}>Login with your Email</Text>

        <Card style={{ padding: 20 }}>
          <LoginForm />
        </Card>

        <Card style={{ padding: 20 }}>
          <Button
            onPress={() => navigation.navigate("Create Account Page")}
            title="Create Account"
            color="#3F5992"
          />
        </Card>
      </View>
    );
  };

  const CreatePage = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Create a new Account</Text>

        <Card style={{ padding: 20 }}>
          <SignUpForm />
        </Card>
      </View>
    );
  };

  const ProfilePage = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <MyProfile />
        <Button
          onPress={() => navigation.navigate("Camera Page")}
          title="Camera"
          color="#3F5992"
        />
      </View>
    );
  };

  const CameraPage = () => {
    return (
      <View style={styles.container}>
        <CameraScreen />
      </View>
    );
  };

  const GroupListPage = ({ navigation }) => {
    return (
      <View>
        <Button
          onPress={() =>
            navigation.navigate("Add / Edit Group", { item: "Add Group" })
          }
          title="Create Group"
          align="right"
          color="#3F5992"
        />
        <Button
          onPress={() => navigation.navigate("Joined Group")}
          title="Joined Groups"
          align="right"
          color="#3F5992"
        />
        <GroupList navigation={navigation} />
      </View>
    );
  };

  const EventListPage = ({ navigation }) => {
    return (
      <View>
        <Button
          onPress={() =>
            navigation.navigate("Add / Edit Event", { item: "Add Event" })
          }
          title="Create Event"
          align="right"
          color="#3F5992"
        />
        <EventList navigation={navigation} />
      </View>
    );
  };

  const ProfileStackNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name={"Profile Page"} component={ProfilePage} />
        <Stack.Screen name={"Camera Page"} component={CameraPage} />
      </Stack.Navigator>
    );
  };

  const LoginStackNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={"Welcome Page"}
          component={GuestPage}
          options={{
            headerShown: null,
          }}
        />
        <Stack.Screen name={"Create Account Page"} component={CreatePage} />
      </Stack.Navigator>
    );
  };

  // Defining the stacknavigation previously defined. Name defined and what component it should link to - Chris
  const GroupStackNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name={"Group List"} component={GroupListPage} />
        <Stack.Screen name={"Group Details"} component={GroupDetails} />
        <Stack.Screen name={"Add / Edit Group"} component={Add_edit_Group} />
        <Stack.Screen name={"Joined Group"} component={joinedGroup} />
        <Stack.Screen
          name={"Show Joined Groups"}
          component={ShowJoinedGroups}
        />
      </Stack.Navigator>
    );
  };

  const EventStackNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name={"Event List"} component={EventListPage} />
        <Stack.Screen name={"Event Details"} component={EventDetails} />
        <Stack.Screen name={"Add / Edit Event"} component={Add_edit_Event} />
      </Stack.Navigator>
    );
  };

  // If the user is logged in he/she should se the navigation container which has the bottom navigator so that the user can tab between them - Chris
  // If not logged in the user should be thrown back to the Guest Page where they can sign up or log in - Chris

  // DENNE KODE SKAL ERSTATTE TAB SCREEN FOR MY PROFILE NÅR DEN VIRKER
  /*
  {!profiled ? (
          <Tab.Screen
            name={"SETUP PROFILE TEST"}
            component={SetProfile}
            options={{ tabBarIcon: () => <Ionicons name="home" size={20} /> }}
          />
        ) : (
          <Tab.Screen
            name={"My Profile"}
            component={ProfileStackNavigation}
            options={{
              tabBarIcon: () => <Ionicons name="home" size={20} />,
              headerShown: null,
            }}
          />
        )}
        */

  return user.loggedIn ? (
    <NavigationContainer>
      <Tab.Navigator>
        {!profiled ? (
          <Tab.Screen
            name={"SETUP PROFILE TEST"}
            component={SetProfile}
            options={{ tabBarIcon: () => <Ionicons name="home" size={20} /> }}
          />
        ) : (
          <Tab.Screen
            name={"My Profile"}
            component={ProfileStackNavigation}
            options={{
              tabBarIcon: () => <Ionicons name="home" size={20} />,
              headerShown: null,
            }}
          />
        )}
        <Tab.Screen
          name={"Groups"}
          component={GroupStackNavigation}
          options={{
            tabBarIcon: () => <Ionicons name="search" size={20} />,
            headerShown: null,
          }}
        />
        <Tab.Screen
          name={"Events"}
          component={EventStackNavigation}
          options={{
            tabBarIcon: () => <Ionicons name="search" size={20} />,
            headerShown: null,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <LoginStackNavigation />
    </NavigationContainer>
  );
}

// Defining styles - Chris
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: "5%",
    backgroundColor: "transparent",
    padding: 20,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  avatar: {
    alignSelf: "center",
    height: 120,
    width: 120,
    bottom: 80,
  },
});
