import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton, MD3Colors } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Port from '../utils/portServer'

axios.defaults.baseURL = Port.LOCALHOST_WEB


export default function Home({navigation}) {

  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      setSelectedImage({ uri: result.uri });
      setSelectedImage({ uri: result.uri });
      
      //send good format of photo to the back!!
      axios.post('/savePhoto', photo)
      .then(response => {
        console.log(response.data)
        //if(response.status === 10 ){
            
        // }
      })
      .catch(error => {
        console.log(error)
      })

      // fetch('http://localhost:3000/savePhoto', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     uri: result.uri,
      //   }),
      // });
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage && <Image source={{ uri: selectedImage.uri }} style={styles.image} />}
      {!selectedImage && (
        <>
          <Image source={require('../assets/arosa-je.png')} style={styles.logo} />
          <Text style={styles.welcome}>CarePlant</Text>
          <TouchableOpacity style={styles.button} onPress={selectImage}>
            <Text style={styles.buttonText}>Selectionner une image</Text>
          </TouchableOpacity>
          <IconButton
            icon="camera"
            iconColor={MD3Colors.neutral0}
            containerColor="#EEEEEE"
            size={100}
            onPress={() => navigation.navigate('CameraApp')}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    fontWeight:'bold',
  },
  button: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#66D163",
    maxWidth: 500,
    marginBottom: "10%"
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

