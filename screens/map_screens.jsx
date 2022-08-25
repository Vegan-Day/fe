import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
const MapScreen = (props) => {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'https://www.google.com/maps/d/viewer?hl=ko&ll=37.56875627635328%2C126.93398771578255&z=14&mid=1Xk83sBun2GBnN_qrAriBx2vQTrQggpr-',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
});

export default MapScreen;
