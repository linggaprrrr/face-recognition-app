import colors from '@colors';
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const PHOTO_WIDTH = (width - 4) / 2;
const PHOTO_HEIGHT = height * 0.72;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  photoRow: {
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 0,
  },
  photoWrap: {
    position: 'relative',
    overflow: 'hidden',
  },
  previewImage: {
    width: PHOTO_WIDTH,
    height: PHOTO_HEIGHT,
    resizeMode: 'cover',
  },
  photoLabel: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  photoLabelPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  photoLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
    letterSpacing: 0.2,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.50)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },

  // legacy aliases kept for ConfirmationSection & LoadingModal which are separate files
  buttonClose: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.50)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewRow: {
    flexDirection: 'row',
    gap: 4,
  },
  wrapperDescription: {
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    bottom: PHOTO_HEIGHT - PHOTO_HEIGHT + 12,
    justifyContent: 'space-around',
  },
  wrapperText: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 20,
  },
  descriptionText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default styles;
