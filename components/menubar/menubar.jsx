import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Menu from '../menu/menu';

const Menubar = (props) => {
  return (
    <NavigationContainer>
      <Menu />
    </NavigationContainer>
  );
};

export default Menubar;
