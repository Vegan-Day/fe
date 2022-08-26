import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '../../color';
import AutoHeightImage from 'react-native-auto-height-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ScreenCaptureView from '../screen_capture/screen_capture';

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <AutoHeightImage
          width={200}
          source={require('../../assets/logo.png')}
        />
      </View>
      <ScreenCaptureView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 40,
    fontWeight: '500',
    color: theme.mainColor,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  transmit: {
    fontSize: 20,
  },
});

export default Header;
