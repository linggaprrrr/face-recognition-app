import {StyleSheet} from 'react-native';
import colors from '@colors';

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 32,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.rgb['15'],
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  handle: {
    marginTop: 8,
    alignSelf: 'center',
    height: 3,
    width: 60,
    borderRadius: 100,
    backgroundColor: colors.whiteSmoke,
  },
});

export default styles;
