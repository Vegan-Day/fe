import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../color';
import * as Linking from 'expo-linking';

const MallProduct = ({ product }) => {
  const { title, image, link, lprice, mallName } = product;

  const titleReplace = title.split('<b>').join('');
  const titleMain = titleReplace.split('</b>').join('');

  const price = lprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const naverLink = () => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={naverLink}>
        <View style={styles.content}>
          <View style={styles.left}>
            <Image
              style={styles.image}
              source={{
                uri: `${image}`,
              }}
            />
          </View>
          <View style={styles.right}>
            <Text style={styles.title}>{titleMain}</Text>
            <Text style={styles.mallName}>{mallName}</Text>
            <Text style={styles.price}>{price}원</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    paddingVertical: 10,
  },
  content: {
    maxWidth: '70%',
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
  },
  right: {
    justifyContent: 'space-between',
  },
  left: {
    marginRight: 15,
  },
  mallName: {
    color: 'grey',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.mainColor,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
});

export default MallProduct;
