import { NavigationContainer } from '@react-navigation/native';
import Header from './components/header/header';
import WholeStack from './stack';
import GoogleLogin from './components/Login/GoogleLogin';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";

let logincheck = false;

function App() {
  useEffect(() => {
    getData();
  }, [logincheck]);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        logincheck = true;
      }
    } catch (e) {
      // error reading value
    }
  };
  return (
    <>
      {logincheck ? (
        <GoogleLogin />
      ) : (
        <NavigationContainer>
          <Header />
          <WholeStack />
        </NavigationContainer>
      )}
    </>
  );
}

export default App;