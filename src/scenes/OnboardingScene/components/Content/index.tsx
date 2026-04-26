import React, { memo } from 'react';
import { Image, View } from 'react-native';

import Text from '@components/Text';

import images from '@images';
import styles from '../../styles';

interface IContent {
    title: string;
    description: string;
}

const ContentComponent = ({title, description}: IContent) => {
    return (
        <View style={styles.content}>
            <Image source={images.onboardingOne} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

const Content = memo(ContentComponent);
export default Content;
