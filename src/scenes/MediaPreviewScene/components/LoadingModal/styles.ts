import colors from '@colors';
import { getWindowWidth } from '@utils/index';
import {StyleSheet} from 'react-native';

const width = getWindowWidth();

const styles = StyleSheet.create({
  contentStyle: {
    padding: 16,
    width: width - 32,
    borderRadius: 16,
  },
  container: {
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: '600',
    color: colors.gray['1'],
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '400',
    color: colors.gray['1'],
  },
});

export default styles;
