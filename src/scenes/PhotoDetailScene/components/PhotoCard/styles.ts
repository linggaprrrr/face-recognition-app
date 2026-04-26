import { Dimensions, StyleSheet } from 'react-native';
import colors from '@colors';

const { width, height } = Dimensions.get('window');
const IMAGE_HEIGHT = height * 0.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    backgroundColor: '#0A0A0A',
  },

  // Cropped preview (cover)
  imageWrap: {
    width,
    height: IMAGE_HEIGHT,
    backgroundColor: '#0A0A0A',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  fullscreenHint: {
    position: 'absolute',
    bottom: 30,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 12,
  },
  fullscreenHintText: {
    fontSize: 11,
    color: colors.white,
    fontWeight: '600',
  },

  // Info card
  infoCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  filename: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 5,
  },
  metaIcon: {
    width: 13,
    height: 13,
    tintColor: colors.textMid,
    resizeMode: 'contain',
  },
  metaText: {
    fontSize: 12,
    color: colors.textMid,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  priceLabel: {
    fontSize: 11,
    color: colors.textDim,
    fontWeight: '500',
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
  },
  purchasedBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: colors.successDim,
    borderRadius: 20,
  },
  purchasedText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.success,
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  expiryText: {
    fontSize: 12,
    color: colors.amber,
  },
  approvalQuestion: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  approvalRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  approvalBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface2,
  },
  approvalIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  approvalBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  actions: {
    marginTop: 2,
  },
  primaryBtn: {
    borderRadius: 12,
    height: 46,
  },
  cartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 46,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.primaryDim,
  },
  cartBtnActive: {
    backgroundColor: colors.primary,
  },
  cartBtnIcon: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
    tintColor: colors.primary,
  },
  cartBtnIconActive: {
    tintColor: colors.white,
  },
  cartBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  cartBtnTextActive: {
    color: colors.white,
  },

  // Fullscreen modal
  fsOverlay: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fsImage: {
    width,
    height,
  },
  fsCloseHint: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
  },
  fsCloseText: {
    fontSize: 13,
    color: colors.white,
    fontWeight: '600',
  },
});

export default styles;
