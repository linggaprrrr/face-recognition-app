import {StyleSheet} from 'react-native';
import colors from '@colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  leftContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leftIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primaryDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    flexShrink: 0,
  },
  leftIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: colors.primary,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
  },
  chevron: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: colors.textDim,
  },
  // legacy
  shadowBox: {},
});

export default styles;
