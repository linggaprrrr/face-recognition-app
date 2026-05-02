import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  View,
  ViewToken,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { setScreenshotPrevention } from '@utils/screenshotPrevention';
import { Navigation } from '@navigations';
import icons from '@icons';
import Text from '@components/Text';
import PhotoCard from './components/PhotoCard';
import styles from './styles';

const { width, height } = Dimensions.get('window');
const TOP_BAR_HEIGHT = 54; // paddingTop(8) + button(38) + paddingBottom(8)
const INFO_CARD_HEIGHT = 280; // approximate fixed height of info card
// centre of photo area = midpoint of space between topBar and infoCard
const ARROW_TOP = TOP_BAR_HEIGHT + (height - TOP_BAR_HEIGHT - INFO_CARD_HEIGHT) / 2 - 18;

const PhotoDetailScene = (initialItem: Face.FaceSearchResult) => {
  const feedPhotos = useSelector((state: RootState) => state.home.feedPhotos);
  const cart = useSelector((state: RootState) => state.cart);

  const photos = feedPhotos.length > 0 ? feedPhotos : [initialItem];
  const initialIndex = Math.max(
    photos.findIndex(p => p.photo_id === initialItem.photo_id),
    0,
  );

  const flatListRef = useRef<FlatList>(null);
  const navigatingRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useFocusEffect(
    useCallback(() => {
      setScreenshotPrevention(true);
      return () => setScreenshotPrevention(false);
    }, []),
  );

  useEffect(() => {
    if (initialIndex > 0) {
      const t = setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: initialIndex, animated: false });
      }, 50);
      return () => clearTimeout(t);
    }
  }, []);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const goPrev = useCallback(() => {
    const next = Math.max(currentIndex - 1, 0);
    flatListRef.current?.scrollToIndex({ index: next, animated: true });
    setCurrentIndex(next);
  }, [currentIndex]);

  const goNext = useCallback(() => {
    const next = Math.min(currentIndex + 1, photos.length - 1);
    flatListRef.current?.scrollToIndex({ index: next, animated: true });
    setCurrentIndex(next);
  }, [currentIndex, photos.length]);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />

      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable style={styles.topBtn} onPress={() => Navigation.pop()} hitSlop={12}>
          <Image source={icons.chevronLeft} style={styles.topBtnIcon} />
        </Pressable>

        <View style={styles.pagerPill}>
          <Text style={styles.pagerText}>
            {currentIndex + 1} / {photos.length}
          </Text>
        </View>

        <Pressable
          style={styles.topBtn}
          hitSlop={12}
          onPress={() => {
            if (navigatingRef.current) return;
            navigatingRef.current = true;
            Navigation.cartScene();
            setTimeout(() => { navigatingRef.current = false; }, 600);
          }}>

          <Image source={icons.cart} style={styles.topBtnIcon} />
          {cart.items.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cart.items.length}</Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* Swipeable photos */}
      <FlatList
        ref={flatListRef}
        data={photos}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.photo_id}
        renderItem={({ item }) => <PhotoCard item={item} />}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig.current}
        getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
      />

      {/* Prev / Next arrow buttons — float over the photo area */}
      {photos.length > 1 && (
        <>
          {hasPrev && (
            <Pressable
              style={[styles.arrowBtn, styles.arrowLeft, { top: ARROW_TOP }]}
              onPress={goPrev}
              hitSlop={8}>
              <Image source={icons.chevronLeft} style={styles.arrowIcon} />
            </Pressable>
          )}
          {hasNext && (
            <Pressable
              style={[styles.arrowBtn, styles.arrowRight, { top: ARROW_TOP }]}
              onPress={goNext}
              hitSlop={8}>
              <Image source={icons.chevronRight} style={styles.arrowIcon} />
            </Pressable>
          )}
        </>
      )}

      {/* Dot indicator */}
      {photos.length > 1 && (
        <View style={styles.dots} pointerEvents="none">
          {photos.map((_, i) => (
            <View key={i} style={[styles.dot, i === currentIndex && styles.dotActive]} />
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

export default memo(PhotoDetailScene);
