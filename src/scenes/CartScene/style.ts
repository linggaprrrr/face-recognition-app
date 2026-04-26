import {StyleSheet} from 'react-native';
import colors from '@colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  // ─── Header ────────────────────────────────────────────────
  pageHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
  },
  pageSubtitle: {
    fontSize: 13,
    color: colors.textMid,
    marginTop: 2,
  },
  // ─── Controls ──────────────────────────────────────────────
  headerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectAllCheckbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.border,
  },
  selectAllText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  deleteText: {
    fontSize: 14,
    color: colors.error,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMid,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  // ─── List ──────────────────────────────────────────────────
  loadingIndicator: {
    marginTop: 40,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 120,
  },
  emptyList: {
    alignItems: 'center',
    paddingTop: 80,
    gap: 8,
  },
  emptyText: {
    fontSize: 15,
    color: colors.textDim,
  },
  // ─── Item ──────────────────────────────────────────────────
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.border,
    flexShrink: 0,
  },
  image: {
    width: 64,
    height: 80,
    borderRadius: 10,
    flexShrink: 0,
  },
  itemTextWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 70,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  itemSubtitle: {
    fontSize: 12,
    color: colors.textMid,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 4,
  },
  // ─── Bottom bar ────────────────────────────────────────────
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 28,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalInfo: {
    flexDirection: 'column',
    gap: 2,
  },
  totalLabel: {
    fontSize: 12,
    color: colors.textMid,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  downloadButtonWrapper: {
    height: 48,
  },
  downloadButton: {
    width: 140,
    borderRadius: 12,
    height: 48,
  },
});

export default styles;
