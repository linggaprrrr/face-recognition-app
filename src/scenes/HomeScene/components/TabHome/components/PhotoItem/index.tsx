import React, { memo } from 'react';
import { Image, Pressable, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Navigation } from '@navigations';
import { RootState } from '@redux/store';
import Text from '@components/Text';
import styles from './styles';

interface IPhotoItem {
  item: Face.IPhotos;
}

const getLabelInfo = (score: number): { text: string; color: string } => {
  if (score >= 0.8) return { text: 'Paling Mirip', color: '#477e5c' };
  if (score >= 0.65) return { text: 'Mirip', color: '#D97706' };
  return { text: 'Mungkin Saya', color: '#DC2626' };
};

const formatPrice = (price: number) =>
  `Rp ${price.toLocaleString('id-ID')}`;

const PhotoCell = memo(({ image }: { image: Face.FaceSearchResult }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const inCart = cartItems.some(item => item.photo_id === image.photo_id);
  const label = getLabelInfo(image.score);

  return (
    <Pressable onPress={() => Navigation.photoDetailScene(image)}>
      <View style={styles.cell}>
        <Image source={{ uri: image.compressed_path }} style={styles.image} />

        {/* Bottom info overlay */}
        <View style={styles.overlay}>
          {!!image.unit_name && (
            <Text style={styles.overlayLocation} numberOfLines={1}>
              {image.unit_name}
            </Text>
          )}
          {image.photo_price > 0 && (
            <Text style={styles.overlayPrice}>
              {formatPrice(image.photo_price)}
            </Text>
          )}
        </View>

        {/* Similarity label badge */}
        <View style={[styles.label, { backgroundColor: label.color }]}>
          <Text style={styles.labelText}>{label.text}</Text>
        </View>

        {/* Cart checkmark */}
        {inCart && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>✓</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
});

const PhotoItemComponent = ({ item }: IPhotoItem) => (
  <View style={styles.container}>
    {item.data.map(image => (
      <PhotoCell key={image.photo_id || image.compressed_path} image={image} />
    ))}
  </View>
);

export default memo(PhotoItemComponent);
