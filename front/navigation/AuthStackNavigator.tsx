import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import AuthHomeScreen from '../screens/AuthHomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { authNavigations } from '../\bconstants';



export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined // param을 쓰는 경우는 id값과 같이 값을 넘겨야 할 때 쓰임
  [authNavigations.LOGIN]: undefined
}

function AuthStackNavigator() {
  const Stack = createNativeStackNavigator<AuthStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen name={authNavigations.AUTH_HOME} component={AuthHomeScreen} />
      <Stack.Screen name={authNavigations.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;
