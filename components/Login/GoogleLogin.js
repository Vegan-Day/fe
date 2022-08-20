import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession(); //팝업무시
function GoogleLogin() {
  //구글로 로그인하는 함수
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "903572796053-ulgfpn2bnmd6kee8p18kevde4g6og0q8.apps.googleusercontent.com",
    expoClientId:
      "903572796053-1h25l5pim005lmje1htgg9g6t7fluscb.apps.googleusercontent.com",
    responseType: "id_token",
  });

  const saveLoggedIn = async (toSet) => {
    await AsyncStorage.setItem("@veganDay", toSet);
  };
  if (response?.params.id_token) {
    saveLoggedIn();
    axios
      .post(
        `http://192.168.0.2/:8080/login?tokenId=${response.params.id_token}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
    console.log(response);
  }

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={!request}
        onPress={
          response
            ? null
            : () => {
                promptAsync();
              }
        }
      >
        <Image
         style
          alt="Google sign-in"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
        />
        <Text> {response ? "로그인 성공" : "구글로 로그인하기"}</Text>
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
  googleImage: {
    width:"20px",
    marginTop:"7px", 
    marginRight:"8px"
  },
});

export default GoogleLogin;
