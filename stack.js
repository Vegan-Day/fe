import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CommunityScreen from './screens/community_screen';
import CommunityWrite from './screens/community_write';
import Menu from './components/menu/menu';
import CommunityDetail from './screens/community_detail';

const Stack = createStackNavigator();

const WholeStack = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='menu'
        component={Menu}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='CommunityScreen' component={CommunityScreen} />
      <Stack.Screen
        name='CommunityWrite'
        component={CommunityWrite}
        options={{ title: '게시글 작성' }}
      />
      <Stack.Screen
        name='CommunityDetail'
        component={CommunityDetail}
        options={{ title: '게시글' }}
      />
    </Stack.Navigator>
  );
};

export default WholeStack;
