import React, {memo, useMemo} from 'react';
import {Image, ImageSourcePropType, TouchableOpacity} from 'react-native';

import { Navigation } from '@navigations';

import styles from '../../styles';
import icons from '../../../../assets/icons';

interface ILeftButton {
  leftIcon?: ImageSourcePropType;

  onBack?: () => void;
}

const LeftComponent = ({leftIcon, onBack}: ILeftButton) => {
  const iconStyle = useMemo(() => {
    if (leftIcon === icons.arrowLeftRound) {
      return styles.arrowLeftRoundIcon;
    }
    return styles.arrowLeftIcon;
  }, [leftIcon]);

  function goBack() {
    if (onBack) {
      onBack();
      return;
    }
    Navigation.pop();
  }

  return (
    <TouchableOpacity style={styles.leftButton} onPress={goBack}>
      <Image source={leftIcon ?? icons.chevronLeft} style={iconStyle} />
    </TouchableOpacity>
  );
};

const LeftButton = memo(LeftComponent);
export default LeftButton;
