import { StyleSheet } from 'react-native';
import colors from '@colors';

const styles = StyleSheet.create({
  loadingWrap: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 16,
  },
  // explicit height prevents horizontal FlatList from expanding vertically on Android
  list: {
    height: 50,
    flexGrow: 0,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    alignItems: 'center',
  },
  chip: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMid,
  },
  chipLabelActive: {
    color: colors.white,
  },
});

export default styles;
