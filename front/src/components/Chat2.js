import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
  } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
// import {
//   collection,
//   addDoc,
//   orderBy,
//   query,
//   onSnapshot
// } from 'firebase/firestore';
// import { signOut } from 'firebase/auth';
// import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../styles/colors';
import axios from 'axios';


  export default function Chat() {
    axios.defaults.baseURL = 'http://localhost:3000/'

    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();
// ---------------------------- se déco
  // const onSignOut = () => {
  //     signOut(auth).catch(error => console.log('Error logging out: ', error));
  // };

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //       headerRight: () => (
    //         <TouchableOpacity
    //           style={{
    //             marginRight: 10
    //           }}
    //           onPress={onSignOut}
    //         >
    //           <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/>
    //         </TouchableOpacity>
    //       )
    //     });
    // }, [navigation]);


    useLayoutEffect(() => {
      axios.get('/messages')
      .then(response => {
        setMessages(response.data.map(row => ({
          _id: row.id,
          createdAt: new Date(row.createdAt),
          text: row.text,
          user: row.user
        })));
      })
      .catch(error => {
        console.error(error);
      });
    }, []);

      // const collectionRef = collection(database, 'chats');
      // const q = query(collectionRef, orderBy('createdAt', 'desc'));
      // const unsubscribe = onSnapshot(q, querySnapshot => {
      // console.log('querySnapshot unsusbscribe');
      //   setMessages(
      //     querySnapshot.docs.map(doc => ({
      //       _id: doc.data()._id,
      //       createdAt: doc.data().createdAt.toDate(),
      //       text: doc.data().text,
      //       user: doc.data().user
      //     }))
      //   );
      // });
      // return unsubscribe;
    // }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages)
        );
        setMessages([...messages, ...messages]);
        const { createdAt, text, user } = messages[0];    

        axios.post('/addMessage', {
          createdAt,
          text,
          user
        })
        
        // addDoc(collection(database, 'chats'), {
        //   _id,
        //   createdAt,
        //   text,
        //   user
        // });
      }, []);

      return (
        // <>
        //   {messages.map(message => (
        //     <Text key={message._id}>{message.text}</Text>
        //   ))}
        // </>
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={false}
          showUserAvatar={false}
          onSend={messages => onSend(messages)}
          messagesContainerStyle={{
            backgroundColor: '#fff'
          }}
          textInputStyle={{
            backgroundColor: '#fff',
            borderRadius: 20,
          }}
          // user={{
          //   _id: auth?.currentUser?.email,
          //   avatar: 'https://ui-avatars.com/api/?size=300'
          // }}
        />
      );
}

