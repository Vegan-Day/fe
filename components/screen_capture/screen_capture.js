import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { theme } from '../../color';
import React from 'react';

const ScreenCaptureView = ({ capture }) => {
  return (
    <View style={styles.capture}>
      <TouchableOpacity onPress={capture}>
        <Text style={styles.transmit}>화면 전송</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  capture: {
    borderColor: theme.mainColor,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default ScreenCaptureView;
