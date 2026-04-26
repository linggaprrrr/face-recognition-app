import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';

import TextInput from '@components/TextInput';
import Text from '@components/Text';
import TermAndPrivacy from '@components/TermsAndPrivacy';

import {useRegisterScene} from './hooks/useRegisterScene';
import icons from '@icons';
import styles from './styles';
import colors from '@colors';

const RegisterScene = () => {
  const {state, method} = useRegisterScene();
  const {email, name, password, loading, checked} = state;
  const {setEmail, setName, handleSelfieBtn, goToLoginScene, setPassword, setChecked, handleGoogleLogin} = method;

  return (
    <>
      <StatusBar backgroundColor={colors.bg} barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>

          {/* Logo */}
          <View style={styles.logoSection}>
            <View style={styles.logoBox}>
              <Image source={icons.faceId} style={styles.logoIcon} />
            </View>
            <Text style={styles.logoText}>Ownize</Text>
            <Text style={styles.logoSubtext}>AI Photo Discovery & Purchase</Text>
          </View>

          {/* Tab toggle */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={styles.tabBtn}
              onPress={goToLoginScene}
              activeOpacity={0.8}>
              <Text style={styles.tabBtnText}>Masuk</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBtn, styles.tabBtnActive]}
              activeOpacity={0.8}>
              <Text style={[styles.tabBtnText, styles.tabBtnTextActive]}>Daftar</Text>
            </TouchableOpacity>
          </View>

          {/* Google button */}
          <TouchableOpacity
            style={styles.googleBtn}
            onPress={handleGoogleLogin}
            activeOpacity={0.8}>
            <Image source={icons.google} style={styles.googleIcon} />
            <Text style={styles.googleBtnText}>Lanjutkan dengan Google</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>atau</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Form */}
          <TextInput
            placeholder="Nama Lengkap"
            containerStyle={styles.inputStyle}
            value={name}
            onChangeText={setName}
            maxLength={45}
          />
          <TextInput
            placeholder="email@example.co.id"
            containerStyle={styles.inputStyle}
            value={email}
            onChangeText={setEmail}
            maxLength={60}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            containerStyle={styles.inputStyle}
            value={password}
            onChangeText={setPassword}
            maxLength={25}
            secureTextEntry
          />

          {/* Terms */}
          <View style={styles.termsWrapper}>
            <TermAndPrivacy checked={checked} setChecked={() => setChecked(!checked)}>
              <Text style={styles.termsText}>
                Dengan mendaftar, kamu menyetujui{' '}
                <Text style={styles.blueText}>Persyaratan Penggunaan</Text> dan{' '}
                <Text style={styles.blueText}>Kebijakan Privasi</Text>.
              </Text>
            </TermAndPrivacy>
          </View>

          {/* Primary action */}
          <TouchableOpacity
            style={[styles.primaryBtn, (!checked || loading) && styles.primaryBtnDisabled]}
            onPress={handleSelfieBtn}
            disabled={!checked || loading}
            activeOpacity={0.85}>
            <Text style={styles.primaryBtnText}>
              {loading ? 'Memproses...' : 'Ambil Selfie →'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default RegisterScene;
