/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import RootNavigator from './navigations/root/RootNavigator';
import { queryClinet } from './src/apis/queryClient';

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClinet}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
