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

export default class ChangePassword extends React.Component {
  state = {
    confimCode: '', newPassword: '', confirmPassword: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
 
  changePassword = () => {
    const data = {
      confimCode : this.state.confimCode,      
      newPassword: this.state.newPassword,
      confirmPassword: this.state.confirmPassword
    };

    console.log('ma data: ',data)
    // axios.post('/changePassword', data)
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
        <TextInput
          style={styles.input}
          placeholder='Code récu par E-mail'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('confimCode', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Nouveau Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('newPassword', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Confirm New Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('confirmPassword', val)}
        />
        <TouchableOpacity style={styles.signUpBtn} 
          onPress= {() => this.changePassword()}
        > 
          <Text style={styles.loginText} >Confirm</Text> 
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
  }
})