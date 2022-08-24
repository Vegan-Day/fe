import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
const MapScreen = (props) => {
  return (
    <WebView
      style={styles.container}
      source={{
        uri: 'https://www.google.com/maps/d/u/0/embed?mid=11FHUuAxYceUeDMe05WkxFIoSsgZEkmWf&ehbc=2E312F&ll=37.55536542754301%2C126.97590629363&z=13',
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;
