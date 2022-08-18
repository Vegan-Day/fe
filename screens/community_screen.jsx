import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../color';
import CommunityList from '../components/community_list/community_list';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';
import { URL } from '@env';
import { useIsFocused } from '@react-navigation/native';

const CommunityScreen = ({ navigation }) => {
  const [lists, setLists] = useState([]);
  const [searchText, setSearchText] = useState('');

  const isFocused = useIsFocused();

  const listUpdate = useCallback(() => {
    try {
      axios
        .get(`${URL}/community`)
        .then((response) => response.data.data)
        .then((data) => setLists(data));
    } catch (error) {
      console.log(error);
    }
  });

  const onSelect = () => {
    try {
      axios //
        .get(`${URL}/community?searchText=${searchText}`)
        .then((response) => response.data.data)
        .then((data) => {
          setLists(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listUpdate();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>전체글</Text>
        <TextInput
          style={styles.input}
          placeholder='검색...'
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={onSelect}
        />
      </View>
      <View style={styles.scroll}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {lists.map((list) => (
            <CommunityList
              key={list.bid}
              list={list}
              navigation={() => {
                navigation.navigate('CommunityDetail', { bid: list.bid });
              }}
            />
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: theme.mainColor,
          position: 'relative',
          left: 320,
          bottom: 120,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 35,
          width: 50,
          height: 50,
        }}
        onPress={() => {
          navigation.navigate('CommunityWrite');
        }}
      >
        <EvilIcons name='pencil' size={40} color='white' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    height: 80,
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
  scroll: {
    maxHeight: '82%',
  },
});

export default CommunityScreen;
