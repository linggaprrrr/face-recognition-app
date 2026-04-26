import React, { memo } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import icons from "@icons";
import images from "@images";
import { Navigation } from "@navigations";
import styles from "./styles";

interface ISelfieIntro {
  onStart: () => void;
}

const RULES = [
  "Jangan menggunakan aksesoris (kacamata, topi, masker)",
  "Pastikan wajah terlihat jelas dan tidak tertutup rambut",
  "Atur pencahayaan agar wajah terlihat terang di kamera",
];

const SelfieIntroComponent = ({ onStart }: ISelfieIntro) => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <SafeAreaView edges={["top"]} style={styles.safeTop}>
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
          <View style={styles.headerSpacer} />
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.faceIconContainer}>
          <Image
            source={icons.faceId}
            style={styles.faceIcon}
            tintColor="white"
          />
        </View>

        <Text style={styles.sectionTitle}>Panduan Pengambilan Foto</Text>
        <Text style={styles.sectionSubtitle}>
          Ikuti panduan berikut agar sistem dapat mengenali wajah kamu dengan
          akurat.
        </Text>

        <View style={styles.rulesList}>
          {RULES.map((rule, i) => (
            <View key={i} style={styles.ruleRow}>
              <View style={styles.ruleBadge}>
                <Text style={styles.ruleBadgeText}>{i + 1}</Text>
              </View>
              <Text style={styles.ruleText}>{rule}</Text>
            </View>
          ))}
        </View>

        <View style={styles.examplesCard}>
          <View style={styles.exampleBlock}>
            <Text style={styles.exampleLabelGood}>Contoh Benar</Text>
            <View style={styles.exampleImgWrap}>
              <Image source={images.rightPhoto} style={styles.exampleImg} />
              <View style={styles.badgeGood}>
                <Image
                  source={icons.greenCheck}
                  style={styles.badgeIcon}
                  tintColor="white"
                />
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.exampleBlock}>
            <Text style={styles.exampleLabelBad}>Contoh Salah</Text>
            <View style={styles.badExamplesRow}>
              {[0, 1, 2].map((i) => (
                <View key={i} style={styles.badImgWrap}>
                  <Image
                    source={images.rightPhoto}
                    style={styles.badExampleImg}
                  />
                  <View style={styles.badgeWrong}>
                    <Image
                      source={icons.redClose}
                      style={styles.badgeIcon}
                      tintColor="white"
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.safeBottom}>
        <Pressable style={styles.startButton} onPress={onStart}>
          <Text style={styles.startButtonText}>Mulai Ambil Foto</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

const SelfieIntro = memo(SelfieIntroComponent);
export default SelfieIntro;
