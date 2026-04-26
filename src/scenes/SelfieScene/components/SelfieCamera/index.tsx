import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera } from "react-native-vision-camera";

import colors from "@colors";
import icons from "@icons";
import { Navigation } from "@navigations";
import CaptureButton from "@scenes/SelfieScene/components/CaptureButton";
import { useSelfieCamera } from "./hooks/useSelfieCamera";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
const OVAL_W = Math.round(SCREEN_W * 0.62);
const OVAL_H = Math.round(OVAL_W * 1.3);
const OVAL_LEFT = (SCREEN_W - OVAL_W) / 2;
const OVAL_TOP = Math.round(SCREEN_H * 0.17);
const OVERLAY_COLOR = "rgba(0,0,0,0.65)";

const STEP_INSTRUCTIONS = [
  "Senyum ke kamera",
  "Ekspresikan kejutan ke kamera",
];

function NoCameraDeviceError() {
  return (
    <View style={styles.noCamera}>
      <Text style={styles.noCameraText}>Kamera tidak ditemukan</Text>
    </View>
  );
}

const SelfieCamera = () => {
  const { cameraRef, device, isActive, photoTakenFirst, onPhotoCaptured } =
    useSelfieCamera({ showShowCamera: true, reset: false });

  const currentStep = photoTakenFirst ? 1 : 0;

  if (device == null) {
    return <NoCameraDeviceError />;
  }

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Camera feed behind everything */}
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        outputOrientation="device"
        photo
      />

      {/* Dark overlay: top */}
      <View
        pointerEvents="none"
        style={[styles.overlay, { top: 0, left: 0, right: 0, height: OVAL_TOP }]}
      />
      {/* Dark overlay: left of oval */}
      <View
        pointerEvents="none"
        style={[
          styles.overlay,
          { top: OVAL_TOP, left: 0, width: OVAL_LEFT, height: OVAL_H },
        ]}
      />
      {/* Dark overlay: right of oval */}
      <View
        pointerEvents="none"
        style={[
          styles.overlay,
          {
            top: OVAL_TOP,
            left: OVAL_LEFT + OVAL_W,
            right: 0,
            height: OVAL_H,
          },
        ]}
      />
      {/* Dark overlay: bottom */}
      <View
        pointerEvents="none"
        style={[
          styles.overlay,
          { top: OVAL_TOP + OVAL_H, left: 0, right: 0, bottom: 0 },
        ]}
      />

      {/* Oval face guide border */}
      <View
        pointerEvents="none"
        style={[
          styles.ovalGuide,
          {
            top: OVAL_TOP,
            left: OVAL_LEFT,
            width: OVAL_W,
            height: OVAL_H,
            borderRadius: OVAL_W / 2,
          },
        ]}
      />

      {/* Header */}
      <SafeAreaView edges={["top"]} style={styles.headerSafe}>
        <View style={styles.header}>
          <Pressable
            onPress={() => Navigation.pop()}
            style={styles.backBtn}
            hitSlop={8}
          >
            <Image
              source={icons.arrowLeft}
              style={styles.backIcon}
              tintColor="white"
            />
          </Pressable>
          <Text style={styles.headerTitle}>Daftarkan Wajah</Text>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>{currentStep + 1}/2</Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Bottom controls */}
      <SafeAreaView edges={["bottom"]} style={styles.bottomSafe}>
        <View style={styles.bottomContent}>
          <Text style={styles.instructionText}>
            {STEP_INSTRUCTIONS[currentStep]}
          </Text>

          <View style={styles.stepDots}>
            {[0, 1].map((i) => (
              <View
                key={i}
                style={[styles.dot, i === currentStep && styles.dotActive]}
              />
            ))}
          </View>

          <CaptureButton
            cameraRef={cameraRef}
            onMediaCaptured={onPhotoCaptured}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "black",
  },
  overlay: {
    position: "absolute",
    backgroundColor: OVERLAY_COLOR,
  },
  ovalGuide: {
    position: "absolute",
    borderWidth: 2.5,
    borderColor: "white",
    backgroundColor: "transparent",
  },
  noCamera: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  noCameraText: {
    color: "white",
    fontSize: 16,
  },
  headerSafe: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 18,
  },
  backIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  stepBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
  },
  stepBadgeText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
  },
  bottomSafe: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomContent: {
    alignItems: "center",
    paddingBottom: 24,
    paddingTop: 16,
  },
  instructionText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  stepDots: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 28,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 24,
    borderRadius: 4,
  },
});

export default SelfieCamera;
