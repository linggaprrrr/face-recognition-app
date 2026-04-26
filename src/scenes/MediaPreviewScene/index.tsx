import React from "react";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { setScreenshotPrevention } from '@utils/screenshotPrevention';
import { Dimensions, Image, Pressable, SafeAreaView, View } from "react-native";

import Text from "@components/Text";
import ConfirmationSection from "./components/ConfirmationSection";
import LoadingModal from "./components/LoadingModal";
import { useMediaPreviewScene } from "./hooks/useMediaPreviewScene";
import styles from "./styles";

export interface MediaPreviewSceneProps {
  firstPhotoPath: string;
  secondPhotoPath: string;
  onInactive?: () => void;
}

const LABELS = ['Foto Biasa', 'Foto Kaget'];
const { height } = Dimensions.get('window');
const PHOTO_HEIGHT = height * 0.72;

const MediaPreviewScene = ({
  firstPhotoPath,
  secondPhotoPath,
}: MediaPreviewSceneProps) => {
  const {
    shouldShowConfirmationSection,
    isLoading,
    goBack,
    setShouldShowLoading,
  } = useMediaPreviewScene();

  const mediaPaths = [firstPhotoPath, secondPhotoPath];

  useFocusEffect(
    useCallback(() => {
      setScreenshotPrevention(true);
      return () => {
        setScreenshotPrevention(false);
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Photos */}
      <View style={styles.photoRow}>
        {mediaPaths.map((source, index) => (
          <View key={index} style={styles.photoWrap}>
            <Image
              source={{ uri: source }}
              style={styles.previewImage}
            />
            <View style={styles.photoLabel}>
              <View style={styles.photoLabelPill}>
                <Text style={styles.photoLabelText}>{LABELS[index]}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Close */}
      <Pressable style={styles.closeBtn} onPress={goBack} hitSlop={8}>
        <Text style={styles.closeText}>✕</Text>
      </Pressable>

      {shouldShowConfirmationSection && (
        <ConfirmationSection
          reTakePhoto={goBack}
          setShouldShowLoading={setShouldShowLoading}
        />
      )}

      <LoadingModal isLoading={isLoading} mediaPaths={mediaPaths} />
    </SafeAreaView>
  );
};

export default MediaPreviewScene;
