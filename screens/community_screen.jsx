import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, ScrollView } from 'react-native';
import { theme } from '../color';
import Writing from '../components/writing/writing';

const ComunityScreen = (props) => {
  const [writings, setWritings] = useState([
    {
      title: '비건',
      userId: 'leeseongho',
      writeDt: '2022/08/15',
      hit: 5,
      comment: 5,
    },
    {
      title: '비건2',
      userId: 'leeseongho2',
      writeDt: '2022/08/16',
      hit: 5,
      comment: 5,
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>전체글</Text>
        <TextInput style={styles.input} placeholder='검색...' />
      </View>
      <ScrollView>
        {writings.map((writing) => (
          <Writing key={writing.userId} writing={writing} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 18,
    width: 200,
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default ComunityScreen;
