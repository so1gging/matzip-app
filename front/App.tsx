/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AuthHomeScreen from './screens/AuthHomeScreen';
import AuthStackNavigator from './navigation/AuthStackNavigator';

function App(): JSX.Element {
  const [name, setName] = useState<string>('');
  const handleChangeInput = (text: string) => {
    // setName(e.target.value)
    setName(text);
  };
  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
    width: 100,
  },
  inputContaniner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default App;
