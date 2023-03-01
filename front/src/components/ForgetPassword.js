import React from 'react'
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet, 
  Text
} from 'react-native'

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/'

export default class ForgetPassword extends React.Component {
  state = {
    email: '',
    invalidEmail: false
  }
  
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  changePassword = () => {
    const data = {
      email: this.state.email,
    };

    console.log('votre adresse mail est',data.email)
  
    axios.post('/send-confirmation-email', {email: data.email})
    .then(response => {
      console.log('is True avant', this.state.invalidEmail)
      if(response.data.status === 40){
        this.state.invalidEmail = true
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
        <Text
          style={styles.putEmail}
        >
          Veuillez saisir votre adresse e-mail !
        </Text>
        <TextInput
          style={styles.input}
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

        {this.state.invalidEmail && <Text style={styles.errorStyle}>INVALID E-MAIL</Text>} 

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
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
    width: "80%",
    maxWidth: 500,
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
  putEmail: {
    fontSize: 'larger',
    fontWeight: "bold",
    margin: 60  , 
  },
  errorStyle: {
    color: "red",
  }
})