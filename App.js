import { NavigationContainer } from "@react-navigation/native";
import Header from "./components/header/header";
import WholeStack from "./stack";
import GoogleLogin from "./components/Login/GoogleLogin";
import {  useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function App() {
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getLoggin = async () => {
    const logginData = await AsyncStorage.getItem(
      "@veganDay",
      JSON.stringify(logginData)
    );
    setIsLoggedIn(true);
  };
  getLoggin();

  return (
   <>
    {isLoggedIn ? (
    <NavigationContainer>
      <Header />
      <WholeStack />
    </NavigationContainer>
    ) : 
    (
      <GoogleLogin/>)
    }</>
   
  );
}

export default App;
