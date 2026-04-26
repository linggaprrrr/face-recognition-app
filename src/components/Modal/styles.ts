import {StyleSheet} from 'react-native';
import { getWindowWidth } from '@utils/index';
import colors from '@colors';

const width = getWindowWidth();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    backgroundColor: colors.white,
    width,
    overflow: 'hidden',
  },
});

export default styles;
