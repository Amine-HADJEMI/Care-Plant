import React from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Text
} from 'react-native'

import axios from 'axios'
import Status from '../utils/status'
import Port from '../utils/portServer'
import StyleApp from '../styles/styleApp'
import styles from '../styles/signUpStyle';

axios.defaults.baseURL = Port.LOCALHOST_WEB

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
        this.props.navigation.navigate('Home')
      }
    })
    .catch(error => {
      console.log( error)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={StyleApp.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={StyleApp.input}
          placeholder='Nom & Prénom'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('name', val)}
        />
        <TextInput
          style={StyleApp.input}
          placeholder='E-mail'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={StyleApp.input}
          placeholder='Mot de passe'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />

        <TouchableOpacity style={styles.signUpBtn} 
          onPress= {() => this.createUser()}
        > 
          <Text style={styles.loginText} >Inscription</Text> 
        </TouchableOpacity>

        {this.state.errorMessage && <Text style={styles.errorStyle}>{this.state.errorMessage}</Text>} 
      </View>
    )
  }
}
