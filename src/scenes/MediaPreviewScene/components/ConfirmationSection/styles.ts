import colors from '@colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontWeight: '700',
    fontSize: 17,
    textAlign: 'center',
    color: colors.text,
    marginBottom: 8,
  },
  subTitle: {
    fontWeight: '400',
    fontSize: 13,
    textAlign: 'center',
    color: colors.textMid,
    lineHeight: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
    gap: 12,
  },
  button: {
    flex: 1,
    height: 48,
    borderWidth: 0,
    borderRadius: 14,
  },
});

export default styles;
