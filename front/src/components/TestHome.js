import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Entypo } from '@expo/vector-icons';
import colors from '../styles/colors';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import Port from "../utils/portServer"
import { useSelector } from 'react-redux';

axios.defaults.baseURL = Port.LOCALHOST_WEB

const Home = () => {
    const userData = useSelector((state) => state.user);
    
    const navigation = useNavigation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
  
    useEffect(() => {
      navigation.setOptions({
        title: "Fil d'actualité",
        headerLeft: () => (
          <FontAwesome
            name="search"
            size={24}
            color={colors.gray}
            style={{ marginLeft: 15 }}
          />
        ),
      });
    }, [navigation]);
  
    const handleChoosePhoto = async () => {
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) {
        alert("Permission to access media library is required!");
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setImage(result.uri)
      }
    };
  
    const handlePost = async () => {
      if (image === null) {
        alert("Sélectionnez une image pour poster !");
        return;
      }
  
      try {
        const response = await axios.post('/save-photo', {
          title,
          description,
          image,
          userName: userData.name,
          createdAt: new Date(),
          
        });
        console.log("Document écrit avec ID: ", response.data.id);
        setTitle("");
        setDescription("");
        setImage(null);
        navigation.navigate("TestPublication");
      } catch (e) {
        console.error("Erreur ajout du document : ", e);
      }
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text>On est dans le good</Text>
          <TextInput
            placeholder="Titre"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Description"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleChoosePhoto}
          >
            <Text style={styles.buttonText}>Choisir une photo</Text>
          </TouchableOpacity>
          {image && (
    <Image source={{ uri: image }} style={styles.previewImage} />
  )}
          <Button title="Publier" onPress={handlePost} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Chat")}
          style={styles.chatButton}
        >
          <Entypo name="chat" size={24} color={colors.green} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("TestPublication")}
          style={styles.publicationButton}
        >
          <Entypo name="new-message" size={24} color={colors.green} />
        </TouchableOpacity>
      </View>
    );
  };
  
  export default Home;


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    previewImage: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
        marginBottom: 10,
    },
    chatButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    publicationButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
    },
});