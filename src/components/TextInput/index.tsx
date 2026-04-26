import React, { memo } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  TextInput as RNTextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';

import Text from '@components/Text';

import colors from '@colors';
import styles from './styles';

interface ITextInput extends TextInputProps {
  label?: string;
  subLabel?: string;
  containerStyle?: StyleProp<TextStyle>;
  rightIcon?: ImageSourcePropType;
  onPressRightIcon?: () => void;
}

const TextInputComponent = ({
  label,
  subLabel,
  containerStyle,
  rightIcon,
  onPressRightIcon,
  ...rest
}: ITextInput) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
      <RNTextInput
        style={rest.multiline ? styles.inputTextArea : styles.input}
        placeholderTextColor={colors.gray[4]}
        {...rest}
      />
      {rightIcon && (
        <Pressable onPress={onPressRightIcon} style={styles.rightIconContainer}>
          <Image source={rightIcon} style={styles.rightIcon} />
        </Pressable>
      )}
    </View>
  );
};

const TextInput = memo(TextInputComponent);
export default TextInput;
