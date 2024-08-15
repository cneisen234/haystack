import React from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet } from 'react-native';
import localPlaceholderData from '../../localPlaceholderData';

const PartOne = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.id}</Text>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={localPlaceholderData}
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
    padding: 10,
  },
});

export default PartOne;