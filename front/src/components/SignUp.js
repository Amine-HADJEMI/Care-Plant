import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet, 
  Text
} from 'react-native'

import axios from 'axios'
import Status from '../utils/status'

axios.defaults.baseURL = 'http://localhost:3000/'

export default class SignUp extends React.Component {
  state = {
    username: '',
    name: '',
    password: '',
    email: '',
    errorMessage: '',
  };

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
 
  createUser = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,}$/;

    const user = {
      userName : this.state.username,      
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    if (!user.userName || !user.name || !user.email || !user.password){
      console.log('veuillez compléter tout les champs')
      this.setState({ errorMessage: 'Veuillez compléter tous les champs' });      
      return
    }
    if (!emailRegex.test(user.email) ) {
      this.setState({ errorMessage: 'Le format de l\'email est invalide' });

      return
    }  
    if (!passwordRegex.test(user.password)){
      this.setState({ errorMessage: 'Le mot de passe doit contenir au moins 6 caractères' });
      return
    } 

    console.log('ma user: ',user)
    axios.post('/create-user', user)
    .then(response => {
      console.log(response.data)
      if(response.data.status === Status.USER_ALREADY_EXISTS){
        this.setState({ errorMessage: 'Utilisateur déja existant' })
      }
      if(response.data.status === Status.CREATE_USER){
        //TODO navigation to Login !
        this.props.navigation.navigate('HomePage')
      }
    })
    .catch(error => {
      console.log('eeeeeroooooor', error)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Name'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('name', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />

        <TouchableOpacity style={styles.signUpBtn} 
          onPress= {() => this.createUser()}
        > 
          <Text style={styles.loginText} >Sign Up</Text> 
        </TouchableOpacity>

        {this.state.errorMessage && <Text style={styles.errorStyle}>{this.state.errorMessage}</Text>} 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#A1E79F',
    margin: 10,
    padding: 8,
    color: 'black',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
    width: "80%",
    maxWidth: 500,
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpBtn: {
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
  inputView: {
    backgroundColor: "#A1E79F",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    maxWidth: 400,
  },
  errorStyle: {
    color: 'red',
    paddingTop: '2%'
  }
})