import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, Text } from 'react-native'
import PropTypes from 'prop-types';
import axios from 'axios'
import Status from '../utils/status'
import Port from '../utils/portServer'
import StyleApp from '../styles/styleApp'
import styles from '../styles/settingsStyle';
import { useSelector } from 'react-redux';
axios.defaults.baseURL = Port.LOCALHOST_WEB

export default function Settings({ navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState('')

  const userData = useSelector((state) => state.user);

  const updateUser = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,20}$/;

    if (!passwordRegex.test(password)) {
      setError(
        `
        Le mot de passe doit respecter les conditions suivantes :\n
          - Avoir une longueur comprise entre 8 et 20 caractères alphanumériques (sans accents).\n 
          - Contenir au moins 1 lettre MAJUSCULE.\n
          - Contenir au moins 1 lettre minuscule.\n
          - Contenir au moins 1 chiffre.\n
          - Contenir au moins 1 caractère spécial de la liste suivante : *S@&000=#.!?+/£€%\n
        `);
      return;
    }

    Settings.propTypes = {
      navigation: PropTypes.object.isRequired
    };

    if (confirmPassword === password) {
      axios.put("/updateUser", { data: { userName: userData.userName, name: name, password: password } })
        .then(response => {
          if (response.data.status === Status.UPDATE_USER) {
            navigation.navigate('Home')
          }
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      setError('Mot de passe non compatible')
    }
  }

  const deleteUser = () => {
    axios.delete("/deleteUser", { data: { userName: userData.userName } })
      .then(response => {
        if (response.data.status === Status.DELETE_USER) {
          navigation.navigate('Login')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container} >
      <View style={styles.containerSignUP}>
        <TextInput
          style={StyleApp.input}
          placeholder='Nom & Prénom'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => setName(val)}
        />
        <TextInput
          style={StyleApp.input}
          placeholder='Mot de passe'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => setPassword(val)}
        />
        <TextInput
          style={StyleApp.input}
          placeholder='Confirmer Mot de passe'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => setConfirmPassword(val)}
        />

        <TouchableOpacity
          style={styles.signUpBtn}
          onPress={() => updateUser()}
        >
          <Text style={styles.loginText}>Confirmer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => deleteUser()}
        >
          <Text style={styles.loginText}>Supprimer Compte</Text>
        </TouchableOpacity>

        {error && <Text style={styles.errorStyle}>{error}</Text>}
      </View>
    </View>
  )
}
