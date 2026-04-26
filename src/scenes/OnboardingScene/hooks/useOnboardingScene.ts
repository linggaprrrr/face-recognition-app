import {useRef, useState} from 'react';
import Onboarding from 'react-native-onboarding-swiper';

import colors from '@colors';
import {Navigation} from '@navigations';
import images from '@images';

const data = [
    {
        id: 1,
        backgroundColor: colors.black,
        image: images.onboardingOne,
        title: 'Welcome to Ownize',
        subtitle: `Just turn on your location and you will find${'\n'}the nearest pet care you wish.`,
    },
    {
        id: 2,
        backgroundColor: colors.black,
        image: images.onboardingOne,
        title: 'Take Selfie',
        subtitle: `Take your selfie and you will find${'\n'}the nearest pet care you wish.`,
    },
    {
        id: 3,
        backgroundColor: colors.black,
        image: images.onboardingOne,
        title: 'Select Photo',
        subtitle: 'Select your photo and download it.',
    },
];

export function useOnboardingScene() {
    const onboardingRef = useRef<Onboarding>(null);

    const [onboardingContent] = useState(data);
    const [currentPage, setCurrentPage] = useState(0);

    const totalPage = data.length;

    function skipOnboarding() {
        Navigation.registerScene();
    }

    function goNext() {
        if (currentPage < totalPage - 1) {
            onboardingRef.current?.goNext();
            return;
        }
        Navigation.registerScene();
    }

    function goToPage(page: number) {
        onboardingRef.current?.goToPage(page, true);
    }

    function getCurrentPage(page: number) {
        setCurrentPage(page);
    }

    return {
        method: {
            skipOnboarding,
            goToPage,
            goNext,
            getCurrentPage,
        },
        state: {
            onboardingRef,
            onboardingContent,
            currentPage,
            totalPage,
        },
    };
}
