import { StyleSheet } from 'react-native';
import colors from '@colors';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  content: {
    paddingBottom: 12,
    
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  emptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: colors.textDim,
    textAlign: 'center',
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerLoaderInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    opacity: 0.3,
  },

  // skeleton
  skeletonRow: {
    flexDirection: 'row',
    gap: 2,
  },
  skeletonCell: {
    backgroundColor: colors.border,
  },
});

export default styles;
