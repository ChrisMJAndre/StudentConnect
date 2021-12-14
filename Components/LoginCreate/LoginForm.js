// React Imports
import React, { useState } from "react";
import { Button, Text, View, TextInput, StyleSheet } from "react-native";
import firebase from "firebase";

// Define function and their constant that can be altered, aswell as their initial state
// Email and password is here pre-defined (should probs be deleted before we deliver) - chris
function LoginForm() {
  const [email, setEmail] = useState("test@test.dk");
  const [password, setPassword] = useState("testtest");
  const [errorMessage, setErrorMessage] = useState(null);

  // Simple button that activates handlesubmit when you want to login
  const renderButton = () => {
    return (
      <Button onPress={() => handleSubmit()} title="Login" color="#3F5992" />
    );
  };

  // Onpress button this actives. It checks if the email and password entered matches anything in the database
  const handleSubmit = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((data) => {});
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // All content rendered
  return (
    <View>
      <Text style={StyleSheet.header}> Login </Text>
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

export default LoginForm;
