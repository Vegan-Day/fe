import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { URL } from '@env';

const VeganNewsScreen = (props) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={styles.image}
          source={{ uri: `${URL}/image/news/202208.png` }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  image: {
    width: 400,
    height: 1200,
  },
});

export default VeganNewsScreen;
