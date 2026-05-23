import React, { memo } from "react";
import {
  Linking,
  Modal,
  StyleSheet,
  View,
} from "react-native";
import Text from "@components/Text";
import Button from "@components/Button";
import colors from "@colors";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.ownize.mobile";

interface Props {
  visible: boolean;
}

function ForceUpdateModalComponent({ visible }: Props) {
  function openPlayStore() {
    Linking.openURL(PLAY_STORE_URL);
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Pembaruan Diperlukan</Text>
          <Text style={styles.message}>
            Ada versi terbaru tersedia. Silakan perbarui aplikasi untuk
            melanjutkan.
          </Text>
          <Button
            label="Update Sekarang"
            containerStyle={styles.button}
            onPress={openPlayStore}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: colors.textMid,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    width: "100%",
  },
});

const ForceUpdateModal = memo(ForceUpdateModalComponent);
export default ForceUpdateModal;
