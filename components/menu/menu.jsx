import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/home_screen';
import MapScreen from '../../screens/map_screens';
import ComunityScreen from '../../screens/community_screen';
import MallScreen from '../../screens/mall_screen';
import OcrScreen from '../ocr/ocr_screen';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../color';
const Tab = createBottomTabNavigator();
const TabIcon = ({ name, color }) => {
  return (
    <MaterialCommunityIcons
      name={name}
      color={color}
      style={{
        fontSize: 30,
      }}
    />
  );
};

const CustomTarBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'white',
        borderColor: theme.mainColor,
        borderWidth: 4,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const Menu = (props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          elevation: 0,
          backgroundColor: '#ffffff',
          height: 65,
          ...styles.shadow,
          paddingVertical: 5,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarActiveTintColor: theme.mainColor,
      }}
    >
      <Tab.Screen
        name='home'
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: 'home' }),
        }}
      />
      <Tab.Screen
        name='community'
        component={ComunityScreen}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: 'chat' }),
        }}
      />

      <Tab.Screen
        name='ocr'
        component={OcrScreen}
        options={{
          tabBarIcon: (props) =>
            TabIcon({ ...props, name: 'leaf', color: theme.mainColor }),
          tabBarButton: (props) => <CustomTarBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name='mall'
        component={MallScreen}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: 'shopping' }),
        }}
      />
      <Tab.Screen
        name='map'
        component={MapScreen}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: 'map' }),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: theme.mainColor,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Menu;
