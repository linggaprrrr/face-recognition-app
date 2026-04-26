import colors from '@colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    borderRadius: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
    color: colors.black,
  },
  buttonSelect: {
    flex: 0,
    marginTop: 32,
    marginHorizontal: 16,
  },
});

export default styles;
