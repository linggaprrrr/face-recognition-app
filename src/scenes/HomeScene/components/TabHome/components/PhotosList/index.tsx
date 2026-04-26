import React, { memo, useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  FlatList,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { setScreenshotPrevention } from '@utils/screenshotPrevention';

import PhotoItem from '../PhotoItem';
import { usePhotosList } from './hooks/usePhotosList';
import styles from './styles';
import Text from '@components/Text';
import colors from '@colors';
import { CELL_WIDTH, CELL_HEIGHT } from '../PhotoItem/styles';

interface IItem {
  item: Face.IPhotos;
  index: number;
}

const GAP = 5;
const SKELETON_ROWS = 5;

const SkeletonCell = memo(() => {
  const opacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.35, duration: 800, useNativeDriver: true }),
      ]),
    ).start();
    return () => opacity.stopAnimation();
  }, [opacity]);

  return (
    <Animated.View
      style={[styles.skeletonCell, { width: CELL_WIDTH, height: CELL_HEIGHT, opacity }]}
    />
  );
});

const SkeletonGrid = memo(() => (
  <ScrollView scrollEnabled={false} style={styles.list}>
    {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
      <View key={i} style={[styles.skeletonRow, { marginBottom: GAP }]}>
        <SkeletonCell />
        <SkeletonCell />
      </View>
    ))}
  </ScrollView>
));

const PhotosList = () => {
  const { state, method } = usePhotosList();
  const { groupedPhotos, isLoading, isRefreshing, data } = state;
  const { setPage, onRefresh } = method;

  const renderItem = useCallback(({ item, index }: IItem) => (
    <PhotoItem key={index} item={item} />
  ), []);

  const handleLoadMore = () => {
    if (!isLoading && !isRefreshing && data && data.page < data.total_pages) {
      setPage(prev => prev + 1);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setScreenshotPrevention(true);
      return () => setScreenshotPrevention(false);
    }, []),
  );

  if (isLoading && groupedPhotos.length === 0) {
    return <SkeletonGrid />;
  }

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={
        groupedPhotos.length === 0 ? styles.emptyContent : styles.content
      }
      data={groupedPhotos}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.2}
      ListFooterComponent={
        isLoading ? (
          <View style={styles.footerLoader}>
            <Text style={{ color: colors.textDim, fontSize: 13 }}>Memuat lebih...</Text>
          </View>
        ) : null
      }
      ListEmptyComponent={
        !isLoading && !isRefreshing ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tidak ada foto ditemukan</Text>
          </View>
        ) : null
      }
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  );
};

export default PhotosList;
