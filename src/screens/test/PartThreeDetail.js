import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import hstkFetch from '../../hstkFetch';

const PartThreeDetail = ({ route }) => {
  const { id } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [hiddenComments, setHiddenComments] = useState(new Set());
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

  const hideComment = (commentId) => {
    setHiddenComments(prevHidden => new Set(prevHidden).add(commentId));
  };

  const renderCommentItem = ({ item }) => {
    if (hiddenComments.has(item.id)) {
      return null;
    }
    return (
      <View style={styles.commentItem}>
        <View style={styles.commentContent}>
          <Text style={styles.commentEmail}>{item.email}</Text>
          <Text style={styles.commentBody}>{item.body}</Text>
        </View>
        <TouchableOpacity
          style={styles.hideButton}
          onPress={() => hideComment(item.id)}
        >
          <Text style={styles.hideButtonText}>Hide</Text>
        </TouchableOpacity>
      </View>
    );
  };

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  commentContent: {
    flex: 1,
  },
  commentEmail: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentBody: {
    fontSize: 14,
  },
  hideButton: {
    backgroundColor: '#ff6b6b',
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  hideButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PartThreeDetail;