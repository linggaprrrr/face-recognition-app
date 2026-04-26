import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import { setScreenshotPrevention } from '@utils/screenshotPrevention';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import colors from '@colors';
import styles from './styles';
import images from '@images';
import icons from '@icons';
import TopSection from './components/TopSection';
import ButtonSection from './components/ButtonSection';
import {Navigation} from '@navigations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@redux/store';
import {clearUser} from '@redux/slice/user-slice';
import {clearHomeState, setResetPhoto} from '@redux/slice/home-slice';
import Toast from 'react-native-toast-message';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Text from '@components/Text';

const ProfileScene = () => {
  const {user} = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      setScreenshotPrevention(true);
      return () => {
        setScreenshotPrevention(false);
      };
    }, []),
  );

  function editProfile() {
    Navigation.editProfileScene();
  }

  function resetPhoto() {
    Alert.alert(
      'Reset Foto Selfie',
      'Apakah Anda yakin? Tindakan ini akan mengarahkan Anda untuk mengambil foto selfie baru.',
      [
        {text: 'Batal', style: 'cancel'},
        {
          text: 'Ya, Reset',
          onPress: () => {
            dispatch(setResetPhoto(true));
            Navigation.selfieScene();
          },
          style: 'destructive',
        },
      ],
    );
  }

  async function handleLogout() {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah Anda yakin ingin keluar?',
      [
        {text: 'Batal', style: 'cancel'},
        {
          text: 'Ya, Logout',
          onPress: async () => {
            try {
              await GoogleSignin.signOut();
            } catch (e) {}
            await AsyncStorage.setItem('token', 'logout');
            dispatch(clearUser());
            dispatch(clearHomeState());
            Navigation.loginScene(Navigation.RESET);
          },
          style: 'destructive',
        },
      ],
    );
  }

  async function handleContactWhatsapp() {
    const url = 'whatsapp://send?phone=6285692579611';
    try {
      await Linking.openURL(url);
    } catch {
      Toast.show({type: 'error', text1: 'Pastikan aplikasi WhatsApp terinstall.'});
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.surface} barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Avatar + name */}
        <TopSection
          avatar={user.picture ? {uri: user.picture} : images.avatar}
          name={user.name}
          phone={user.phone || '-'}
          email={user.email}
        />

        {/* Face data section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>Data Wajah</Text>
          <ButtonSection
            label="Reset Foto Selfie"
            leftIcon={icons.camera}
            onPress={resetPhoto}
          />
          <View style={styles.divider} />
          <ButtonSection
            label="Customer Service"
            leftIcon={icons.question}
            onPress={handleContactWhatsapp}
          />
        </View>

        {/* Account section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>Akun</Text>
          <ButtonSection
            label="Edit Profil"
            leftIcon={icons.editSquare}
            onPress={editProfile}
          />
          <View style={styles.divider} />
          <ButtonSection
            label="History Pembelian"
            leftIcon={icons.history}
            onPress={() => Navigation.historyScene()}
          />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScene;
