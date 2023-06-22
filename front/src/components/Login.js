import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Status from "../utils/status";
import Port from "../utils/portServer";
import { useDispatch } from "react-redux";
import { connectUser } from "../store/store";
import axios from "axios";

import styles from "../styles/loginStyle";

export default function Login({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [numFailedAttempts, setNumFailedAttempts] = useState(0);

  axios.defaults.baseURL = Port.LOCALHOST_WEB;

  const loginSuccess = (email, password) => {
    axios
      .post("/login", { email, password })
      .then((response) => {
        navigation.navigate("Home");

        if (response.data.status === Status.INVALID_EMAIL_OR_PASSWORD) {
          setErrorMessage("invalid email or password");
          setNumFailedAttempts(numFailedAttempts + 1);
          if (numFailedAttempts >= 4) {
            setErrorMessage("Votre compte a été verrouillé");
          }
        } else if (
          response.data.status === Status.SUCCESS_AUTHENTIFICATION_USER
        ) {
          dispatch(
            connectUser({
              userName: response.data.user.userName,
              name: response.data.user.name,
              emailUser: response.data.user.email,
            })
          );

          navigation.navigate("Home");

          setErrorMessage(null);
          setNumFailedAttempts(0);
        }
        console.log("reponse", response.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/arosa-je.png")} style={styles.logo} />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Adresse email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Mot de passe top secret"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity
        style={styles.mdpBtn}
        onPress={() => navigation.navigate("ForgetPassword")}
      >
        <Text style={styles.loginText}>Mot de passe oublié</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => loginSuccess(email, password)}
      >
        <Text style={styles.loginText}>Connexion</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signUpBtn}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.loginText}>Vous n&apos;avez pas de compte?</Text>
      </TouchableOpacity>

      {errorMessage && <Text style={styles.errorStyle}>{errorMessage}</Text>}
    </View>
  );
}

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
};
