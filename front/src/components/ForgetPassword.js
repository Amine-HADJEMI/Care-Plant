import React from 'react'
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet, 
  Text
} from 'react-native'

import axios from 'axios'
import Port from '../utils/portServer'
import Status from '../utils/status'
import StyleApp from '../styles/styleApp'
// import { useDispatch} from "react-redux";

axios.defaults.baseURL = Port.LOCALHOST_WEB

// const dispatch = useDispatch();
export default class ForgetPassword extends React.Component {
  

  state = {
    email: '',
    errorMessage: ''
  }
  
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  changePassword = () => {
    const data = {
      email: this.state.email,
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log('votre adresse mail est',data.email)
    
    if (!emailRegex.test(data.email) ) {
      this.setState({ errorMessage: 'Le format de l\'email est invalide' });
      return
    }  

    axios.post('/send-confirmation-email', { email: data.email })
    .then(response => {
      console.log('is True avant', this.state.invalidEmail)
      if(response.data.status === Status.UNKNOWN_USER){
        this.setState({ errorMessage: 'Utilisateur non existant' })
      }
      if(response.data.status === Status.MAIL_SENDED_SUCCESSFULLY){
        // dispatch(forgetPasswordUserEmail({ emailUser: data.email }))        

        this.props.navigation.navigate('ChangePassword')

        console.log('todo navigate')
      }
      console.log('is True apres', this.state.invalidEmail)

      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.putEmail} >
          Veuillez saisir votre adresse e-mail !
        </Text>
        <TextInput
          style={StyleApp.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        /> 
        <TouchableOpacity style={styles.signUpBtn} 
          onPress= {() => this.changePassword() }
        > 
        <Text style={styles.loginText}>Suivant</Text> 
        </TouchableOpacity>

        <Text>{this.state.errorMessage && <Text style={styles.errorStyle}>{this.state.errorMessage}</Text>} </Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  putEmail: {
    fontSize: 'larger',
    fontWeight: "bold",
    margin: 60  , 
  },
  errorStyle: {
    color: "red",
  }
})