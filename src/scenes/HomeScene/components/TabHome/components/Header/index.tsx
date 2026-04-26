import React, { memo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import Text from '@components/Text';
import icons from '@icons';
import { Navigation } from '@navigations';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

const RADIUS_LABEL: Record<number, string> = {
  0.8: 'Paling Mirip',
  0.65: 'Seimbang',
  0.5: 'Lebih Banyak',
};

interface HeaderProps {
  onFilterPress?: () => void;
  photoCount?: number;
}

const HeaderComponent = ({ onFilterPress, photoCount }: HeaderProps) => {
  const cart = useSelector((state: RootState) => state.cart);
  const nRadius = useSelector((state: RootState) => state.home.nRadius);
  const sensitivityLabel = RADIUS_LABEL[nRadius] ?? 'Seimbang';

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Foto Saya</Text>
        <Text style={styles.subtitle}>
          {photoCount != null && photoCount > 0
            ? `${photoCount} foto ditemukan`
            : 'Mencari foto untukmu'}
        </Text>
      </View>

      <View style={styles.sideContainer}>
        {/* Sensitivity pill */}
        {onFilterPress && (
          <TouchableOpacity style={styles.sensitivityPill} onPress={onFilterPress}>
            <Text style={styles.sensitivityPillText}>{sensitivityLabel} ↓</Text>
          </TouchableOpacity>
        )}

        {/* Cart button */}
        <TouchableOpacity style={styles.iconBtn} onPress={() => Navigation.cartScene()}>
          <Image source={icons.cart} style={styles.cartIcon} />
          {cart.items.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cart.items.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Header = memo(HeaderComponent);
export default Header;
