import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";

import axios from "axios";

export default function Login({navigation}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);


  axios.defaults.baseURL = 'http://localhost:3000/'

  const loginSuccess = (email, password) => {    
    // console.log('ma data',{email, password})
    
    axios.post('/login', {email, password})
    .then(response => {
      if (response.data.status === 60) {
        console.log('invalid email or password')
        setErrorMessage('invalid email or password')
      } else if (response.data.status === 50) {
        navigation.navigate('Home')

        setErrorMessage(null)
      }
      console.log('reponse',response.data);
    })
    .catch(error => {
      console.log(error.response.data.message);
    });
  }

  return (

    <View style={styles.container}>

    <Image source={require('../assets/arosa-je.png')} style={styles.logo} />
    

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
      
      <TouchableOpacity style={styles.mdpBtn}
          onPress={() =>
            navigation.navigate('ForgetPassword')
          }> 
          <Text style={styles.loginText}>Mot de passe oublié</Text> 
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={ () => loginSuccess(email, password) }> 
        <Text style={styles.loginText}>Connexion</Text>
      </TouchableOpacity> 
      
      <TouchableOpacity style={styles.signUpBtn}
          onPress={() =>
            navigation.navigate('Signup')
          }> 
          <Text style={styles.loginText}>Vous n'avez pas de compte?</Text> 
      </TouchableOpacity>

      {errorMessage && <Text style={styles.errorStyle}>INVALID E-MAIL OR PASSWORD</Text>} 
    </View> 
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 260,
    height: 130,
    marginBottom: 70,
  },
  image: {
    marginBottom: 40,
    maxWidth: "50%",
  },
  inputView: {
    backgroundColor: "#A1E79F",
    borderRadius: 30,
    border : 'solid #8FCD8D',
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    maxWidth: 400,
  },
  TextInput: {
    borderRadius: 30,
    height: 50,
    flex: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
  },
  mdpBtn: {
    height: 20,
    marginBottom: 10,
    color: "#000",
    backgroundColor: "#fff",
    fontSize: "small",
  },
  signUpBtn: {
    height: 30,
    marginBottom: 40,
    marginTop: 10,
    color: "#000",
    backgroundColor: "#fff",
    fontSize: "small",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#66D163",
    maxWidth: 500,
  },
  loginText: {
    fontSize: "larger",
    fontWeight: "bold",
  },
  errorStyle: {
    color: "red",
  }
});