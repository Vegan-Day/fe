import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import { theme } from '../color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { URL } from '@env';
import HomeCommunity from '../components/home_community/home_community';
import AutoHeightImage from 'react-native-auto-height-image';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [bests, setBests] = useState([]);
  const [loginCheck, setLoginCheck] = useState(false);
  const [name, setName] = useState('');

  const isFocused = useIsFocused();

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

  const googleLogin = async () => {
    await navigation.navigate('GoogleLogin');
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@storage_Key');
    setLoginCheck(false);
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        const obj = JSON.parse(value);
        setName(JSON.parse(obj).name);
        setLoginCheck(true);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getData();
    onBest();
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.login}>
            {loginCheck ? (
              <>
                <Text style={styles.isLogin}>
                  {name}님, {'\n'}오늘도 즐거운 비건 되세요.
                </Text>
                <TouchableOpacity onPress={logout}>
                  <MaterialIcons name='logout' size={30} color='black' />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={googleLogin}>
                <AutoHeightImage
                  style={{ borderRadius: 10 }}
                  width={360}
                  source={{ uri: `${URL}/image/login2.png` }}
                />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={onNews}>
            <Image
              style={styles.image}
              source={{
                uri: `${URL}/image/news/banner-202208.png`,
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
          <View style={styles.usingMethod}>
            <Image
              style={styles.usingMethodImage}
              source={{ uri: `${URL}/image/news/ocr.png` }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingBottom: 100,
  },
  header: {
    marginTop: 30,
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
    marginTop: 20,
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
  usingMethod: {
    marginTop: 20,
    borderColor: theme.mainColor,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  usingMethodImage: {
    width: 360,
    height: 500,
    borderRadius: 10,
  },
  login: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  isLogin: {
    fontSize: 20,
  },
  logout: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 20,
  },
});

export default HomeScreen;
