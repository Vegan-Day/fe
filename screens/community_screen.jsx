import React, { useEffect, useState } from 'react';
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

const CommunityScreen = ({ navigation }) => {
  const [lists, setLists] = useState([]);

  // const Stack = createStackNavigator();

  // function StackNavigation() {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen name='CommunityScreen' component={ComunityScreen} />
  //       <Stack.Screen name='CommunityWrite' component={CommunityWrite} />
  //     </Stack.Navigator>
  //   );
  // }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>전체글</Text>
        <TextInput style={styles.input} placeholder='검색...' />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {lists.map((list) => (
          <CommunityList key={list.userId} list={list} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: theme.mainColor,
          position: 'relative',
          left: 320,
          bottom: 150,
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

export default CommunityScreen;
