import React, {memo} from 'react';
import {Image, ImageSourcePropType, View} from 'react-native';

import Avatar from '@components/Avatar';
import Text from '@components/Text';
import styles from './styles';

interface ITopSection {
  avatar: ImageSourcePropType;
  name: string;
  phone: string;
  email: string;
}

const TopSectionComponent = ({avatar, name, phone, email}: ITopSection) => {
  const initial = name ? name.charAt(0).toUpperCase() : 'U';
  const hasAvatar = avatar && (avatar as any).uri;

  return (
    <View style={styles.container}>
      {hasAvatar ? (
        <Avatar image={avatar} size={60} />
      ) : (
        <View style={styles.avatarFallback}>
          <Text style={styles.avatarInitial}>{initial}</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{name || '-'}</Text>
        <Text style={styles.subtitle}>{email || '-'}</Text>
      </View>
    </View>
  );
};

const TopSection = memo(TopSectionComponent);
export default TopSection;
