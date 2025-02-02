import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import useForm from '../src/hooks/useForm';
import {validateLogin} from '../utils';
import useAuth from '../src/hooks/queries/useAuth';

interface LoginScreenProps {}

function LoginScreen({}: LoginScreenProps) {
  const passwordRef = useRef<TextInput | null>(null);
  const {loginMutation} = useAuth()
  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  const handleSubmit = () => {
    console.log('values');
    loginMutation.mutate(login.values)
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={login.errors.email}
          inputMode="email"
          touched={login.touched.email}
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          error={login.errors.password}
          secureTextEntry
          blurOnSubmit={false}
          returnKeyType="join"
          touched={login.touched.password}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton label="로그인" onPress={handleSubmit} />
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
    marginBottom: 30,
  },
});

export default LoginScreen;
