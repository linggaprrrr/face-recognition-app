import { StyleSheet, Dimensions } from 'react-native';
import colors from '@colors';

const { width: screenWidth } = Dimensions.get('window');
const PHOTO_SIZE = (screenWidth - 52) / 2;

export default StyleSheet.create({
  fullScreenModalContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // ─── Header ──────────────────────────────────────────────────
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textMid,
    lineHeight: 18,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.2,
  },
  headerPlaceholder: {
    width: 36,
  },

  // ─── Inline toast ─────────────────────────────────────────────
  inlineToast: {
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 2,
  },
  inlineToastSuccess: {
    backgroundColor: colors.successDim,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  inlineToastError: {
    backgroundColor: colors.errorDim,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  inlineToastTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  inlineToastSubtitle: {
    fontSize: 12,
    color: colors.textMid,
  },

  // ─── Transaction info card ────────────────────────────────────
  transactionInfoContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 4,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 13,
    color: colors.textMid,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    overflow: 'hidden',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statusPaid: {
    backgroundColor: colors.successDim,
  },
  statusPaidText: {
    color: colors.success,
  },
  statusPending: {
    backgroundColor: colors.amberDim,
  },
  statusPendingText: {
    color: colors.amber,
  },
  statusExpired: {
    backgroundColor: colors.errorDim,
  },
  statusExpiredText: {
    color: colors.error,
  },
  statusFailed: {
    backgroundColor: colors.errorDim,
  },
  statusFailedText: {
    color: colors.error,
  },
  statusCancelled: {
    backgroundColor: colors.border,
  },
  statusCancelledText: {
    color: colors.textMid,
  },
  statusSuccess: {
    backgroundColor: colors.successDim,
  },
  statusSuccessText: {
    color: colors.success,
  },


  // ─── Content / photo grid ─────────────────────────────────────
  contentContainer: {
    flex: 1,
  },
  photoList: {
    paddingHorizontal: 16,
  },
  listContentContainer: {
    paddingTop: 12,
    paddingBottom: 16,
  },
  photoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  photoItemContainer: {
    width: PHOTO_SIZE,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  photoImage: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
  },
  photoFooter: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  photoFilename: {
    fontSize: 11,
    color: colors.textMid,
    flex: 1,
  },
  photoDownloadBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.primaryDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoDownloadIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: colors.primary,
  },

  // ─── Empty / loading ──────────────────────────────────────────
  centeredMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: 32,
  },
  noPhotosText: {
    fontSize: 15,
    color: colors.textMid,
    textAlign: 'center',
  },

  // ─── Bottom action bar ────────────────────────────────────────
  bottomBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bottomBarPaid: {
    flexDirection: 'row',
    gap: 10,
  },
  bottomBarPending: {
    flexDirection: 'row',
    gap: 10,
  },
  downloadAllButton: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  actionButton: {
    flex: 1,
    borderRadius: 14,
    height: 52,
  },
  cancelButton: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.error,
  },
});
