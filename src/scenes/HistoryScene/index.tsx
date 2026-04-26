import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import { setScreenshotPrevention } from '@utils/screenshotPrevention';
import {
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from 'react-native';

import {useHistoryScene} from './hooks/useHistoryScene';
import TransactionItem from './components/TransactionItem';
import PhotoModal from './components/PhotoModal';
import styles from './styles';
import colors from '@colors';
import Text from '@components/Text';

interface HistorySceneProps {
  transactionId?: string;
}

function HistoryScene({transactionId}: HistorySceneProps) {
  const {state, methods} = useHistoryScene({transactionId});
  const {
    transactions,
    initialLoading,
    loadingMore,
    isListRefreshing,
    error,
    isPhotoModalVisible,
    selectedTransactionId,
  } = state;
  const {handleRefresh, handleLoadMore, handleItemPress, handleCloseModal} = methods;

  useFocusEffect(
    useCallback(() => {
      setScreenshotPrevention(true);
      return () => {
        setScreenshotPrevention(false);
      };
    }, []),
  );

  if (initialLoading && transactions.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor={colors.surface} barStyle="dark-content" />
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Riwayat Transaksi</Text>
        </View>
        <View style={styles.fullScreenLoader}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Memuat riwayat transaksi...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderEmptyComponent = () => {
    if (initialLoading || isListRefreshing) return null;
    const message = error
      ? 'Gagal memuat data. Tarik untuk menyegarkan.'
      : 'Belum ada transaksi.';
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{message}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.surface} barStyle="dark-content" />

      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Riwayat Transaksi</Text>
      </View>

      <FlatList
        data={transactions}
        renderItem={({item}) => (
          <TransactionItem item={item} onPress={handleItemPress} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.loadingText}>Memuat lebih banyak...</Text>
            </View>
          ) : null
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isListRefreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />

      <PhotoModal
        isVisible={isPhotoModalVisible}
        transaction_id={selectedTransactionId}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
}

export default HistoryScene;
