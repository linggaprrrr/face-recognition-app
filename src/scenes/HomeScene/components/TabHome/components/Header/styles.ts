import {StyleSheet} from 'react-native';
import colors from '@colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMid,
    marginTop: 2,
  },
  sideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  iconBtn: {
    position: 'relative',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cartIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: colors.text,
  },
  badge: {
    position: 'absolute',
    top: -1,
    right: -1,
    minWidth: 20,
    height: 20,
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 1,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },

  faceIdIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: colors.primary,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: colors.primaryDim,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  filterBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },

  // sensitivity pill button
  sensitivityPill: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: colors.primaryDim,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sensitivityPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
});

export default styles;
