import colors from '@colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderColor: colors.gray[8],
    borderWidth: 1,
    flex: 1,
    height: 40
  },
  input: {
    height: 40,
    fontSize: 14,
    paddingLeft: 35,
    color: colors.black,
  },
  icon: {
    position: "absolute",
    left: 10,
    height: 20,
    width: 20,
  },
});

export default styles;