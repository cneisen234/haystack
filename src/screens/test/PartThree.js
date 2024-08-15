import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import hstkFetch from '../../hstkFetch';

const PartThree = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await hstkFetch('https://jsonplaceholder.typicode.com/posts');
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPosts();
    }, []);
  
    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('PartThreeDetail', { id: item.id })}
      >
        <MaterialIcons name="article" size={24} color="black" style={styles.leftIcon} />
        <View style={styles.textContainer}>
          <Text style={styles.idText}>{item.id}</Text>
          <Text style={styles.titleText} numberOfLines={1}>{item.title}</Text>
        </View>
        <AntDesign name="right" size={24} color="black" style={styles.rightIcon} />
      </TouchableOpacity>
    );
  
    if (loading) {
      return (
        <SafeAreaView style={styles.container}>
          <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />
        </SafeAreaView>
      );
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by title"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <FlatList
          data={filteredPosts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={() => (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResults}>No Results</Text>
            </View>
          )}
          contentContainerStyle={filteredPosts.length === 0 ? { flex: 1 } : null}
        />
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingIndicator: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
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
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResults: {
    fontSize: 16,
  },
});

export default PartThree;