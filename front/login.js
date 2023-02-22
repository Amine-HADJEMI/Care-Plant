import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import axios from 'axios'

export default function Login({navigation}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);


  axios.defaults.baseURL = 'http://localhost:3000/'

  const loginSuccess = (email, password) => {
    const data = [
      {
        email: "toto@epsi.fr",
        password: "1234"
      },
      {
        email: "titi@epsi.fr",
        password: "0000"
      }, 
      {
        email: "test@epsi.fr",
        password: "5555"
      }
    ]
  
    axios.post('/login', {email, password})
    .then(response => {
      navigation.navigate('Home')

    // Le code de statut HTTP est 200, l'authentification a réussi
      console.log(response.data);
    })
    .catch(error => {
    // Le code de statut HTTP n'est pas 200, l'authentification a échoué
    console.log(error.response.data.message);
    });

    // Avoir aprés modification du back-------------------------------------------------------------------
     const requestLogin = axios.post('/login', {email, password});
     console.log('requestLogin',requestLogin)
     const element = { email, password }
     const isInData = data.find(obj => obj.email === element.email && obj.password === element.password);
     if (isInData) {
       navigation.navigate('Home')
       console.log("element exist in the database");
     } else {
       console.log("element is not existing in the database");

       // window.alert('INVALID PASSWORD OR EMAIL');
       setErrorMessage('Email ou mot de passe incorrect');
     }
     //----------------------------------------------------------------------------------------------------
  }

  return (

    <View style={styles.container}>

    <Text>Careplant</Text>

    <Image source={require('./assets/logo.jpg')} style={styles.logo} />
    

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

      {/* Afficher le message d'erreur si nécessaire */}
      {errorMessage && <p style={styles.errorStyle}>{errorMessage}</p>} 
      
      <TouchableOpacity style={styles.signUpBtn}
          onPress={() =>
            navigation.navigate('Signup')
          }> 
          <Text style={styles.loginText}>Vous n'avez pas de compte?</Text> 
      </TouchableOpacity>
      
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
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  image: {
    marginBottom: 40,
    maxWidth: "50%",
  },
  inputView: {
    backgroundColor: "#A1E79F",
    borderRadius: 30,
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
    // maxWidth: "500px",
  },
  loginText: {
    fontSize: "larger",
    fontWeight: "bold",
  },
  errorStyle: {
    color: "red",
  }
});