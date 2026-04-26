import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';

import Text from '@components/Text';
import Navbar from '@components/Navbar';
import icons from '@icons';
import styles from './styles';
import colors from '@colors';
import {Navigation} from '@navigations';

interface ITermOfUseScene {
  setShouldShowLoading: (value: boolean) => void;
}

const USE_ITEMS = [
  'Mencocokkan dan menemukan foto Anda dalam sistem kami',
  'Meningkatkan akurasi pencarian berbasis AI',
];

const GUARANTEE_ITEMS = [
  'Data wajah disimpan dengan aman dan terenkripsi',
  'Tidak dibagikan ke pihak ketiga tanpa izin',
  'Dapat dihapus kapan saja melalui pengaturan akun',
];

const TermOfUseScene = ({setShouldShowLoading}: ITermOfUseScene) => {
  const [checked, setChecked] = useState(false);

  function goBack() {
    setShouldShowLoading(true);
    Navigation.pop();
  }

  return (
    <>
      <StatusBar backgroundColor={colors.bg} barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <Navbar
          title="Persetujuan Privasi"
          leftIcon={icons.arrowLeftRound}
          onBack={goBack}
        />
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}>

          {/* Icon */}
          <View style={styles.iconBox}>
            <Image source={icons.faceId} style={styles.iconImg} />
          </View>

          <Text style={styles.title}>Persetujuan Privasi</Text>
          <Text style={styles.subtitle}>
            Ownize menggunakan teknologi face recognition untuk menemukan foto Anda secara otomatis. Harap baca persetujuan berikut:
          </Text>

          {/* Usage card */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Foto wajah Anda digunakan untuk:</Text>
            {USE_ITEMS.map((item, i) => (
              <View key={i} style={styles.checkRow}>
                <View style={styles.checkDot}>
                  <Image source={icons.faceId} style={styles.checkDotIcon} />
                </View>
                <Text style={styles.checkText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Guarantee card */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Kami menjamin:</Text>
            {GUARANTEE_ITEMS.map((item, i) => (
              <View key={i} style={styles.checkRow}>
                <View style={[styles.checkDot, styles.checkDotSuccess]}>
                  <Image source={icons.faceId} style={[styles.checkDotIcon, styles.checkDotIconSuccess]} />
                </View>
                <Text style={styles.checkText}>{item}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Fixed footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.agreeRow}
            onPress={() => setChecked(!checked)}
            activeOpacity={0.8}>
            <View style={[styles.checkbox, checked && styles.checkboxActive]}>
              {checked && (
                <Image source={icons.faceId} style={styles.checkboxIcon} />
              )}
            </View>
            <Text style={styles.agreeText}>
              Saya menyetujui penggunaan data wajah sesuai kebijakan privasi Ownize
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.agreeBtn, !checked && styles.agreeBtnDisabled]}
            onPress={goBack}
            disabled={!checked}
            activeOpacity={0.85}>
            <Text style={[styles.agreeBtnText, !checked && styles.agreeBtnTextDisabled]}>
              Setuju & Lanjutkan
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default TermOfUseScene;
