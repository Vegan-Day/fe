import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

function OcrScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [Image, setImage] = useState(null);

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
  const takePicture = async() => {
    if (camera) {
        const data = await camera.takePictureAsync(null);
          setImage(data.url);
      }
  };


//갤러리에서 이미지 가져오기
  const pickImage = async() => { 
    let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes : ImagePicker.MediaTypeOptions.Images,
            allowEditing : true,
            aspect : [1,1],
            quality : 1,
        });
        if (!result.cancelled) {
          setImage(result.uri)
          console.log(result.uri);
        }
  };
//이미지 업로드하기
  const uplaodImage = async() => {
    const uri = props.route.params.image
    console.log(uri);
  };

  uplaodImage();

  return (
    <View style={styles.container}>
      <Button title="Filp Image" opPress={()=>{
	setType(
    	type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    )
}} />
      <Button title="Take picture" onPress={()=> takePicture()} />
      <Button title="Picture Iamge From Gallery" onPress={()=> pickImage()} />
      <Camera style={styles.camera} type={type}
      ref={(ref)=> setCamera(ref)}
       ratio="16:9">
       
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});

export default OcrScreen;