import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Status from "../utils/status";
import Port from "../utils/portServer";
import { useDispatch } from "react-redux";
import { connectUser } from "../store/store";
import axios from "axios";
import { setToken } from "../utils/tokenUtil";
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
        if (response.data.status === Status.INVALID_EMAIL_OR_PASSWORD) {
          setErrorMessage("Email ou mot de passe invalide");
          setNumFailedAttempts(numFailedAttempts + 1);
          // ...
        } else if (
          response.data.status === Status.SUCCESS_AUTHENTIFICATION_USER
        ) {
          const { token, user } = response.data;
          setToken(token); // Stocke le token dans le client

          // Ajout de l'en-tête Authorization dans toutes les requêtes Axios
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          dispatch(
            connectUser({ firstName: user.firstName, emailUser: user.email })
          );
          navigation.navigate("Home");
          setErrorMessage(null);
          setNumFailedAttempts(0);
        }
        console.log("reponse", response);
      })
      .catch((error) => {
        console.log(error.response);
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
          placeholder="Mot de passe"
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
