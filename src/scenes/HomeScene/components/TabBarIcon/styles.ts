import colors from '@colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    height: 24,
    width: 18,
    resizeMode: 'contain',
  },
  indicator: {
    position: 'absolute',
    top: -12,
    width: 20,
    height: 1,
    backgroundColor: colors.blue['4'],
  },
  dotIndicator: {
    position: 'absolute',
    bottom: -7,
    width: 3,
    height: 3,
    borderRadius: 100,
    backgroundColor: colors.blue['4'],
  },
});

export default styles;
