import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { Card, Divider } from 'react-native-elements';
import colors from '../styles/colors';
import axios from 'axios';
import Port from "../utils/portServer"
import Icon from 'react-native-vector-icons/FontAwesome';

axios.defaults.baseURL = Port.LOCALHOST_WEB;

const TestPublication = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [carePlant, setCarePlant] = useState(true);
  const [confirmCare, setconfirmCare] = useState(false);
  const [takenCarePosts, setTakenCarePosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  // const [carePlant, setCarePlant] = useState(false);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/posts');
        const data = response.data.map((post) => ({
          id: post.id,
          title: post.title,
          description: post.description,
          image: post.image,
          userName: post.userName,
          createdAt: new Date(post.createdAt),
          carePlant: post.carePlant,
        }));
        setPosts(data);
        // console.log('tesssssst',data.carePlant)
        // setCarePlant(data.carePlant)
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  const updateDataPage = (postId) => {
    setSelectedPost(postId);
    setDialogVisible(false);
    setconfirmCare(true);
  };

  const confirmationCare = async (item) => {
      setTakenCarePosts([...takenCarePosts, item]);
      setconfirmCare(false);
      
      try {
        const response = await axios.put('/care-plant-post', {id: item.id});
        console.log('response',response)
        // const data = response.data.map((post) => ({
        //   id: post.id,
        //   title: post.title,
        //   description: post.description,
        //   image: post.image,
        //   userName: post.userName,
        //   createdAt: new Date(post.createdAt),
        //   carePlant: false,
        // }));
        // setPosts(data);
        // // console.log('tesssssst',data.carePlant)
        // // setCarePlant(data.carePlant)
      } catch (error) {
        console.error(error);
      }
  };

  const afficheItem = (item) => {
    console.log('itemssss',item.carePlant)
  }

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.card}>
      <View style={styles.userContainer}>
        <Icon name="user" size={20} color="#333" />
        <Text style={styles.titleUser}>{item.userName}</Text>
      </View>

      {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      <Text style={styles.title}>{item.title}</Text>
      <Divider style={styles.divider} />
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.footer}>
        <Text style={styles.timestamp}>{item.createdAt.toLocaleString()}</Text>

        {!item.carePlant && !(selectedPost === item.id && confirmCare)  && (
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            padding: 10,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => updateDataPage(item.id)}
        >
          <FontAwesome name="heart" size={24} color="white" />
          <Text style={{ color: 'white' }}> J'en prends soin</Text>
        </TouchableOpacity>
      )}

        {selectedPost === item.id && confirmCare && (
          <>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'green',
                  padding: 10,
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}
                onPress={() => {
                  confirmationCare(item)
                  // setTakenCarePosts([...takenCarePosts, item]);
                  // setconfirmCare(false);
                  
                }}
              >
                <FontAwesome name="check" size={24} color="white" />
                <Text style={{ color: 'white' }}> Oui Je confime</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'red',
                  padding: 10,
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setconfirmCare(false)}
              >
                <FontAwesome name="times" size={24} color="white" />
                <Text style={{ color: 'white' }}> Non</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {item.carePlant && (
        <TouchableOpacity
          disabled={true}  
          style={{
            backgroundColor: 'gray',
            padding: 10,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => updateDataPage(item.id)}
        >
          <FontAwesome name="ban" size={24} color="white" />
          <Text style={{ color: 'white' }}> La plante est déjà prise</Text>
        </TouchableOpacity>
      )}

      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default TestPublication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    resizeMode: 'contain',
  },

    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
      marginHorizontal: 20,
    },
    description: {
      fontSize: 16,
      marginHorizontal: 20,
      marginBottom: 10,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 20,
      marginVertical: 10,
    },
    timestamp: {
      fontSize: 12,
      color: '#A9A9A9',
    },
    divider: {
      height: 1,
      backgroundColor: '#DCDCDC',
      marginHorizontal: 20,
      marginVertical: 10,
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconText: {
      fontSize: 16,
      marginLeft: 5,
      color: '#A9A9A9',
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleUser: {
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
  });
