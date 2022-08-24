import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { theme } from '../color';
import MallProduct from '../components/mall_product/mall_product';
import { URL } from '@env';
import * as Linking from 'expo-linking';

const MallScreen = (props) => {
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState([]);

  const randomValue = Math.floor(Math.random() * 10 + 1);

  const onProduct = async () => {
    try {
      const response = await axios.get(
        `${URL}/mall?keyword=${keyword}&start=${randomValue}`
      );
      const data = response.data.data;
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onProduct();
  }, [keyword]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>비건 쇼핑</Text>
        <View style={styles.keywords}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setKeyword('비건음식')}
          >
            <Text style={styles.keyword}>비건음식</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setKeyword('비건화장품')}
          >
            <Text style={styles.keyword}>비건화장품</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setKeyword('비건용품')}
          >
            <Text style={styles.keyword}>비건용품</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {products.length === 0 ? (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator color='black' size='large' />
            </View>
          ) : (
            <View style={styles.main}>
              {products.map((product) => (
                <MallProduct key={product.productId} product={product} />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 15,
  },
  keyword: {
    color: 'white',
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  keywords: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: theme.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 90,
    marginRight: 20,
  },
  main: {},
  content: {
    marginTop: 15,
  },
});

export default MallScreen;
