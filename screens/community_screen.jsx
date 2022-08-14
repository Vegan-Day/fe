import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const ComunityScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>Community</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ComunityScreen;
