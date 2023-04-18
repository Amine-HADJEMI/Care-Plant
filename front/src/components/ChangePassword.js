import React, { useState } from 'react'
import {
  View, 
  TouchableOpacity,
  TextInput,
  Text
} from 'react-native'
import Status from '../utils/status'
import axios from 'axios'
import Port from '../utils/portServer'
import StyleApp from '../styles/styleApp'
import styles from '../styles/changePasswordStyle';
import { useSelector } from 'react-redux';

axios.defaults.baseURL = Port.LOCALHOST_WEB

const ChangePassword = ({ navigation }) => {
  const emailUser = useSelector((state) => state.forgetPassword.emailUser);

  const [confirmCode, setConfirmCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const changePassword = () => {
    const data = {
      email: emailUser,
      confirmCode,
      newPassword,
      confirmPassword
    };

    axios.post('/change-password', data)
      .then(response => {
        if (response.data.status === Status.UPDATE_PASSWORD_SUCCESSFULLY) {
          navigation.navigate('Home')
          return 
        } else {
          setErrorMessage(response.data.message)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={StyleApp.input}
        placeholder='Code récu par E-mail'
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => setConfirmCode(val)}
      />
      <TextInput
        style={StyleApp.input}
        placeholder='Nouveau Mot de Passe'
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => setNewPassword(val)}
      />
      <TextInput
        style={StyleApp.input}
        placeholder='Confirmation du noveau mot de passe'
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => setConfirmPassword(val)}
      />
      <TouchableOpacity style={styles.signUpBtn} 
        onPress={changePassword}
      > 
        <Text style={styles.loginText}>Confirm</Text> 
      </TouchableOpacity>
      
      {errorMessage && <Text style={styles.errorStyle}>{errorMessage}</Text>} 
    </View>
  )
}

export default ChangePassword;
