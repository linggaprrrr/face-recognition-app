import React, {memo} from 'react';
import {Image, ImageSourcePropType, Pressable, StyleProp, View, ViewStyle} from 'react-native';

import Text from '@components/Text';
import icons from '@icons';
import styles from './styles';

interface IButtonSection {
  leftIcon: ImageSourcePropType;
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const ButtonSectionComponent = ({leftIcon, label, containerStyle, onPress}: IButtonSection) => {
  return (
    <Pressable style={[styles.container, containerStyle]} onPress={onPress} android_ripple={{color: 'rgba(0,0,0,0.04)'}}>
      <View style={styles.leftContentContainer}>
        <View style={styles.leftIconContainer}>
          <Image source={leftIcon} style={styles.leftIcon} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Image source={icons.chevronRight} style={styles.chevron} />
    </Pressable>
  );
};

const ButtonSection = memo(ButtonSectionComponent);
export default ButtonSection;
