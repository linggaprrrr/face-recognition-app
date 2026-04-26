import React, { memo, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { setScreenshotPrevention } from '@utils/screenshotPrevention';
import {
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';

import CalendarModal from '../CalendarModal';
import Header from './components/Header';
import PhotosList from './components/PhotosList';
import UnitSelector from './components/UnitSelector';

import colors from '@colors';
import styles from './styles';
import { useTabHome } from './hook/use-tab-home';
import Text from '@components/Text';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { setNRadius } from '@redux/slice/home-slice';
import { ActivityIndicator } from 'react-native';

const ACCURACY_OPTS = [
  { label: '🎯 Paling Mirip', value: 0.8, hint: 'Paling akurat' },
  { label: '⚖️ Seimbang', value: 0.65, hint: 'Disarankan' },
  { label: '🔍 Lebih Banyak', value: 0.5, hint: 'Tampilkan lebih banyak' },
];

const TabHomeComponent = () => {
  const { state } = useTabHome();
  const { loading } = state;
  const dispatch = useDispatch();
  const nRadius = useSelector((state: RootState) => state.home.nRadius);
  const feedCount = useSelector((state: RootState) => state.home.feedPhotos.length);
  const [filterVisible, setFilterVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setScreenshotPrevention(true);
      return () => setScreenshotPrevention(false);
    }, []),
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Sedang mencari foto yang sesuai...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.bg} barStyle="dark-content" />

      <Header onFilterPress={() => setFilterVisible(true)} photoCount={feedCount} />
      <UnitSelector />
      <PhotosList />

      {/* Sensitivity bottom sheet */}
      <Modal
        visible={filterVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}>
        <Pressable style={styles.sheetOverlay} onPress={() => setFilterVisible(false)}>
          <Pressable style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Sensitivitas Pencarian</Text>
            <Text style={styles.sheetSubtitle}>
              Sesuaikan tingkat kecocokan foto dengan wajahmu
            </Text>
            <View style={styles.sheetOptions}>
              {ACCURACY_OPTS.map(opt => {
                const active = nRadius === opt.value;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    activeOpacity={0.8}
                    onPress={() => {
                      dispatch(setNRadius(opt.value));
                      setFilterVisible(false);
                    }}
                    style={[styles.sheetOption, active && styles.sheetOptionActive]}>
                    <View style={styles.sheetOptionLeft}>
                      <Text style={[styles.sheetOptionLabel, active && styles.sheetOptionLabelActive]}>
                        {opt.label}
                      </Text>
                      <Text style={[styles.sheetOptionHint, active && styles.sheetOptionHintActive]}>
                        {opt.hint}
                      </Text>
                    </View>
                    {active && <View style={styles.sheetOptionDot} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <CalendarModal />
    </SafeAreaView>
  );
};

const TabHome = memo(TabHomeComponent);
export default TabHome;
