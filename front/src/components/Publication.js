import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from '../styles/colors';
// import { FontAwesome } from '@expo/vector-icons';
// import { collection, getDocs, orderBy, query } from "firebase/firestore";
// import { database } from "../config/firebase";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000/'


const Publication = () => {

    const navigation = useNavigation();
    const [posts, setPosts] = useState([]);

    // useEffect(() => {
        
    //     const fetchPosts = async () => {
    //         const q = query(collection(database, "posts"), orderBy("createdAt", "desc"));
    //         const querySnapshot = await getDocs(q);
    //         const data = [];
    //         querySnapshot.forEach((doc) => {
    //             data.push({
    //                 id: doc.id,
    //                 title: doc.data().title,
    //                 description: doc.data().description,
    //                 image: doc.data().image,
    //                 createdAt: doc.data().createdAt.toDate(),
    //             });
    //         });
    //         setPosts(data);
    //     };
    //     fetchPosts();
    // }, []);

    // useEffect(() => {
        
    //     const fetchPosts = async () => {
    //         try {
    //             const response = await axios.get('/posts');
    //             const data = response.data;
    //             setPosts(data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     fetchPosts();
    // }, []);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          {item.image && <Image source={{ uri: item.image }} style={styles.image} />} 
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.timestamp}>{item.createdAt.toLocaleString()}</Text>
        </View>
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

export default Publication;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 20,
    },
    item: {
        marginBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    timestamp: {
        color: colors.gray,
        fontSize: 12,
    },
});