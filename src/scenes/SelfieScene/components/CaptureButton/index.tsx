import React, { useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import { Camera, PhotoFile } from "react-native-vision-camera";
import { RefObject } from "react";

import styles from "./styles";

interface CaptureButtonProps {
  cameraRef: RefObject<Camera>;
  onMediaCaptured: (file: PhotoFile) => void;
}

const CaptureButton = ({ cameraRef, onMediaCaptured }: CaptureButtonProps) => {
  const onPress = useCallback(async () => {
    const photo = await cameraRef.current?.takePhoto();
    if (photo) onMediaCaptured(photo);
  }, [cameraRef, onMediaCaptured]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.captureButton}>
      <View style={styles.captureButtonInner} />
    </TouchableOpacity>
  );
};

export default CaptureButton;
