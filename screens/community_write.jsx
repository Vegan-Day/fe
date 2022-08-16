import React, { useState } from 'react';
import { Alert, Button } from 'react-native';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { onChange } from 'react-native-reanimated';
import { theme } from '../color';
import axios from 'axios';
import { URL } from '@env';

const CommunityWrite = ({ navigation }) => {
  const [inputs, setInputs] = useState([]);

  const onChange = (key, e) => {
    setInputs({
      ...inputs,
      [key]: e,
    });
  };

  const onEnroll = () => {
    axios
      .post(`${URL}/community`, {
        title: inputs['title'],
        cn: inputs['content'],
        userId: 'test',
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setInputs('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>제목</Text>
        <TextInput
          name='title'
          style={styles.input}
          maxLength={20}
          onChangeText={(e) => onChange('title', e)}
        ></TextInput>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>내용</Text>
        <TextInput
          name='content'
          style={styles.input}
          multiline={true}
          maxLength={100}
          numberOfLines={6}
          textAlignVertical='top'
          onChangeText={(e) => onChange('content', e)}
        />
      </View>
      <Button title='등록' color={theme.mainColor} onPress={onEnroll} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    fontSize: 18,
    borderColor: 'grey',
    borderWidth: 0.5,
  },
  title: {
    marginTop: 30,
  },
  text: {
    fontSize: 18,
  },
});
export default CommunityWrite;
