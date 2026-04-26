import React, { memo } from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import styles from './styles';

interface IAvatar {
    image: ImageSourcePropType;
    size?: number;
}

const AvatarComponent = ({image, size}: IAvatar) => {
    return (
        <Image source={image} style={styles(size).avatar} />
    );
};

const Avatar = memo(AvatarComponent);
export default Avatar;
