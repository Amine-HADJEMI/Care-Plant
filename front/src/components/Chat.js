import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Port from '../utils/portServer'
import { useSelector } from 'react-redux';

axios.defaults.baseURL = Port.LOCALHOST_WEB

export default function ChatScreen() {
const userData = useSelector((state) => state.user);
  
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    axios.get(`/messages`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  

  const handleSend = () => {
    if (inputText) {
      const message = {
        text: inputText,
        user: userData.name,
        createdAt: new Date().toISOString(),
      };
      axios.post(`/add-message`, message)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    
      setInputText('');
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.messageContainer}>
      <Text style={styles.username}>
        <Icon name="circle" size={15} color="#000" /> {item.user}
      </Text>
        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.createdAt}>{item.createdAt}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        inverted={true}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message here..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  messageContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  createdAt: {
    color: '#BBBBBB',
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bullet: {
    marginRight: 5,
  },
  // message: {
  //   borderWidth: 2, 
  //   borderColor: 'red' 
  // }
});
