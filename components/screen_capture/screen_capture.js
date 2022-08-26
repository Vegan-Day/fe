import { useEffect } from 'react';
import {
  Button,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import * as ScreenCapture from 'expo-screen-capture';
import * as MediaLibrary from 'expo-media-library';
import { theme } from '../../color';
import { captureRef } from 'react-native-view-shot';
import React from 'react';
import ViewShot from 'react-native-view-shot';

const ScreenCaptureView = ({ capture }) => {
  const deActivate = async () => await ScreenCapture.allowScreenCaptureAsync();

  useEffect(() => {
    async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        ScreenCapture.addScreenshotListener(() => {
          console.log('Thanks for screenshotting my beautiful app 😊');
        });
      }
    };
  });
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
