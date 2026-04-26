import Modal from "@components/Modal";
import Text from "@components/Text";
import React, { memo, useEffect, useRef } from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "./styles";
import { ModalRef } from "@components/Modal/types";
import { Navigation } from "@navigations";
import { useUploadFaceReferenceMutation } from "@redux/services/face-recognition";
import { useLazyGetMeQuery } from "@redux/services/users";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setUser } from "@redux/slice/user-slice";
import { setPhotoId } from "@redux/slice/home-slice";

interface ILoadingModal {
  isLoading: boolean;
  mediaPaths?: string[];
}

const LoadingModalComponent = ({ isLoading, mediaPaths }: ILoadingModal) => {
  const [uploadFaceReference] = useUploadFaceReferenceMutation();
  const modalRef = useRef<ModalRef>(null);
  const dispatch = useDispatch();
  const [trigger] = useLazyGetMeQuery();

  useEffect(() => {
    if (isLoading && mediaPaths?.length === 2) {
      openModal();
      uploadAllAndNavigate(mediaPaths);
    }
  }, [isLoading, mediaPaths]);

  function openModal() {
    modalRef.current?.openModal();
  }

  async function uploadAllAndNavigate(paths: string[]) {
    try {
      const uploadPromises = paths.map((path, index) => {
        const filename = `photo_${Date.now()}_${index + 1}.jpg`;

        return uploadFaceReference({
          path,
          filename,
          isReference: true,
        });
      });

      const results = await Promise.all(uploadPromises);
      const allSuccess = results.every((res) => res && res.data);

      if (allSuccess) {
        modalRef.current?.closeModal();

        dispatch(setPhotoId(results[0].data?.data.id || ""));
        const authMe = await trigger();
        if (authMe.isSuccess) dispatch(setUser(authMe?.data));

        Navigation.finishScene();
      } else {
        Toast.show({
          type: "error",
          text1: "Terjadi kesalahan saat mengunggah foto. Silakan coba lagi.",
        });
        modalRef.current?.closeModal();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Terjadi kesalahan saat mengunggah foto. Silakan coba lagi.",
      });
      modalRef.current?.closeModal();
    }
  }

  return (
    <Modal ref={modalRef} contentStyle={styles.contentStyle}>
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.title}>Menyiapkan</Text>
        <Text style={styles.subtitle}>
          Mohon tunggu sebentar, dan jangan tutup halaman ini.
        </Text>
      </View>
    </Modal>
  );
};

const areEqual = (prevProps: ILoadingModal, nextProps: ILoadingModal) => {
  return (
    prevProps.isLoading === nextProps.isLoading &&
    JSON.stringify(prevProps.mediaPaths) ===
      JSON.stringify(nextProps.mediaPaths)
  );
};

const LoadingModal = memo(LoadingModalComponent, areEqual);
export default LoadingModal;
