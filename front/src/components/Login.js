import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Status from "../utils/status";
import Port from "../utils/portServer"
import { useDispatch} from "react-redux";
import { connectUser } from '../store/store'
import axios from "axios";

import styles from '../styles/loginStyle';

// import io from 'socket.io-client';

export default function Login({navigation}) {

  const dispatch = useDispatch();

  // const socket = io('http://localhost:3000');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);


  axios.defaults.baseURL = Port.LOCALHOST_WEB

  const loginSuccess = (email, password) => {    
    // navigation.navigate('Home')
    
    axios.post('/login', {email, password})
    .then(response => {
      
      if (response.data.status === Status.INVALID_EMAIL_OR_PASSWORD) {
        setErrorMessage('invalid email or password')
      } else if (response.data.status === Status.SUCCESS_AUTHENTIFICATION_USER) {
        
        console.log('test', response.data.user.userName)
        console.log('test', response.data.user)

        dispatch(connectUser({ userName: response.data.user.userName, name: response.data.user.name, emailUser: response.data.user.email }))        

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
