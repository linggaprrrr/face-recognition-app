import {StyleSheet} from 'react-native';
import colors from '@colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginRight: 12,
    gap: 3,
  },
  transactionIdText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  dateText: {
    fontSize: 12,
    color: colors.textDim,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 4,
  },
  statusPaymentContainer: {
    alignItems: 'flex-end',
    gap: 6,
  },
  photoCountText: {
    fontSize: 13,
    color: colors.textMid,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    minWidth: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statusPending: {
    backgroundColor: colors.amberDim,
  },
  statusPaid: {
    backgroundColor: colors.successDim,
  },
  statusSuccess: {
    backgroundColor: colors.successDim,
  },
  statusFailed: {
    backgroundColor: colors.errorDim,
  },
  statusCancelled: {
    backgroundColor: colors.border,
  },
  statusDefault: {
    backgroundColor: colors.border,
  },
});
