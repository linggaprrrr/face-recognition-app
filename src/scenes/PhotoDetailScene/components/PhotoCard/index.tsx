import React, { memo, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import dayjs from 'dayjs';
import { formatToRupiah } from '@utils/index';
import Text from '@components/Text';
import icons from '@icons';
import styles from './styles';
import { usePhotoDetailScene } from '../../hooks/usePhotoDetailScene';
import Button from '@components/Button';
import colors from '@colors';

interface Props {
  item: Face.FaceSearchResult;
}

const { width } = Dimensions.get('window');

const PhotoCard = ({ item }: Props) => {
  const { state, methods } = usePhotoDetailScene(item);
  const { loading, isInCart, expirationStatus, purchasedDetail } = state;
  const { handlePhotoChoice, handleAddToCart, handleDownload } = methods;
  const [fullscreen, setFullscreen] = useState(false);

  const canChoose = !item.is_purchased && item.is_choosen === null;
  const isPurchased = purchasedDetail?.is_purchased ?? item.is_purchased;

  return (
    <View style={[styles.container, { width }]}>
      {/* Photo — cropped (cover), tap for fullscreen */}
      <Pressable style={styles.imageWrap} onPress={() => setFullscreen(true)}>
        <Image
          source={{ uri: item.compressed_path }}
          style={styles.image}
        />
        <View style={styles.fullscreenHint}>
          <Text style={styles.fullscreenHintText}>⤢ Lihat penuh</Text>
        </View>
      </Pressable>

      {/* Info card */}
      <View style={styles.infoCard}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <Text style={styles.filename} numberOfLines={2}>
            {item.original_filename}
          </Text>

          <View style={styles.metaRow}>
            <Image source={icons.mapPin} style={styles.metaIcon} />
            <Text style={styles.metaText}>{item.unit_name}</Text>
          </View>

          <View style={styles.metaRow}>
            <Image source={icons.calendar} style={styles.metaIcon} />
            <Text style={styles.metaText}>
              {dayjs(item.uploaded_at).format('DD MMM YYYY, HH:mm')}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <View>
              <Text style={styles.priceLabel}>Harga</Text>
              <Text style={styles.priceValue}>{formatToRupiah(item.photo_price)}</Text>
            </View>
            {isPurchased && (
              <View style={styles.purchasedBadge}>
                <Text style={styles.purchasedText}>Sudah dibeli</Text>
              </View>
            )}
          </View>

          {!item.is_purchased && expirationStatus ? (
            <View style={styles.expiryRow}>
              <Image source={icons.clockExpired} style={styles.metaIcon} />
              <Text style={styles.expiryText}>{expirationStatus}</Text>
            </View>
          ) : null}

          <View style={styles.actions}>
            {canChoose && (
              <>
                <Text style={styles.approvalQuestion}>Apakah ini kamu?</Text>
                <View style={styles.approvalRow}>
                  <Pressable
                    style={styles.approvalBtn}
                    onPress={() => handlePhotoChoice(false)}
                    disabled={loading}>
                    <Image source={icons.wrong} style={styles.approvalIcon} />
                    <Text style={styles.approvalBtnText}>Bukan</Text>
                  </Pressable>
                  <Pressable
                    style={styles.approvalBtn}
                    onPress={() => handlePhotoChoice(true)}
                    disabled={loading}>
                    <Image source={icons.check} style={styles.approvalIcon} />
                    <Text style={styles.approvalBtnText}>Iya</Text>
                  </Pressable>
                </View>
              </>
            )}

            {isPurchased ? (
              <Button
                onPress={handleDownload}
                label="Download Foto"
                icon={icons.download}
                loading={loading}
                containerStyle={styles.primaryBtn}
              />
            ) : (
              <Pressable
                style={[styles.cartBtn, isInCart && styles.cartBtnActive]}
                onPress={handleAddToCart}
                disabled={loading}>
                <Image
                  source={icons.cart}
                  style={[styles.cartBtnIcon, isInCart && styles.cartBtnIconActive]}
                />
                <Text style={[styles.cartBtnText, isInCart && styles.cartBtnTextActive]}>
                  {isInCart ? 'Hapus dari Keranjang' : 'Tambah ke Keranjang'}
                </Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
      </View>

      {/* Fullscreen modal */}
      <Modal
        visible={fullscreen}
        transparent
        animationType="fade"
        onRequestClose={() => setFullscreen(false)}
        statusBarTranslucent>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Pressable style={styles.fsOverlay} onPress={() => setFullscreen(false)}>
          <Image
            source={{ uri: item.compressed_path }}
            style={styles.fsImage}
            resizeMode="contain"
          />
          <View style={styles.fsCloseHint}>
            <Text style={styles.fsCloseText}>Tap untuk tutup</Text>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default memo(PhotoCard);
