import { SafeAreaView, StyleSheet, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputField';
import useForm from '../../src/hooks/useForm';
import { validateSignup } from '../../utils/validate';



function SignUpScreen() {
  const signUp = useForm({initialValue: {email: '', password: '', passwordConfirm: ''}, validate: validateSignup});

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
      <InputField
          placeholder="이메일"
          error={signUp.errors.email}
          inputMode="email"
          touched={signUp.touched.email}
          {...signUp.getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          error={signUp.errors.password}
          secureTextEntry
          touched={signUp.touched.password}
          {...signUp.getTextInputProps('password')}
        />
        <InputField
          placeholder="비밀번호 확인"
          error={signUp.errors.passwordConfirm}
          secureTextEntry
          touched={signUp.touched.passwordConfirm}
          {...signUp.getTextInputProps('passwordConfirm')}
        />
        <CustomButton label="회원가입" onPress={() => {}} />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30
  }
})

export default SignUpScreen;
