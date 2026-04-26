import React from 'react';
import { Image, SafeAreaView, ScrollView } from 'react-native';

import HalfRoundContainer from '@components/HalfRoundContainer';
import Navbar from '@components/Navbar';
import Text from '@components/Text';

import icons from '@icons';
import styles from './styles';
import Button from '@components/Button';
import colors from '@colors';
import { Navigation } from '@navigations';

const FinishScene = () => {
    function goToHome() {
        // reset to home
        Navigation.homeScene(Navigation.RESET);
    }

    return (
        <>
            <SafeAreaView />
                <Navbar leftIcon={icons.arrowLeftRound} onBack={goToHome} />
                <ScrollView contentContainerStyle={styles.content}>
                    <HalfRoundContainer>
                        <Image source={icons.roundCheckBlueBig} style={styles.icon} />
                        <Text style={styles.title}>Terima Kasih!</Text>
                        <Text style={styles.description}>Harap menunggu sembari kami melakukan verifikasi. kami akan mengirimkan pemberitahuan setelah selesai.</Text>
                    </HalfRoundContainer>

                    <Button
                        label="OK"
                        color={colors.blue['2']}
                        onPress={goToHome}
                        containerStyle={styles.button}
                    />
                </ScrollView>
            <SafeAreaView />
        </>
    );
};

export default FinishScene;
