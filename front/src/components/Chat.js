import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import io from 'socket.io-client';
import Icon from 'react-native-vector-icons/FontAwesome';
import Port from '../utils/portServer';
import { useSelector } from 'react-redux';

axios.defaults.baseURL = Port.LOCALHOST_WEB;

const socket = io(Port.LOCALHOST_WEB);

export default function ChatScreen() {
  const userData = useSelector((state) => state.user);

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef();

  useEffect(() => {
    axios.get(`/messages`)
      .then((response) => {
        setMessages(response.data);
        scrollToBottom();
      })
      .catch((error) => {
        console.error(error);
      });

    socket.on('new message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    return () => {
      socket.disconnect();
    };
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
        user: userData.name,
        createdAt: new Date().toISOString(),
      };
      axios.post(`/add-message`, message)
        .then((response) => {
          console.log(response.data);
          setMessages((prevMessages) => [...prevMessages, message]);
          setInputText('');
          scrollToBottom();
        })
        .catch((error) => {
          console.error(error);
        });

      socket.emit('new message', message);
    }
  };

  const renderItem = ({ item }) => {
    const createdAt = new Date(item.createdAt).toLocaleDateString('fr-FR', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
  
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.username}>
          <Icon name="circle" size={15} color="#0084ff" /> {item.user}
        </Text>
        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.createdAt}>{createdAt}</Text>
      </View>
    );
  };
  

  const scrollToBottom = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };

  return (
    <View style={{ flex: 1, height: '100%', flexDirection: 'column' }}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  messageContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 10,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#0084ff',
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000',
  },
  createdAt: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#999',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
    fontSize: 16,
    color: '#000',
  },
  sendButton: {
    backgroundColor: '#0084ff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
