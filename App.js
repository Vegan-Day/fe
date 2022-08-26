import { NavigationContainer } from '@react-navigation/native';
import Header from './components/header/header';
import WholeStack from './stack';
import ViewShot from 'react-native-view-shot';
import { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { URL } from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  const ref = useRef();
  const [email, setEmail] = useState('');
  console.log(email);
  const onEnroll = async (uri) => {
    const formData = new FormData();

    if (uri !== '') {
      const localUri = uri;
      const filename = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename ?? '');
      const type = match ? `image/${match[1]}` : `image`;

      formData.append('file', { uri: localUri, name: filename, type });
    }
    formData.append('email', `${email}`);

    try {
      const response = await axios.post(`${URL}/email`, formData, {
        headers: { 'content-type': 'multipart/form-data' },
        transformRequest: (formData) => formData,
      });
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        const obj = JSON.parse(value);
        setEmail(JSON.parse(obj).email);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const captureUri = () => {
    ref.current.capture().then((uri) => {
      console.log(uri);
      getData();
      onEnroll(uri);
    });
  };

  return (
    <ViewShot
      style={styles.container}
      ref={ref}
      options={{ fileName: 'Your-File-Name', format: 'jpg', quality: 0.9 }}
    >
      <NavigationContainer>
        <Header capture={captureUri} />
        <WholeStack />
      </NavigationContainer>
    </ViewShot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default App;
