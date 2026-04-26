import { Navigation } from "@navigations";
import { RootState } from "@redux/store";
import { useIsFocused } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, AppState, Linking } from "react-native";
import {
  Camera,
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { useSelector } from "react-redux";

export function useSelfieCamera({
  showShowCamera,
  reset,
}: {
  showShowCamera: boolean;
  reset: boolean;
}) {
  const cameraRef = useRef<Camera>(null);
  const home = useSelector((state: RootState) => state.home);

  const device = useCameraDevice("front");
  const { hasPermission, requestPermission } = useCameraPermission();

  const isFocused = useIsFocused();
  const [appState, setAppState] = useState(AppState.currentState);
  const [navigating, setNavigating] = useState(false);

  // Camera is only active when screen is focused, app is in foreground, and not navigating away
  const isActive = isFocused && appState === "active" && !navigating;

  const [firstPhoto, setFirstPhoto] = useState<PhotoFile | null>(null);
  const [photoTakenFirst, setPhotoTakenFirst] = useState(false);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) =>
      setAppState(state)
    );
    return () => sub.remove();
  }, []);

  const openSetting = useCallback(() => {
    Alert.alert(
      "Permission Denied",
      "Beri izin dari pengaturan untuk terus menggunakan kamera.",
      [
        {
          text: "Buka Pengaturan",
          onPress: () => Linking.openSettings(),
        },
      ]
    );
  }, []);

  useEffect(() => {
    const checkAndRequestPermission = async () => {
      try {
        const permissionGranted = await requestPermission();
        if (!permissionGranted) {
          openSetting();
        }
      } catch (err) {
        console.error("Camera permission request failed:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat meminta izin kamera.";
        Alert.alert("Izin Diperlukan", errorMessage);
      }
    };

    if (!hasPermission && showShowCamera) {
      checkAndRequestPermission();
    }
  }, [hasPermission, showShowCamera, requestPermission, openSetting]);

  useEffect(() => {
    if (reset) {
      setFirstPhoto(null);
      setPhotoTakenFirst(false);
    }
  }, [reset]);

  const onPhotoCaptured = useCallback(
    async (file: PhotoFile) => {
      if (!photoTakenFirst) {
        setFirstPhoto(file);
        setPhotoTakenFirst(true);
      } else {
        // Deactivate camera before navigating to avoid session/invalid-output-configuration
        setNavigating(true);
        const firstPhotoPath = `file://${firstPhoto?.path}`;
        const secondPhotoPath = `file://${file?.path}`;
        Navigation.mediaPreviewScene({
          firstPhotoPath,
          secondPhotoPath,
        });
      }
    },
    [firstPhoto, photoTakenFirst]
  );

  return {
    cameraRef,
    device,
    home,
    hasPermission,
    isActive,
    photoTakenFirst,
    onPhotoCaptured,
  };
}
