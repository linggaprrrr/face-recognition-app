import { Navigation } from '@navigations';
import { useState, useEffect } from 'react';


export function useMediaPreviewScene() {
    const [shouldShowConfirmationSection, setShouldShowConfirmationSection] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const goBack = () => {
        Navigation.selfieScene({ showShowCamera: true, reset: true });
    };

    const setShouldShowLoading = (value: boolean) => {
        setIsLoading(value);
    };

    return {
        shouldShowConfirmationSection,
        isLoading,
        goBack,
        setShouldShowLoading,
    };
}
