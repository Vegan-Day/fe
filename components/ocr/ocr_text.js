import { StyleSheet, Text, View, Image } from "react-native";

function OcrText({ navigation }, route) {
  const path = require("./SpinnerGrin.gif");
  return (
    <View style={styles.container}>
      <Text style={styles.text}>이미지를 분석중입니다</Text>
      <Text style={styles.text}></Text>
      <Image style={styles.image} source={path}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: 'stretch',
    zIndex: 999,
    display: "absolute",
    flexDirection: "column",
    alignSelf:'center',
    justifyContent: "center",
    backgroundColor:"white",
    textAlign: "center",
    top: 0, bottom: 0, left: 0, right: 0
  },
  text: {
    marginBottom: 30,
    fontSize: 30,
    alignSelf:'center'
  },
  image: {
    alignSelf:'center'
  }
});

export default OcrText;