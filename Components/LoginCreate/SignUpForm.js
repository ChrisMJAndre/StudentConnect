// React Imports
import React, { useState } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import firebase from "firebase";

// Define function and their constant that can be altered, aswell as their initial state
function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  // Simple button that activates handlesubmit when you want to signup
  const renderButton = () => {
    return (
      <Button
        onPress={() => handleSubmit()}
        title="Create User"
        color="#3F5992"
      />
    );
  };

  // Onpress button this actives. It creates a new user with the entered email and password and stores it in the database
  const handleSubmit = async () => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {});
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // All content rendered
  return (
    <View>
      <Text style={StyleSheet.header}> Sign Up </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry
        style={styles.inputField}
      />
      {errorMessage && (
        <Text style={styles.error}> Error: {errorMessage} </Text>
      )}
      {renderButton()}
    </View>
  );
}

// Export Component
export default SignUpForm;

// Styles
const styles = StyleSheet.create({
  error: {
    color: "red",
  },
  inputField: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 40,
  },
});
