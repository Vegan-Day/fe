import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession(); //팝업무시

 function GoogleLogin() {
  const [accesToken, setAccessToken] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [login, setLogin] = useState(false);

  //구글로 로그인하는 함수
  const [request, response, promptAsync] = Google.useAuthRequest({
    // responseType: "id_token",
    iosClientId:
      "903572796053-ulgfpn2bnmd6kee8p18kevde4g6og0q8.apps.googleusercontent.com",
    expoClientId:
      "903572796053-1h25l5pim005lmje1htgg9g6t7fluscb.apps.googleusercontent.com",
    // responseType: ResponseType.IdToken
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log(authentication);
      // setAccessToken(response.params.id_token);
      // setLogin(true);
      // console.log("토큰", accesToken);
    }
  }, [response]);

  // if (fullResult?.type === 'success') {
  //   // Token is always filled, when running on iOS/Android and when running in Expo
  //   setAccessToken(fullResult.params.id_token);
  // };

  //사용자 정보를 가져오는 함수
  // const getUserData = async () => { //어 약간 얘 실행 안되는듯
  //   let userInfoResponse = await fetch(
  //     "https://www.google.com/userinfo/v2/me",
  //     {
  //       headers: { Authorization: `Bearer ${accesToken}` },
  //     }
  //   );
  //   userInfoResponse.json().then((data) => {
  //     setUserInfo(data);
  //     console.log("유저정보",userInfo);
  //   });
  // };

  return (
    <View style={styles.container}>
      {/* {showUserInfo()} */}
      {/* 토큰이 있으면 userData를 가져오고 아니면 구글 로그인을 시킴 */}
      <TouchableOpacity
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      >
        <Text> "구글로 로그인하기"</Text>
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
});

export default GoogleLogin;