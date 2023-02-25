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
    email: ''
  }
  
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  changePassword = () => {
    const data = {
      email: this.state.email,
    };

    console.log('votre adresse mail est',data.email)
  
    // axios.post('/sendMail', data.email)
    // .then(response => {
    //   console.log(response.data)
    // })
    // .catch(error => {
    //   console.log(error)
    // })
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
          onPress= {() => {navigation.navigate('ChangePassword') }}
        > 
          <Text style={styles.loginText} >Suivant</Text> 
        </TouchableOpacity>
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
    maxWidth: "500px",
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
    maxWidth: "500px",
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
})