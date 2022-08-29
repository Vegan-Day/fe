import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../color';
import AutoHeightImage from 'react-native-auto-height-image';
import ScreenCaptureView from '../screen_capture/screen_capture';

const Header = ({ capture }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <AutoHeightImage
          width={200}
          source={require('../../assets/logo.png')}
        />
      </View>
      <ScreenCaptureView capture={capture} />
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
