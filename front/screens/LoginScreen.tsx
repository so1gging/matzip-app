import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import InputField from '../components/InputField';

interface LoginScreenProps {}

function LoginScreen({}: LoginScreenProps) {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  // const handleChangeEmail = (text: string) => {
  //   setEmail(text)
  // }

  // const handleChangePassword = (text: string) => {
  //   setPassword(text)
  // }

  const [values, setValues] = useState({email: '', password: ''});
  const [touched, setTouched] = useState({email: false, password: false});

  const handleChangeValues = (name: string, text: string) => {
    setValues(prev => ({...prev, [name]: text}));
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({...prev, [name]: true}));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          error="이메일을 입력해주세요"
          inputMode="email"
          value={values.email}
          touched={touched.email}
          onBlur={() => handleBlur('email')}
          onChangeText={(text: string) => handleChangeValues('email', text)}
        />
        <InputField
          placeholder="비밀번호"
          error="비밀번호를 입력해주세요."
          secureTextEntry
          value={values.password}
          touched={touched.password}
          onBlur={() => handleBlur('password')}
          onChangeText={(text: string) => handleChangeValues('password', text)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
  },
});

export default LoginScreen;
