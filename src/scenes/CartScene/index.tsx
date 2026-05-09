import colors from '@colors';
import React, {JSX} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {setScreenshotPrevention} from '@utils/screenshotPrevention';
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Image,
  StatusBar,
} from 'react-native';
import useCartScene from './hook/useCartScene';
import styles from './style';
import Button from '@components/Button';
import Text from '@components/Text';

const CartScene: React.FC = () => {
  const {state, method} = useCartScene();
  const {transactions, isLoading, isApplyingPromo, isRefreshing, selectedIds, promoCode, appliedPromo} = state;
  const {toggleSelect, toggleSelectAll, deleteSelected, onRefreshList, handleDownload, setPromoCode, applyPromoCode} = method;

  const isAllSelected = selectedIds.size === transactions.length && selectedIds.size > 0;

  const subtotal = transactions
    .filter(t => selectedIds.has(t.photo_id))
    .reduce((sum, t) => sum + (t.photo_price ?? 0), 0);

  const discountAmount = appliedPromo?.discount_amount ?? 0;
  const totalPrice = Math.max(0, subtotal - discountAmount);

  useFocusEffect(
    useCallback(() => {
      setScreenshotPrevention(true);
      return () => {
        setScreenshotPrevention(false);
      };
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.surface} barStyle="dark-content" />

      {/* Header */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Keranjang</Text>
        <Text style={styles.pageSubtitle}>{transactions.length} foto dipilih</Text>
      </View>

      {/* Controls */}
      <View style={styles.headerControls}>
        <TouchableOpacity
          onPress={toggleSelectAll}
          style={styles.selectAllContainer}>
          <View
            style={[
              styles.selectAllCheckbox,
              {backgroundColor: isAllSelected ? colors.primary : 'transparent'},
            ]}
          />
          <Text style={styles.selectAllText}>Pilih Semua</Text>
        </TouchableOpacity>

        {selectedIds.size > 0 && (
          <TouchableOpacity onPress={deleteSelected}>
            <Text style={styles.deleteText}>Hapus Terpilih</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.sectionTitle}>Foto Saya</Text>

      {isLoading && transactions.length === 0 ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loadingIndicator}
        />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={item => item.photo_id}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View />}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefreshList}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={
            !isLoading ? (
              <View style={styles.emptyList}>
                <Text style={styles.emptyText}>Keranjang kosong</Text>
                <Text style={{fontSize: 13, color: colors.textDim}}>
                  Pilih foto dari beranda
                </Text>
              </View>
            ) : null
          }
          renderItem={({item}) => (
            <CartItemRow
              item={item}
              isSelected={selectedIds.has(item.photo_id)}
              onToggle={() => toggleSelect(item.photo_id)}
            />
          )}
        />
      )}

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        {/* Promo code */}
        <View style={styles.promoRow}>
          <TextInput
            style={styles.promoInput}
            placeholder="Kode promo"
            placeholderTextColor={colors.textDim}
            value={promoCode}
            onChangeText={setPromoCode}
            autoCapitalize="characters"
          />
          <TouchableOpacity
            style={[styles.promoButton, isApplyingPromo && styles.promoButtonDisabled]}
            onPress={applyPromoCode}
            disabled={isApplyingPromo}>
            {isApplyingPromo ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.promoButtonText}>Pakai</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Summary */}
        <View style={styles.summaryRow}>
          <View>
            <Text style={styles.summaryLabel}>Potongan</Text>
            {appliedPromo && (
              <Text style={styles.discountDescription}>
                {appliedPromo.discount_type === 'percentage'
                  ? `Potongan ${appliedPromo.discount_value}%`
                  : `Potongan Rp. ${appliedPromo.discount_value.toLocaleString('id-ID')}`}
              </Text>
            )}
          </View>
          <Text style={[styles.summaryValue, discountAmount > 0 && styles.discountValue]}>
            {discountAmount > 0 ? `- Rp ${discountAmount.toLocaleString('id-ID')}` : 'Rp 0'}
          </Text>
        </View>

        {/* Total + checkout */}
        <View style={styles.totalRow}>
          <View style={styles.totalInfo}>
            <Text style={styles.totalLabel}>Total ({selectedIds.size} foto)</Text>
            <Text style={styles.totalAmount}>
              Rp {totalPrice.toLocaleString('id-ID')}
            </Text>
          </View>
          <View style={styles.downloadButtonWrapper}>
            <Button
              onPress={handleDownload}
              label="Checkout →"
              labelColor={colors.white}
              isDisabled={selectedIds.size === 0}
              containerStyle={styles.downloadButton}
              loading={isLoading}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScene;

// ─── Cart Item Row ──────────────────────────────────────────────
type CartItemProps = {
  item: CartItem;
  isSelected: boolean;
  onToggle: () => void;
};

const CartItemRow: React.FC<CartItemProps> = ({item, isSelected, onToggle}) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.itemContainer} activeOpacity={0.8}>
      <View
        style={[
          styles.checkbox,
          {
            backgroundColor: isSelected ? colors.primary : 'transparent',
            borderColor: isSelected ? colors.primary : colors.border,
          },
        ]}
      />
      <Image
        source={{uri: item.compressed_path}}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.itemTextWrapper}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.original_filename}
        </Text>
        <Text style={styles.itemSubtitle}>{item.unit_name}</Text>
        <Text style={styles.itemPrice}>
          Rp {(item.photo_price ?? 0).toLocaleString('id-ID')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
