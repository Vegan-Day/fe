import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

const VeganNewsScreen = (props) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={styles.image}
          source={{ uri: 'http://101.101.219.80:8080/image/news/202208.png' }}
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
