import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../color';

const Header = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>비건데이</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  text: {
    fontSize: 40,
    fontWeight: '500',
    color: theme.mainColor,
    paddingHorizontal: 20,
  },
});

export default Header;
