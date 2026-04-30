import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, Image, Pressable, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Navigation } from '@navigations';
import { RootState } from '@redux/store';
import Text from '@components/Text';
import styles, { CELL_WIDTH, CELL_HEIGHT } from './styles';

interface IPhotoItem {
  item: Face.IPhotos;
}

const ACCENT = '#FBA519';

const getLabelInfo = (score: number, isPurchased: boolean): { text: string; color: string } => {
  if (isPurchased) return { text: 'Sudah dibeli', color: '#464452' };
  if (score >= 0.72) return { text: 'Paling Mirip', color: '#477e5c' };
  if (score >= 0.60) return { text: 'Mirip', color: '#D97706' };
  return { text: 'Mungkin Saya', color: '#DC2626' };
};

const formatPrice = (price: number) =>
  `Rp ${price.toLocaleString('id-ID')}`;

interface BBLayout {
  left: number;
  top: number;
  width: number;
  height: number;
}

// Cache image sizes to avoid redundant network calls
const imageSizeCache = new Map<string, { width: number; height: number }>();

const computeLayout = (
  imgW: number,
  imgH: number,
  bb: Face.BoundingBox,
): BBLayout => {
  // cover scale: fill the cell while maintaining aspect ratio
  const scale = Math.max(CELL_WIDTH / imgW, CELL_HEIGHT / imgH);
  const offsetX = (imgW * scale - CELL_WIDTH) / 2;
  const offsetY = (imgH * scale - CELL_HEIGHT) / 2;

  return {
    left: bb.x * scale - offsetX,
    top: bb.y * scale - offsetY,
    width: bb.w * scale,
    height: bb.h * scale,
  };
};

const useBBLayout = (uri: string, bb: Face.BoundingBox): BBLayout | null => {
  const [layout, setLayout] = useState<BBLayout | null>(() => {
    const cached = imageSizeCache.get(uri);
    return cached ? computeLayout(cached.width, cached.height, bb) : null;
  });

  useEffect(() => {
    if (layout) return;
    Image.getSize(uri, (w, h) => {
      imageSizeCache.set(uri, { width: w, height: h });
      setLayout(computeLayout(w, h, bb));
    });
  }, [uri]);

  return layout;
};

// Corner accent piece used at each corner of the bounding box
const Corner = memo(
  ({
    top, bottom, left, right,
  }: {
    top?: number; bottom?: number; left?: number; right?: number;
  }) => (
    <View
      style={{
        position: 'absolute',
        top,
        bottom,
        left,
        right,
        width: 14,
        height: 14,
        borderColor: ACCENT,
        borderTopWidth: top !== undefined ? 2.5 : 0,
        borderBottomWidth: bottom !== undefined ? 2.5 : 0,
        borderLeftWidth: left !== undefined ? 2.5 : 0,
        borderRightWidth: right !== undefined ? 2.5 : 0,
      }}
    />
  ),
);

const ScanBox = memo(({ layout }: { layout: BBLayout }) => {
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(scanAnim, {
        toValue: 1,
        duration: 1400,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    // sweep from above the box to below it
    outputRange: [-layout.height * 0.5, layout.height * 0.9],
  });

  return (
    <View
      style={{
        position: 'absolute',
        left: layout.left,
        top: layout.top,
        width: layout.width,
        height: layout.height,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: `${ACCENT}99`,
        overflow: 'hidden',
        // Glow
        shadowColor: ACCENT,
        shadowOpacity: 0.6,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 0 },
      }}
    >
      {/* Corner accents */}
      <Corner top={-1} left={-1} />
      <Corner top={-1} right={-1} />
      <Corner bottom={-1} left={-1} />
      <Corner bottom={-1} right={-1} />

      {/* Scan sweep — three layered views simulate a gradient band */}
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: layout.height * 0.55,
          transform: [{ translateY }],
        }}
      >
        {/* top fade */}
        <View style={{ flex: 1, backgroundColor: 'transparent' }} />
        {/* amber core */}
        <View
          style={{
            height: layout.height * 0.18,
            backgroundColor: `${ACCENT}55`,
          }}
        />
        {/* bottom fade */}
        <View style={{ flex: 1, backgroundColor: 'transparent' }} />
      </Animated.View>
    </View>
  );
});

const BoundingBoxOverlay = memo(({ image }: { image: Face.FaceSearchResult }) => {
  const bb = image.bounding_box_db;
  if (!bb) return null;

  const layout = useBBLayout(image.compressed_path, bb);
  if (!layout) return null;

  // Skip if box is entirely outside the visible cell
  if (
    layout.left + layout.width < 0 ||
    layout.left > CELL_WIDTH ||
    layout.top + layout.height < 0 ||
    layout.top > CELL_HEIGHT
  ) {
    return null;
  }

  return <ScanBox layout={layout} />;
});

const PhotoCell = memo(({ image }: { image: Face.FaceSearchResult }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const inCart = cartItems.some(item => item.photo_id === image.photo_id);
  const label = getLabelInfo(image.score, image.is_purchased);

  return (
    <Pressable onPress={() => Navigation.photoDetailScene(image)}>
      <View style={styles.cell}>
        <Image source={{ uri: image.compressed_path }} style={styles.image} />

        {/* Bounding box scanner overlay */}
        <BoundingBoxOverlay image={image} />

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
