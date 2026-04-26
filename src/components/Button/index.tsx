import React, {memo} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import Text from '@components/Text';

import colors from '@colors';
import styles from './styles';

interface IButton {
  label: string;
  labelColor?: string;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
  icon?: ImageSourcePropType;
  isDisabled?: boolean;

  onPress: () => void;
}

const ButtonComponent = ({
  label,
  labelColor,
  color,
  containerStyle,
  loading,
  icon,
  isDisabled,

  onPress,
}: IButton) => {
  const backgroundColor = isDisabled ?
    styles.disabledColor : (color ? {backgroundColor: color} : styles.enabledColor);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        containerStyle,
        backgroundColor,
      ]}
      activeOpacity={0.8}
      disabled={isDisabled || loading}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <View style={styles.labelContainer}>
          {icon && <Image source={icon} style={styles.icon} />}
          <Text style={[styles.label, labelColor && {color: labelColor}]}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const Button = memo(ButtonComponent);
export default Button;
