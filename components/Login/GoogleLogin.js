import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import axios from 'axios';
import { loginAtom } from '../../atoms/atom';
import AsyncStorage from '@react-native-async-storage/async-storage';

const gpath = require("./GoogleLogin.png");
const logo = require("./logo.png");

WebBrowser.maybeCompleteAuthSession(); //팝업무시

function GoogleLogin() {
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
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  if (response?.params.id_token) {
    axios
    .post(
      `http://101.101.219.80:8080/login?tokenId=${response.params.id_token}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      }      )
      .then((response) => {
        getData();
        storeData(response.data.data);
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
        const value = await AsyncStorage.getItem('@storage_Key')
        if(value !== null) {
          // value previously stored
          console.log("스토리지",value);
  
        }
  
      } catch(e) {
        // error reading value
      }
    }
  
  
  
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <TouchableOpacity
          disabled={!request}
          onPress={() => {
            try { 
              promptAsync()
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
      <TouchableOpacity>
        <Text style={styles.looking}
         onPress={() => {}}

        >둘러보기</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 50,
    marginBottom: 100,
  },
  googleButton: {
    width: 250,
    height: 60,
    margin: 6,
    borderRadius: 10,
    backgroundColor: "#EAEEEE",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  googleImage: {
    width: 50,
    height: 50,
    marginLeft: 20,
  },
  googleText: {
    fontSize: 20,
    marginRight: 20,
    fontWeight: "bold",
  },
  looking: {
    marginTop: 20,
  },
});

export default GoogleLogin;