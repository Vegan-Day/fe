import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
const MapScreen = (props) => {
  return (
    <WebView
      style={styles.container}
      source={{
        uri: 'https://www.google.com/maps/d/viewer?hl=ko&ll=37.56875627635328%2C126.93398771578255&z=14&mid=1Xk83sBun2GBnN_qrAriBx2vQTrQggpr-',
        
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 40,
  },
});

export default MapScreen;
