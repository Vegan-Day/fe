import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '@env';
const gpath = require('./GoogleLogin.png');

WebBrowser.maybeCompleteAuthSession(); //팝업무시

function GoogleLogin({ navigation }) {
  //구글로 로그인하는 함수
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      '903572796053-ulgfpn2bnmd6kee8p18kevde4g6og0q8.apps.googleusercontent.com',
    expoClientId:
      '903572796053-1h25l5pim005lmje1htgg9g6t7fluscb.apps.googleusercontent.com',
    responseType: 'id_token',
  });

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  if (response?.params.id_token) {
    axios
      .post(`${URL}/login?tokenId=${response.params.id_token}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
      .then((response) => {
        storeData(response.data.data);
        getData();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
    }
  }, [response]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      console.log(value);
      if (value !== null) {
        // value previously stored
        navigation.goBack();
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image style={styles.logo} source={logo} /> */}
      <View style={styles.textView}>
        <Text style={styles.text}>로그인하고,</Text>
        <Text style={styles.text}>다양한 비건 정보 받아보세요</Text>
      </View>
      <TouchableOpacity
        disabled={!request}
        onPress={() => {
          try {
            promptAsync();
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <View>
          <View style={styles.googleButton}>
            <Image style={styles.googleImage} source={gpath} />
            <Text style={styles.googleText}>구글로 로그인하기</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 250,
  },

  logo: {
    width: 300,
    height: 50,
  },
  googleButton: {
    width: 250,
    height: 60,
    margin: 6,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  googleImage: {
    width: 40,
    height: 40,
    marginLeft: 20,
  },
  googleText: {
    fontSize: 20,
    marginRight: 20,
    fontWeight: 'bold',
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
  },
});

export default GoogleLogin;
