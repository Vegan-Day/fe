import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomeCommunity = ({ best }) => {
  const { title } = best;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
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
