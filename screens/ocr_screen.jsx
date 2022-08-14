import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const OcrScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>ocr</Text>
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

export default OcrScreen;
