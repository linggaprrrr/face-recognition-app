import colors from '@colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  content: {
    padding: 16,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  inputStyle: {
    marginBottom: 16,
  },
  button: {
    marginTop: 25,
  },
  editAvatar: {
    position: 'absolute',
    bottom: 8,
    right: -7,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray['9'],
    backgroundColor: colors.white,
  },
  pencil: {
    width: 10,
    height: 10,
  },
});

export default styles;
