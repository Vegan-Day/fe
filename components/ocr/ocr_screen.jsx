import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
// import OcrLoading from "./OcrLoading";
import * as ImagePicker from 'expo-image-picker';
import {
  onPress,
  style,
} from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';

let img = null;
function OcrScreen(navigation) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [loading, setLoading] = useState(false);
  const onLoding = () => {
    navigation.navigate('OcrLoading');
  };

  //카메라 사용 허용 요청
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
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
      console.log(data.uri);
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

    const filename = localUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename ?? '');
    const type = match ? `image / ${match[1]}` : `image`;
    formData.append('file', { uri: localUri, name: filename, type });
    try {
      setLoading(true);
      const response = await axios.post(
        'http://101.101.219.80:8080/ocr',
        formData,
        {
          headers: { 'content-type': 'multipart/form-data' },
          transformRequest: (formData) => formData,
        }
      );

      let info = '';

      JSON.parse(response.data.data).images[0].fields.map((item) => {
        info += item.inferText;
      });
      info = info.split(/,|\(|\)|\{|\}|\[|\]|\/|0|1|2|3|4|5|6|7|8|9|\%| /);
      console.log('인포', info);
      axios
        .post(`http://101.101.219.80:8080/classify`, info)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      //info가 null일 경우, setLoding(false), 값이 있을 경우 setLoding(true)
      setLoading(false);
    } catch (error) {
      console.log('오류났음', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => setCamera(ref)}
          ratio='1:2'
        ></Camera>
      </View>
      <Button title='📸' onPress={() => takePicture()} />
      <Button title='🖼️' onPress={() => pickImage()} />
      <Button
        title='Filp Image'
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      />
      {loading ? <Text>로딩중</Text> : null}

      <Image style={{ flex: 1 }} source={{ uri: img }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  camera: {
    flex: 1,
  },
  button: {
    flex: 0.1,
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

export default OcrScreen;
