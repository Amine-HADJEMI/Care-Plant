import React from "react";
import { View, TouchableOpacity, TextInput, Text } from "react-native";

import axios from "axios";
import Status from "../utils/status";
import Port from "../utils/portServer";
import StyleApp from "../styles/styleApp";
import styles from "../styles/signUpStyle";
import ViewPrivacy from "./ViewPrivacy";
axios.defaults.baseURL = Port.LOCALHOST_WEB;

export default class SignUp extends React.Component {
  state = {
    name: "",
    password: "",
    email: "",
    errorMessage: "",
  };

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  createUser = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,20}$/;

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    if (!user.name || !user.email || !user.password) {
      this.setState({ errorMessage: "Veuillez compléter tous les champs" });
      return;
    }
    if (!emailRegex.test(user.email)) {
      this.setState({ errorMessage: "Le format de l'email est invalide" });

      return;
    }
    if (!passwordRegex.test(user.password)) {
      this.setState({
        errorMessage: `
        Le mot de passe doit respecter les conditions suivantes :\n
          - Avoir une longueur comprise entre 8 et 20 caracteres alphanumériques (sans accents).\n 
          - Contenir au moins 1 lettre MAJUSCULE.\n
          - Contenir au moins 1 lettre minuscule.\n
          - Contenir au moins 1 chiffre.\n
          - Contenir au moins 1 caractère spécial de la liste suivante : *S@&000=#.!?+/£€%\n
        `,
      });
      return;
    }

    axios
      .post("/create-user", user)
      .then((response) => {
        if (response.data.status === Status.USER_ALREADY_EXISTS) {
          this.setState({ errorMessage: "Utilisateur déja existant" });
        }
        if (response.data.status === Status.CREATE_USER) {
          this.props.navigation.navigate("Home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerSignUP}>
          <TextInput
            style={StyleApp.input}
            placeholder="Nom & Prénom"
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={(val) => this.onChangeText("name", val)}
          />
          <TextInput
            style={StyleApp.input}
            placeholder="E-mail"
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={(val) => this.onChangeText("email", val)}
          />
          <TextInput
            style={StyleApp.input}
            placeholder="Mot de passe"
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={(val) => this.onChangeText("password", val)}
          />

          <TouchableOpacity
            style={styles.signUpBtn}
            onPress={() => this.createUser()}
          >
            <Text style={styles.loginText}>Inscription</Text>
          </TouchableOpacity>

          {this.state.errorMessage && (
            <Text style={styles.errorStyle}>{this.state.errorMessage}</Text>
          )}
        </View>
        <View style={styles.privacyContainer}>
          <ViewPrivacy navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}
