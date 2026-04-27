import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';

import TextInput from '@components/TextInput';
import Text from '@components/Text';

import {useLoginScene} from './hooks/useLoginScene';
import images from '@images';
import icons from '@icons';
import styles from './styles';
import colors from '@colors';

const LoginScene = () => {
  const {state, method} = useLoginScene();
  const {email, password, loading} = state;
  const {setEmail, setPassword, goToRegisterScene, handleLogin, handleGoogleLogin} = method;

  const [mode, setMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Keluar Aplikasi',
        'Apakah kamu yakin ingin keluar?',
        [
          {
            text: 'Batal',
            style: 'cancel',
          },
          {
            text: 'Keluar',
            style: 'destructive',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {cancelable: true},
      );
      return true;
    };
    const handler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => handler.remove();
  }, []);

  const handleTabPress = (tab: 'login' | 'register') => {
    if (tab === 'register') {
      goToRegisterScene();
    } else {
      setMode('login');
    }
  };

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
            <View style={styles.logoImageWrapper}>
              <Image source={images.ownize} style={styles.logoImage} />
            </View>
            <Text style={styles.logoSubtext}>AI Photo Discovery & Purchase</Text>
          </View>

          {/* Tab toggle */}
          <View style={styles.tabRow}>
            {(['login', 'register'] as const).map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.tabBtn, mode === tab && styles.tabBtnActive]}
                onPress={() => handleTabPress(tab)}
                activeOpacity={0.8}>
                <Text style={[styles.tabBtnText, mode === tab && styles.tabBtnTextActive]}>
                  {tab === 'login' ? 'Masuk' : 'Daftar'}
                </Text>
              </TouchableOpacity>
            ))}
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
            placeholder="Email"
            containerStyle={styles.inputStyle}
            value={email}
            onChangeText={setEmail}
            maxLength={50}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            containerStyle={styles.inputStyle}
            value={password}
            onChangeText={setPassword}
            maxLength={30}
            secureTextEntry
          />

          {/* Primary action */}
          <TouchableOpacity
            style={[styles.primaryBtn, loading && {opacity: 0.7}]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}>
            <Text style={styles.primaryBtnText}>
              {loading ? 'Memproses...' : 'Masuk'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default LoginScene;
