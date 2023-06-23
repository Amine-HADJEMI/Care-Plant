import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";
// import io from 'socket.io-client';
import Icon from "react-native-vector-icons/FontAwesome";
import Port from "../utils/portServer";
import { useSelector } from "react-redux";
import styles from "../styles/chatStyle";

axios.defaults.baseURL = Port.LOCALHOST_WEB;

// const socket = io(Port.LOCALHOST_WEB);

export default function ChatScreen() {
  const userData = useSelector((state) => state.user);

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef();

  useEffect(() => {
    axios
      .get(`/messages`)
      .then((response) => {
        setMessages(response.data);
        scrollToBottom();
      })
      .catch((error) => {
        console.error(error);
      });

    // socket.on('new message', (message) => {
    //   setMessages((prevMessages) => [...prevMessages, message]);
    //   scrollToBottom();
    // });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSend = () => {
    if (inputText) {
      const message = {
        text: inputText,
        user: userData.firstName,
      };
      axios
        .post(`/add-message`, message)
        .then((response) => {
          setMessages((prevMessages) => [...prevMessages, message]);
          setInputText("");
          scrollToBottom();
        })
        .catch((error) => {
          console.error(error);
        });

      // socket.emit('new message', message);
    }
  };

  const renderItem = ({ item }) => {
    const createdAt = new Date(item.createdAt).toLocaleDateString("fr-FR", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    return (
      <View style={styles.messageContainer}>
        <Text style={styles.firstName}>
          <Icon name="circle" size={15} color="#0084ff" /> {userData.firstName}
        </Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const scrollToBottom = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };

  return (
    <View style={{ flex: 1, height: "100%", flexDirection: "column" }}>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.chatContainer}>
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              inverted={false}
            />
          </View>
        </SafeAreaView>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ecrivez votre message ici..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
