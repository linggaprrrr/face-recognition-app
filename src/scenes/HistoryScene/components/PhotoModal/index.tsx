import React, { useState, useRef } from "react";
import {
  ActivityIndicator,
  Modal,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import icons from "@icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "@components/Text";
import styles from "./styles";
import colors from "@colors";
import { Navigation } from "@navigations";
import Button from "@components/Button";
import dayjs from "dayjs";
import { useTransactionDetail } from "./hooks/use-transaction-detail";

type TransactionHistoryPhoto = Transaction.TransactionHistoryPhoto;

interface PhotoModalProps {
  isVisible: boolean;
  transaction_id: string | undefined;
  onClose: () => void;
}

interface InlineToast {
  type: "success" | "error";
  text1: string;
  text2: string;
}

const STATUS_LABEL: Record<string, string> = {
  paid: "Lunas",
  pending: "Menunggu",
  expired: "Kedaluwarsa",
  failed: "Gagal",
  cancelled: "Dibatalkan",
  success: "Sukses",
};

const STATUS_BADGE_STYLE: Record<string, { badge: object; text: object }> = {
  paid:      { badge: styles.statusPaid,      text: styles.statusPaidText },
  pending:   { badge: styles.statusPending,   text: styles.statusPendingText },
  expired:   { badge: styles.statusExpired,   text: styles.statusExpiredText },
  failed:    { badge: styles.statusFailed,    text: styles.statusFailedText },
  cancelled: { badge: styles.statusCancelled, text: styles.statusCancelledText },
  success:   { badge: styles.statusSuccess,   text: styles.statusSuccessText },
};

const PhotoModal: React.FC<PhotoModalProps> = ({
  isVisible,
  transaction_id,
  onClose,
}) => {
  const { state, methods } = useTransactionDetail({ transaction_id, onClose });
  const { transactionDetail, isLoading, error, isDownloading, isCancelling } = state;
  const { handleRefresh, handleCancel } = methods;

  const [toast, setToast] = useState<InlineToast | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (t: InlineToast) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(t);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  };

  const transactionData = transactionDetail;
  const photos = transactionData?.photos;
  const status = transactionData?.status ?? "";
  const isPaid = status === "paid" || status === "success" || status === "completed";

  const handleDownloadAll = async () => {
    if (!photos || photos.length === 0) return;
    const success = await methods.handleDownload(photos);
    showToast({
      type: success ? "success" : "error",
      text1: success ? "Unduhan Selesai" : "Unduhan Gagal",
      text2: success
        ? `${photos.length} foto berhasil disimpan ke perangkat.`
        : "Periksa koneksi internet dan coba lagi.",
    });
  };

  if (!isVisible) return null;

  const badgeStyles = STATUS_BADGE_STYLE[status.toLowerCase()] ?? STATUS_BADGE_STYLE.cancelled;
  const statusLabel = STATUS_LABEL[status.toLowerCase()] ?? status;

  const photoRows: TransactionHistoryPhoto[][] = [];
  if (photos) {
    for (let i = 0; i < photos.length; i += 2) {
      photoRows.push(photos.slice(i, i + 2));
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.fullScreenModalContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerPlaceholder} />
          <Text style={styles.modalTitle}>Detail Transaksi</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Inline toast */}
        {toast && (
          <View style={[styles.inlineToast, toast.type === "success" ? styles.inlineToastSuccess : styles.inlineToastError]}>
            <Text style={styles.inlineToastTitle}>{toast.text1}</Text>
            <Text style={styles.inlineToastSubtitle}>{toast.text2}</Text>
          </View>
        )}

        {/* Transaction info card */}
        {transactionData && (
          <View style={styles.transactionInfoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>ID Transaksi</Text>
              <Text style={styles.infoValue}>{transactionData.trx_code}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tanggal</Text>
              <Text style={styles.infoValue}>
                {dayjs(transactionData.created_at).format("DD MMM YYYY, HH:mm")}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <View style={[styles.statusBadge, badgeStyles.badge]}>
                <Text style={[styles.statusText, badgeStyles.text]}>{statusLabel}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Content */}
        <View style={styles.contentContainer}>
          {isLoading ? (
            <View style={styles.centeredMessage}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : error ? (
            <View style={styles.centeredMessage}>
              <Text style={styles.noPhotosText}>Gagal memuat foto.</Text>
              <Button label="Coba Lagi" onPress={handleRefresh} />
            </View>
          ) : photos && photos.length > 0 && isPaid ? (
            <FlatList
              style={styles.photoList}
              data={photoRows}
              renderItem={({ item: row }) => (
                <View style={styles.photoRow}>
                  {row.map((photo) => (
                    <PhotoItem
                      key={photo.id.toString()}
                      photo={photo}
                      onDownload={async () => {
                        const success = await methods.handleDownload([photo]);
                        showToast({
                          type: success ? "success" : "error",
                          text1: success ? "Unduhan Selesai" : "Unduhan Gagal",
                          text2: success
                            ? `${photo.filename} berhasil disimpan.`
                            : "Periksa koneksi internet dan coba lagi.",
                        });
                      }}
                    />
                  ))}
                  {row.length === 1 && <View style={{ flex: 1 }} />}
                </View>
              )}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContentContainer}
            />
          ) : (
            <View style={styles.centeredMessage}>
              <Text style={styles.noPhotosText}>Tidak ada foto untuk ditampilkan.</Text>
            </View>
          )}
        </View>

        {/* Bottom action bar — paid */}
        {isPaid && (
          <View style={styles.bottomBar}>
            <Button
              label={`Download Semua (${photos?.length ?? 0} Foto)`}
              onPress={handleDownloadAll}
              isDisabled={!photos || photos.length === 0 || isDownloading}
              containerStyle={styles.actionButton}
              loading={isDownloading}
            />
          </View>
        )}

        {/* Bottom action bar — pending */}
        {status === "pending" && (
          <View style={[styles.bottomBar, styles.bottomBarPending]}>
            <Button
              label="Batalkan"
              onPress={handleCancel}
              containerStyle={[styles.actionButton, styles.cancelButton]}
              loading={isCancelling}
              isDisabled={isCancelling}
              color={colors.error}
            />
            <Button
              label="Bayar Sekarang"
              onPress={() => {
                if (transactionData?.payment_url) {
                  onClose();
                  Navigation.paymentScene({
                    webViewUrl: transactionData.payment_url,
                    fromPage: "detail",
                    transactionId: transactionData.id.toString(),
                  });
                }
              }}
              loading={isCancelling}
              containerStyle={styles.actionButton}
              isDisabled={isCancelling}
            />
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};

interface PhotoItemProps {
  photo: TransactionHistoryPhoto;
  onDownload: () => void;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo, onDownload }) => (
  <View style={styles.photoItemContainer}>
    <Image
      source={{ uri: photo.original_path }}
      style={styles.photoImage}
      resizeMode="cover"
    />
    <View style={styles.photoFooter}>
      <Text style={styles.photoFilename} numberOfLines={1}>{photo.filename}</Text>
      <TouchableOpacity
        onPress={onDownload}
        style={styles.photoDownloadBtn}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Image source={icons.download} style={styles.photoDownloadIcon} />
      </TouchableOpacity>
    </View>
  </View>
);

export default PhotoModal;
