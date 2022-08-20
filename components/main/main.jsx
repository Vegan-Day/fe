import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Header from '../header/header';
import Menubar from '../menubar/menubar';

const Main = (p) => {


  return (
    <>

      {/* <View style={styles.header}>
        <Header />
      </View> */}
      <View>
        <Menubar />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    paddingHorizontal: 30,
  },
});
export default Main;
