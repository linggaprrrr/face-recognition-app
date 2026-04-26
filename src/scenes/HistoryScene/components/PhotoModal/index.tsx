import React, { useState, useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  Modal,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

const PhotoModal: React.FC<PhotoModalProps> = ({
  isVisible,
  transaction_id,
  onClose,
}) => {
  const { state, methods } = useTransactionDetail({ transaction_id, onClose });
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<Set<string>>(
    new Set()
  );

  const { transactionDetail, isLoading, error, isDownloading, isCancelling } =
    state;
  const { handleRefresh, handleCancel } = methods;

  useEffect(() => {
    if (!isVisible) {
      setSelectedPhotoIds(new Set());
    }
  }, [isVisible]);

  const transactionData = transactionDetail;
  const photos = transactionData?.photos;
  const status = transactionData?.status;

  const isCheckable = status === "paid";

  const handleToggleSelect = useCallback(
    (photoId: string) => {
      if (!isCheckable) return;
      setSelectedPhotoIds((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(photoId)) {
          newSet.delete(photoId);
        } else {
          newSet.add(photoId);
        }
        return newSet;
      });
    },
    [isCheckable]
  );

  const handleToggleSelectAll = useCallback(() => {
    if (!isCheckable) return;
    if (selectedPhotoIds.size === photos?.length) {
      setSelectedPhotoIds(new Set());
    } else {
      const allIds = new Set(photos?.map((p) => p.id.toString()) || []);
      setSelectedPhotoIds(allIds);
    }
  }, [isCheckable, photos, selectedPhotoIds.size]);

  const handleDownload = async () => {
    const selectedPhotos =
      photos?.filter((p) => selectedPhotoIds.has(p.id.toString())) || [];
    if (selectedPhotos.length > 0) {
      onClose();
      await methods.handleDownload(selectedPhotos);
    }
  };

  if (!isVisible) {
    return null;
  }

  const isAllSelected =
    isCheckable &&
    photos &&
    selectedPhotoIds.size === photos.length &&
    photos.length > 0;

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.fullScreenModalContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerPlaceholder} />
          <Text style={styles.modalTitle}>Detail Foto</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        {transactionData && (
          <View style={styles.transactionInfoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>ID Transaksi:</Text>
              <Text style={styles.infoValue}>{transactionData.trx_code}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tanggal:</Text>
              <Text style={styles.infoValue}>
                {dayjs(transactionData.created_at).format("DD MMMM YYYY HH:mm")}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status:</Text>
              <Text
                style={[
                  styles.infoValue,
                  styles.statusText,
                  styles[`status${status ? status.charAt(0).toUpperCase() + status.slice(1) : ''}` as keyof typeof styles], // Mengubah status menjadi PascalCase
                ]}
              >
                {status?.toUpperCase()}
              </Text>
            </View>
          </View>
        )}

        {isCheckable && photos && photos.length > 0 && (
          <View style={styles.headerControls}>
            <TouchableOpacity
              onPress={handleToggleSelectAll}
              style={styles.selectAllContainer}
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    backgroundColor: isAllSelected
                      ? colors.black
                      : "transparent",
                  },
                ]}
              />
              <Text style={styles.selectAllText}>Pilih Semua</Text>
            </TouchableOpacity>
          </View>
        )}

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
          ) : photos && photos.length > 0 && status === "paid" ? (
            <FlatList
              style={styles.photoList}
              data={photos}
              renderItem={({ item }) => (
                <PhotoItem
                  photo={item}
                  isCheckable={isCheckable}
                  isSelected={selectedPhotoIds.has(item.id.toString())}
                  onToggleSelect={() => handleToggleSelect(item.id.toString())}
                />
              )}
              keyExtractor={(photo) => photo.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContentContainer}
            />
          ) : (
            <View style={styles.centeredMessage}>
              <Text style={styles.noPhotosText}>
                Tidak ada foto untuk ditampilkan.
              </Text>
            </View>
          )}
        </View>

        {/* Bottom Action Bar */}
        {status === "paid" && (
          <View style={styles.bottomBar}>
            <Button
              label={`Unduh (${selectedPhotoIds.size}) Foto`}
              onPress={handleDownload}
              isDisabled={selectedPhotoIds.size === 0}
              containerStyle={styles.actionButton}
              loading={isDownloading}
            />
          </View>
        )}
        {status === "pending" && (
          <View style={[styles.bottomBar, styles.bottomBarPending]}>
            <Button
              label="Batal Transaksi"
              onPress={handleCancel}
              containerStyle={[styles.actionButton, styles.cancelButton]}
              loading={isCancelling}
              isDisabled={isCancelling}
              color={colors.red[2]}
            />
            <Button
              label="Lanjutkan Pembayaran"
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
  isCheckable: boolean;
  isSelected: boolean;
  onToggleSelect: () => void;
}

const PhotoItem: React.FC<PhotoItemProps> = ({
  photo,
  isCheckable,
  isSelected,
  onToggleSelect,
}) => {
  return (
    <TouchableOpacity onPress={onToggleSelect} disabled={!isCheckable}>
      <View style={styles.photoItemContainer}>
        <Image
          source={{ uri: photo.original_url }}
          style={styles.photoImage}
          resizeMode="cover"
        />
        {isCheckable && (
          <View style={styles.checkboxOverlay}>
            <View
              style={[
                styles.checkbox,
                { backgroundColor: isSelected ? colors.black : "transparent" },
              ]}
            />
          </View>
        )}
        <Text style={styles.photoFilename}>{photo.filename}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PhotoModal;
