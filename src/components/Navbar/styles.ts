import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    height: 60,
    paddingHorizontal: 16,
  },
  leftButton: {
    paddingRight: 12,
  },
  rightButton: {
    paddingHorizontal: 16,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  arrowLeftIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  arrowLeftRoundIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
});

export default styles;
