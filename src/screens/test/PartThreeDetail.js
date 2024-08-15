import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import hstkFetch from '../../hstkFetch';

const PartThreeDetail = ({ route }) => {
  const { id } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const [postResponse, commentsResponse] = await Promise.all([
          hstkFetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
          hstkFetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        ]);
        const postData = await postResponse.json();
        const commentsData = await commentsResponse.json();
        setPost(postData);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching post and comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const renderCommentItem = ({ item }) => (
    <View style={styles.commentItem}>
      <Text style={styles.commentEmail}>{item.email}</Text>
      <Text style={styles.commentBody}>{item.body}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Error: Post not found</Text>
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={styles.postContainer}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body}>{post.body}</Text>
          <Text style={styles.commentsHeader}>Comments:</Text>
        </View>
      )}
      data={comments}
      renderItem={renderCommentItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  postContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    marginBottom: 16,
  },
  commentsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  commentItem: {
    marginBottom: 16,
  },
  commentEmail: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentBody: {
    fontSize: 14,
  },
});

export default PartThreeDetail;