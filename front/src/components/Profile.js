import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const Profile = () => {

    const userData = useSelector((state) => state.user);

    const [username, setUsername] = useState(userData.name);
    const [password, setPassword] = useState(userData.password);
  
    const handleUsernameChange = (text) => {
      setUsername(text);
    };
  
    const handlePasswordChange = (text) => {
      setPassword(text);
    };
  
    const changePassword = () => {
        if (password) {
          const pwd = {
            text: inputText
          };
          axios.post(`/XXXXXX`, pwd)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      };

    return (
      <View>
        <Text>Identifiant :</Text>
        <TextInput
          style={styles.TextInput}
         placeholder="Mot de passe top secret"
          placeholderTextColor="#003f5c"
          value={username}
          onChangeText={handleUsernameChange}
        />
        <Text>Mot de passe :</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Mot de passe top secret"
          placeholderTextColor="#003f5c"
          value={password}
          onChangeText={handlePasswordChange}
        />
        <Button title="Enregistrer les modifications" onPress={changePassword} />
      </View>
    );
  };
  const styles = StyleSheet.create({
    TextInput: {
      borderRadius: 30,
      height: 50,
      flex: 1,
      padding: 5,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      width: "100%",
    }
   
  });
  
  export default Profile;