import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const HomeCommunity = ({ best, navigation }) => {
  const { title } = best;

  const onCommunityGo = () => {
    navigation();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onCommunityGo}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  text: {
    fontSize: 18,
  },
});

export default HomeCommunity;
