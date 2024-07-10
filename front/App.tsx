/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import RootNavigator from './navigations/root/RootNavigator';

function App(): JSX.Element {

  return (
    <NavigationContainer>
    <RootNavigator />
    </NavigationContainer>
  );
}


export default App;
