// Imports - Chris
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

// Define function and their constant that can be altered, aswell as their initial state - Chris
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCompleted, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Simple button that activates handlesubmit when you want to login - Chris
  const renderButton = () => {
    return <Button onPress={() => handleSubmit()} title="Login" />;
  };

  // Onpress button this actives. It chekcs if the email and password entered matches anything in the database - Chris
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

  // The Front end of the login view - Chris
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

// Styles - Chris
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
