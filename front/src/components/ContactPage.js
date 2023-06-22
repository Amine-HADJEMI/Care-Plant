import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from "axios";
import Port from "../utils/portServer";

// const ContactPage = () => {
axios.defaults.baseURL = Port.LOCALHOST_WEB;
export default class SignUp extends React.Component {

  state = {
    name: "",
    email: "",
    message: "",
  };

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  handleSubmit = () => {
    console.log('state', this.state)
    axios
      .post("/contact-us", 
        { name: this.state.name, 
          email: this.state.email,  
          message: this.state.message,  
        })
      .then((response) => {
        console.log(responses);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Contactez-nous</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          onChangeText={(val) => this.onChangeText("name", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Adresse e-mail"
          onChangeText={(val) => this.onChangeText("email", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Message"
          multiline
          onChangeText={(val) => this.onChangeText("message", val)}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// export default ContactPage;
