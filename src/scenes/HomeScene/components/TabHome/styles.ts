import { StyleSheet } from 'react-native';
import colors from '@colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg,
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: colors.textMid,
  },

  // Bottom sheet overlay + card
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  sheetSubtitle: {
    fontSize: 13,
    color: colors.textMid,
    marginBottom: 20,
    lineHeight: 18,
  },
  sheetOptions: {
    gap: 10,
  },
  sheetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface2,
  },
  sheetOptionActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryDim,
  },
  sheetOptionLeft: {
    gap: 2,
  },
  sheetOptionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  sheetOptionLabelActive: {
    color: colors.primary,
  },
  sheetOptionHint: {
    fontSize: 12,
    color: colors.textDim,
  },
  sheetOptionHintActive: {
    color: colors.primary,
  },
  sheetOptionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});

export default styles;
