import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "@colors";
import SelfieIntro from "./components/SelfieIntro";
import SelfieCamera from "./components/SelfieCamera";
import { useSelfieScene } from "./hooks/useSelfieScene";

const SelfieScene = () => {
  const { state, method } = useSelfieScene();
  const { isIntroActive, hasPermission, permissionRequestDone } = state;
  const { setIsIntroActive, requestCameraPermission } = method;

  if (!permissionRequestDone) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>Izin Kamera Diperlukan</Text>
        <Text style={styles.permissionSubtitle}>
          Aplikasi memerlukan akses kamera untuk mendaftarkan wajah kamu.
        </Text>
        <Pressable style={styles.permissionButton} onPress={requestCameraPermission}>
          <Text style={styles.permissionButtonText}>Berikan Izin</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (isIntroActive) {
    return <SelfieIntro onStart={() => setIsIntroActive(false)} />;
  }

  return <SelfieCamera />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
    paddingHorizontal: 32,
  },
  permissionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.white,
    textAlign: "center",
    marginBottom: 12,
  },
  permissionSubtitle: {
    fontSize: 15,
    color: colors.textDim,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 28,
  },
  permissionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SelfieScene;
