import colors from '@colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  icon: {
    alignSelf: 'center',
    marginTop: 48,
    width: 59,
    height: 59,
  },
  title: {
    marginTop: 56,
    fontSize: 36,
    fontWeight: '700',
    color: colors.gray['1'],
    textAlign: 'center',
  },
  description: {
    marginTop: 32,
    fontSize: 24,
    fontWeight: '400',
    color: colors.gray['1'],
    textAlign: 'center',
  },
  button: {
    flex: 0,
    marginHorizontal: 32,
    marginBottom: 48,
  },
});

export default styles;
