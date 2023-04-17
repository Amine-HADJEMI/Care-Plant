import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Text } from 'react-native';
import axios from 'axios';
import Port from '../utils/portServer';
import Status from '../utils/status';
import StyleApp from '../styles/styleApp';
import { useDispatch } from 'react-redux';
import { forgetPasswordUserEmail } from '../store/store';
import styles from '../styles/forgetPasswordStyle';

axios.defaults.baseURL = Port.LOCALHOST_WEB;

export default function ForgetPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const changePassword = () => {
    const data = {
      email: email,
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email)) {
      setErrorMessage("Le format de l'email est invalide");
      return;
    }

    axios
      .post('/send-confirmation-email', { email: data.email })
      .then((response) => {
        if (response.data.status === Status.UNKNOWN_USER) {
          setErrorMessage('Utilisateur non existant');
        } else if (response.data.status === Status.MAIL_SENDED_SUCCESSFULLY) {
          dispatch(forgetPasswordUserEmail({ emailUser: data.email }));
          navigation.navigate('ChangePassword');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.putEmail}>Veuillez saisir votre adresse e-mail !</Text>
      <TextInput
        style={StyleApp.input}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => setEmail(val)}
      />
      <TouchableOpacity style={styles.signUpBtn} onPress={() => changePassword()}>
        <Text style={styles.loginText}>Suivant</Text>
      </TouchableOpacity>

      <Text>{errorMessage && <Text style={styles.errorStyle}>{errorMessage}</Text>} </Text>
    </View>
  );
}
