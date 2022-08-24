import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import {
  onPress,
  style,
} from "deprecated-react-native-prop-types/DeprecatedTextPropTypes";
import axios from "axios";
import OcrLoading from "./OcrLoading";
import { theme } from "../../color";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

let img = null;
let foodinfo = "";
let notvegan = "";

function OcrScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [loading, setLoading] = useState(false);

  //카메라 사용 허용 요청
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  //카메라 허용 안될 때
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  //사진촬영 함수
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      img = data.uri;

      onEnroll();
    }
  };
  //갤러리에서 이미지 가져오기
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      img = result.uri;
      onEnroll();
    }
  };
  const onEnroll = async () => {
    const formData = new FormData();
    const localUri = img;
    const filename = localUri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename ?? "");
    const type = match ? `image / ${match[1]}` : `image`;
    formData.append("file", { uri: localUri, name: filename, type });
    try {
      setLoading(true);
      const response = await axios.post(
        "http://101.101.219.80:8080/ocr",
        formData,
        {
          headers: { "content-type": "multipart/form-data" },
          transformRequest: (formData) => formData,
        }
      );
      let info = "";
      JSON.parse(response.data.data).images[0].fields.map((item) => {
        info += item.inferText;
      });
      info = info.split(/,|\(|\)|\{|\}|\[|\]|\/|0|1|2|3|4|5|6|7|8|9|\%| /);
      foodinfo = info;
      axios
        .post(`http://101.101.219.80:8080/classify`, info)
        .then((response) => {
          notvegan = response.data.data;
          message();
        })
        .catch((error) => {
          console.log(error);
        });
      //info가 null일 경우, setLoding(false), 값이 있을 경우 setLoding(true)
      setLoading(false);
    } catch (error) {
      console.log("오류", error);
    }
  };

  const message = () => {
    notvegan
      ? Alert.alert("알림", `${notvegan} 등 동물성 성분이 포함되어있습니다.`, [
          { text: "확인" },
        ])
      : Alert.alert("알림", `비건식품입니다.`, [{ text: "확인" }]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      
      {loading ? (
        <>
          <OcrLoading img={img}/>
        </>
      ) : null}
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => setCamera(ref)}
          ratio="1:2"
        ></Camera>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => takePicture()}>
          <AntDesign name="camera" size={40} color={theme.mainColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage()}>
          <FontAwesome name="photo" size={40} color={theme.mainColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 3.8,
    flexDirection: "row",
    backgroundColor: "white",
  },
  camera: {
    flex: 1,
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
  },
  buttonContainer: {
    flex: 0.7,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  scrollimage: {
    flex: 5,
  },
});
export default OcrScreen;
