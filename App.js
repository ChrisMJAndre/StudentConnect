// Found this on website to remove an annoying yellow error message complaining about timeout
// Error - Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake,
// and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info. (Saw setTimeout with duration 3299603ms)
import { LogBox } from "react-native";
import _ from "lodash";

LogBox.ignoreLogs(["Warning:..."]); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

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
import SignUpForm from "./Components/SignUpForm";
import LoginForm from "./Components/LoginForm";

// Imports for TabNavigator - Chris
import ProfileList from "./Components/ProfileList";
import Add_edit_Profile from "./Components/Add_edit_Profile";
import ProfileDetails from "./Components/ProfileDetails";
import MyProfile from "./Components/MyProfile";
import Add_edit_Group from "./Components/Groups/Add_edit_Group";
import GroupList from "./Components/Groups/GroupList";
import GroupDetails from "./Components/Groups/GroupDetails";

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

  /*
<Card style={{ padding: 20 }}>
          <SignUpForm />
        </Card>
*/

  // Defing the GuestPage where you can sign up or log in and link to the two corresponding components - Chris
  const GuestPage = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Login with your Email</Text>

        <Card style={{ padding: 20 }}>
          <LoginForm />
        </Card>

        <Card style={{ padding: 20 }}>
          <Button
            onPress={() => navigation.navigate("Create Account Page")}
            title="Create Account"
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

  const PublicStackNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name={"Welcome Page"} component={GuestPage} />
        <Stack.Screen name={"Create Account Page"} component={CreatePage} />
      </Stack.Navigator>
    );
  };

  // Defining the stacknavigation previously defined. Name defined and what component it should link to - Chris
  const StackNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name={"SearchGroupList"} component={GroupList} />
        <Stack.Screen name={"GroupDetails"} component={GroupDetails} />
        <Stack.Screen name={"EditGroup"} component={Add_edit_Group} />
        <Stack.Screen name={"Create Account Page"} component={SignUpForm} />
      </Stack.Navigator>
    );
  };

  // If the user is logged in he/she should se the navigation container which has the bottom navigator so that the user can tab between them - Chris
  // If not logged in the user should be thrown back to the Guest Page where they can sign up or log in - Chris
  return user.loggedIn ? (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={"My Profile"}
          component={MyProfile}
          options={{ tabBarIcon: () => <Ionicons name="home" size={20} /> }}
        />
        <Tab.Screen
          name={"Groups"}
          component={StackNavigation}
          options={{
            tabBarIcon: () => <Ionicons name="search" size={20} />,
            headerShown: null,
          }}
        />
        <Tab.Screen
          name={"Events"}
          component={Add_edit_Group}
          options={{ tabBarIcon: () => <Ionicons name="search" size={20} /> }}
        />
      </Tab.Navigator>
    </NavigationContainer>

  ) : (
    <NavigationContainer>
      <PublicStackNavigation />
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
});
