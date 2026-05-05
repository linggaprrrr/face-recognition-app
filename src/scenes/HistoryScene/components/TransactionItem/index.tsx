import React from 'react';
import {View, TouchableOpacity, ViewStyle} from 'react-native';
import Text from '@components/Text';
import styles from './styles';
import dayjs from 'dayjs';
import colors from '@colors';

interface TransactionItemProps {
  item: Transaction.TransactionHistoryEntry;
  onPress: (item: Transaction.TransactionHistoryEntry) => void;
}

const STATUS_COLOR: Record<string, string> = {
  paid: colors.success,
  success: colors.success,
  failed: colors.error,
  cancelled: colors.textDim,
  pending: colors.amber,
};

const TransactionItem: React.FC<TransactionItemProps> = ({item, onPress}) => {
  const formattedDate = item.created_at
    ? dayjs(item.created_at).format('DD MMM YYYY, HH:mm')
    : 'Tanggal tidak tersedia';

  const statusText = item.status.charAt(0).toUpperCase() + item.status.slice(1);
  const photoCount = item.photos.length;

  const styleKey = `status${statusText}` as keyof typeof styles;
  const badgeStyle = styleKey in styles
    ? (styles[styleKey] as ViewStyle)
    : (styles.statusDefault as ViewStyle);

  const statusColor = STATUS_COLOR[item.status.toLowerCase()] ?? colors.textDim;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(item)}
      activeOpacity={0.75}>
      <View style={styles.infoContainer}>
        <Text style={styles.transactionIdText}>{item.trx_code}</Text>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <View style={styles.discountRow}>
          <Text style={styles.discountLabel}>Potongan</Text>
          <Text style={[styles.discountAmount, item.discount_amount > 0 && styles.discountAmountActive]}>
            {item.discount_amount > 0
              ? `- Rp ${item.discount_amount.toLocaleString('id-ID')}`
              : 'Rp 0'}
          </Text>
        </View>
        <Text style={styles.priceText}>
          Rp {item.final_price.toLocaleString('id-ID')}
        </Text>
      </View>
      <View style={styles.statusPaymentContainer}>
        <Text style={styles.photoCountText}>{photoCount} foto</Text>
        <View style={[styles.statusBadge, badgeStyle]}>
          <Text style={[styles.statusText, {color: statusColor}]}>{statusText}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(TransactionItem);
