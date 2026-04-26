import React, { memo } from 'react';
import {
  Text as RNText,
  TextProps,
} from 'react-native';
import styles from './styles';

const TextComponent = ({
  children,
  ...rest
}: TextProps) => {
  return (
    <RNText style={[styles.defaultText, rest.style]} {...rest}>{children}</RNText>
  );
};

const Text = memo(TextComponent);
export default Text;
