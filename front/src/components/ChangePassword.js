import React from 'react'
import {
  View, 
  TouchableOpacity,
  TextInput,
  StyleSheet, 
  Text
} from 'react-native'
import Status from '../utils/status'
import axios from 'axios'
import Port from '../utils/portServer'
import StyleApp from '../styles/styleApp'
// import { useSelector } from 'react-redux';


axios.defaults.baseURL = Port.LOCALHOST_WEB

// const userData = useSelector((state) => console.log(state));

export default class ChangePassword extends React.Component {
  state = {
    email:'m.hadjemi@epsi.fr', 
    confirmCode: '', 
    newPassword: '', 
    confirmPassword: '',
    errorMessage: '',
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
 
  changePassword = () => {
    const data = {
      email: this.state.email,
      confirmCode : this.state.confirmCode,      
      newPassword: this.state.newPassword,
      confirmPassword: this.state.confirmPassword
    };

    console.log('ma data: ',data)
    axios.post('/change-password', data)
    .then(response => {

      if(response.data.status === Status.UPDATE_PASSWORD_SUCCESSFULLY){
        this.props.navigation.navigate('HomePage')
        return 
      }
      else{
        this.setState({ errorMessage: response.data.message })
      }
      console.log('test', this.state.errorMessage)
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={StyleApp.input}
          placeholder='Code récu par E-mail'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('confirmCode', val)}
        />
        <TextInput
          style={StyleApp.input}
          placeholder='Nouveau Mot de Passe'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('newPassword', val)}
        />
        <TextInput
          style={StyleApp.input}
          placeholder='Confirmation du noveau mot de passe'
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
        
        {this.state.errorMessage && <Text style={styles.errorStyle}>{this.state.errorMessage}</Text>} 

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
  errorStyle: {
    color: "red",
  }
})