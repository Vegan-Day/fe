import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { theme } from '../../color';
import Ionicons from '@expo/vector-icons/Ionicons';
import AutoHeightImage from 'react-native-auto-height-image';

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <AutoHeightImage
          width={200}
          source={require('../../assets/logo.png')}
        />
      </View>
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
});

export default Header;
