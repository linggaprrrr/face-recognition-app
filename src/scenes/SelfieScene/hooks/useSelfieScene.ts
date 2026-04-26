import { useCallback, useEffect, useState } from "react";
import { Alert, BackHandler } from "react-native";
import { Navigation } from "@navigations";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { Camera } from "react-native-vision-camera";
import { setResetPhoto } from "@redux/slice/home-slice";

export const useSelfieScene = () => {
  const home = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch();
  const [isIntroActive, setIsIntroActive] = useState(true);
    const [hasPermission, setHasPermission] = useState<boolean | undefined>(undefined);
  const [permissionRequestDone, setPermissionRequestDone] = useState(false);

  const requestCameraPermission = useCallback(async () => {
    console.log("Requesting camera permission...");
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);
    setHasPermission(permission === "granted");
    setPermissionRequestDone(true);
  }, []);

  useEffect(() => {
    requestCameraPermission();
  }, [requestCameraPermission]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Konfirmasi", "Yakin mau kembali?", [
        {
          text: "Batal",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Ya",
          onPress: () => {
            if (home.reset_photo) dispatch(setResetPhoto(false));
            Navigation.homeScene(Navigation.RESET);
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [home.reset_photo, dispatch]); // Tambahkan dependensi

  const handleRequestShowCamera = () => {
    setIsIntroActive(false);
  };

  // Expose state and methods
  return {
    state: {
      isIntroActive,
            hasPermission,
      permissionRequestDone,
    },
    method: {
      setIsIntroActive, // Mungkin dibutuhkan oleh SelfieIntro
      handleRequestShowCamera,
      requestCameraPermission, 
    },
  };
};