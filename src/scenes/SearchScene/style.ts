import colors from '@colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexDirection: "column",
    paddingHorizontal: 10,
    flex: 1,
  },
  searchWrapper: {
    height: 40,
  },
  loadingText: {
    color: colors.black,
    marginTop: 10,
  },
  list: {
    marginTop: 10,
  },
  separator: {
    height: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
    borderColor: colors.gray[8],
    gap: 10,
  },
  itemIcon: {
    height: 40,
    width: 40,
  },
  itemTextContainer: {
    flexDirection: "column",
    flex: 1,
  },
  itemName: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "600",
  },
  itemLocation: {
    color: colors.black,
    fontSize: 12,
  },
});

export default styles;