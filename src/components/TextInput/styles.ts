import {StyleSheet} from 'react-native';
import colors from '@colors';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 0.1,
  },
  subLabel: {
    color: colors.textMid,
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 6,
  },
  input: {
    height: 50,
    width: '100%',
    color: colors.text,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface2,
    fontSize: 15,
  },
  inputTextArea: {
    height: 115,
    width: '100%',
    color: colors.text,
    padding: 12,
    paddingLeft: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface2,
    textAlignVertical: 'top',
    fontSize: 15,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  rightIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});

export default styles;
