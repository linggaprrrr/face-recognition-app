import {StyleSheet} from 'react-native';
import colors from '@colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    paddingBottom: 40,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: 16,
    marginTop: 16,
    overflow: 'hidden',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textDim,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 66,
  },
  logoutBtn: {
    marginHorizontal: 16,
    marginTop: 20,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.error,
    backgroundColor: colors.errorDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.error,
  },
  // layout
  content: {flex: 1},
  sectionButtons: {gap: 0},
});

export default styles;
