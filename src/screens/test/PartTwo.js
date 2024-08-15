import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import hstkFetch from '../../hstkFetch';

const PartTwo = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await hstkFetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <MaterialIcons name="article" size={24} color="black" style={styles.leftIcon} />
      <View style={styles.textContainer}>
        <Text style={styles.idText}>{item.id}</Text>
        <Text style={styles.titleText} numberOfLines={1}>{item.title}</Text>
      </View>
      <AntDesign name="right" size={24} color="black" style={styles.rightIcon} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  leftIcon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    maxWidth: '50%',
  },
  idText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 12,
  },
  rightIcon: {
    marginLeft: 'auto',
  },
});

export default PartTwo;