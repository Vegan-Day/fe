import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { theme } from '../color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios, { Axios } from 'axios';
import { URL } from '@env';
import HomeCommunity from '../components/home_community/home_community';

const HomeScreen = ({ navigation }) => {
  const [bests, setBests] = useState([]);

  const onBest = async () => {
    try {
      const response = await axios.get(`${URL}/best`);
      const data = response.data.data;
      setBests(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onNews = () => {
    navigation.navigate('VeganNewsScreen');
  };

  useEffect(() => {
    onBest();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onNews}>
          <Image
            style={styles.image}
            source={{
              uri: 'http://101.101.219.80:8080/image/news/banner-202208.png',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        {bests.length === 0 ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color='black' size='large' />
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.contentHead}>
              <Text style={styles.trend}>인기글</Text>
              <TouchableOpacity
                style={styles.community}
                onPress={() => {
                  navigation.navigate('CommunityScreen');
                }}
              >
                <Text style={styles.communityText}>더보기</Text>
                <MaterialCommunityIcons
                  name='chevron-right'
                  size={24}
                  color={theme.mainColor}
                />
              </TouchableOpacity>
            </View>
            {bests.map((best) => (
              <HomeCommunity
                key={best.bid}
                best={best}
                navigation={() => {
                  navigation.navigate('CommunityDetail', { bid: best.bid });
                }}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 25,
  },
  header: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  button: {
    backgroundColor: theme.mainColor,
    marginRight: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 100,
    justifyContent: 'space-between',
  },
  content: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 40,
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 10,
  },
  contentHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trend: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 10,
  },
  community: {
    flexDirection: 'row',
  },
  communityText: {
    fontSize: 18,
    color: theme.mainColor,
  },
  image: {
    width: 360,
    height: 200,
    borderRadius: 10,
  },
});

export default HomeScreen;
