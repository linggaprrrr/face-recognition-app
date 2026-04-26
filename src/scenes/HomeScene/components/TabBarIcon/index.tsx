import React, { memo } from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';
import styles from './styles';

export interface TabBarIconProps {
    icon: ImageSourcePropType;
    isFocused: boolean;
}

const TabBarIconComponent = ({icon, isFocused}: TabBarIconProps) => {
    return (
        <View style={styles.container}>
            {isFocused && (
                <View style={styles.indicator} />
            )}
            <Image source={icon} />
            {isFocused && (
                <View style={styles.dotIndicator} />
            )}
        </View>
    );
};

const TabBarIcon = memo(TabBarIconComponent);
export default TabBarIcon;
