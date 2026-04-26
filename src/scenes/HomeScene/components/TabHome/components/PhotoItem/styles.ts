import {getWindowWidth} from '@utils/index';
import {StyleSheet} from 'react-native';

const screenWidth = getWindowWidth();
const GAP = 5;
const CELL_WIDTH = (screenWidth - GAP) / 2;
const CELL_HEIGHT = CELL_WIDTH; // consistent 4:5 portrait ratio

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: GAP,
    gap: GAP,
  },

  cell: {
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    borderRadius: 14,
    
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',

    // softer modern shadow
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },

    elevation: 3,
    
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // bottom gradient overlay
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 8,
    paddingTop: 28,
    paddingBottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  
  overlayLocation: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },

  overlayPrice: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: 2,
  },

  // top-left label badge
  label: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  
  labelText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // top-right cart checkmark badge
  cartBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cartBadgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: 14,
  },
});

export default styles;
export {CELL_WIDTH, CELL_HEIGHT};
