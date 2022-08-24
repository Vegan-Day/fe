import { StyleSheet, Text, View, Image } from "react-native";
import { theme } from "../../color";

function OcrLoading(props) {
  const path = require("./SpinnerGrin.gif");
  const img = props.img;

  return (
    <View style={styles.container}>
      <Image style={styles.infoimg} source={{ uri: img }}></Image> 
        <Text style={styles.text}>이미지를 분석중입니다</Text>
        <Image style={styles.spinner} source={path}></Image>
    </View>
  );
}
const styles = StyleSheet.create({
  infoimg :{
    flex:1,
    margin: 50,
    borderRadius:50,
    borderColor: theme.mainColor,
    borderWidth:5
  },
    container: {
      position: "absolute",
      alignSelf: "stretch",
      zIndex: 999,
      display: "absolute",
      flexDirection: "column",
      alignSelf: "center",
      justifyContent: "center",
      backgroundColor: "white",
      textAlign: "center",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    text: {
      fontSize: 20,
      alignSelf: "center",
      fontWeight: "bold",
      color: theme.mainColor
    },
    spinner: {
      alignSelf: "center",
    },
  });
  
  export default OcrLoading;
