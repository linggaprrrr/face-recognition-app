import React, {memo} from 'react';
import {StatusBar, View} from 'react-native';

import LeftButton from './components/LeftButton';

import {INavbar} from './types';
import styles from './styles';
import colors from '@colors';
import Text from '@components/Text';

const NavbarComponent = ({
  title,
  barColor,
  barStyle,
  showLeftButton = true,
  leftIcon,
  rightComponent,

  onBack,
}: INavbar) => {

  return (
    <View style={[styles.container, barColor && {backgroundColor: 'transparent'}]}>
      <StatusBar
        backgroundColor={barColor ?? colors.white}
        barStyle={barStyle ?? 'dark-content'}
      />
      <View style={styles.titleContainer}>
        <View style={styles.leftContainer}>
          {showLeftButton && <LeftButton leftIcon={leftIcon} onBack={onBack} />}
          {(
            title && <Text style={styles.title}>{title}</Text>
          )}
        </View>
        {rightComponent && (
          rightComponent
        )}
      </View>
    </View>
  );
};

const Navbar = memo(NavbarComponent);
export default Navbar;
