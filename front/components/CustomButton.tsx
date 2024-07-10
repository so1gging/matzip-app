import {
  Dimensions,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
} from 'react-native';
import { colors } from '../constants';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'lg' | 'medium';
  inValid?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

function CustomButton({
  label,
  variant = 'filled',
  size = 'lg',
  inValid = false,
  ...props
}: CustomButtonProps) {
  // Dimensions.get('screen').height 안드로이드는 상태표시줄도 포함
  // Dimensions.get('height').height

  return (
    <Pressable
      disabled={inValid}
      style={({pressed}) => [styles.container, styles[size], inValid && styles.inValid, pressed ? styles[`${variant}Pressed`]:styles[variant]]}
      {...props}>
      <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
    </Pressable>
  );
}
// 버튼 컴포넌트와 비슷하지만, 눌렀을 때 감지해 스타일을 쉽게 지정할 수 있음. pressed 상태를 지정해줌

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    justifyContent: 'center',
  },
  inValid: {
    opacity: 0.5,
  },
  filled: {
    backgroundColor: colors.PINK_700,
  },
  outlined: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
  },
  filledPressed: {
    backgroundColor: colors.PINK_500,
  },
  outlinedPressed: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
    opacity: 0.5
  },
  lg: {
    width: '100%',
    paddingVertical: deviceHeight > 700 ? 15 : 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medium: {
    width: '50%',
    paddingVertical: deviceHeight > 700 ? 12 : 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  filledText: {
    color: colors.WHITE,
  },
  outlinedText: {color: colors.PINK_700},
});

export default CustomButton;
