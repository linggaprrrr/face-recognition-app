import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  enabledColor: {
    backgroundColor: colors.primary,
  },
  disabledColor: {
    backgroundColor: colors.textDim,
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
});

export default styles;
