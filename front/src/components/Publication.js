import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Card, Divider } from 'react-native-elements';
import axios from 'axios';
import Port from "../utils/portServer"
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/publicationStyle';

axios.defaults.baseURL = Port.LOCALHOST_WEB;

const Publication = () => {
  const [posts, setPosts] = useState([]);
  const [confirmCare, setconfirmCare] = useState(false);
  const [takenCarePosts, setTakenCarePosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPosts, setSelectedPosts] = useState([]);

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
  
        const takenCarePosts = data.filter(post => post.carePlant);
        setTakenCarePosts(takenCarePosts);
  
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  const updateDataPage = (postId) => {
    setSelectedPost(postId);
    setSelectedPosts([...selectedPosts, postId]);
    setconfirmCare(true);
  };

  const confirmationCare = async (item) => {
      setTakenCarePosts([...takenCarePosts, item]);
      setconfirmCare(false);
      
      try {
        await axios.put('/care-plant-post', {id: item.id});
      } catch (error) {
        console.error(error);
      }
  };

  const renderItem = ({ item }) => {
    const isTakenCare = takenCarePosts.some((post) => post.id === item.id);
  
    return (
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
  
          {!item.carePlant && !isTakenCare && !confirmCare ? (
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
          ) : null}
  
          {!item.carePlant && selectedPost === item.id && confirmCare ? (
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
                onPress={() => confirmationCare(item)}
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
          ) : null}
  
          {isTakenCare ? (
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
            >
              <FontAwesome name="ban" size={24} color="white" />
              <Text style={{ color: 'white' }}> La plante est déjà prise</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </Card>
    );
  };
  

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

export default Publication;


