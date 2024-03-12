import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import LoginProvider from './src/context/LoginProvider';
import MainNavigator from './src/navigatins/MainNavigator';

const App = () => {
  return (
    <LoginProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </LoginProvider>
  );
};

export default App;
