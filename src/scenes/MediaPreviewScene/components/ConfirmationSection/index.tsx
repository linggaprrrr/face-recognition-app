import React, { memo } from "react";
import { View } from "react-native";

import Text from "@components/Text";
import styles from "./styles";
import Button from "@components/Button";
import colors from "@colors";
import { Navigation } from "@navigations";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { setResetPhoto } from '@redux/slice/home-slice';

interface IConfirmationSection {
  reTakePhoto: () => void;
  setShouldShowLoading: (value: boolean) => void;
}

const ConfirmationSectionComponent = ({
  reTakePhoto,
  setShouldShowLoading,
}: IConfirmationSection) => {
  const dispatch = useDispatch();
  const home = useSelector((state: RootState) => state.home);

  function goToTermOfUseScene() {
    if (home.reset_photo) {
      setShouldShowLoading(true);
    } else {
      Navigation.termOfUseScene({ setShouldShowLoading });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apakah kamu puas dengan hasilnya?</Text>
      <Text style={styles.subTitle}>
        Perhatian! Pencahayaan yang buruk dan wajah buram akan mempersulit
        pencarian foto kamu
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          label="Ambil Ulang"
          color={colors.white}
          labelColor={colors.blue["2"]}
          containerStyle={styles.button}
          onPress={reTakePhoto}
        />
        <Button
          label="Ya"
          onPress={goToTermOfUseScene}
          containerStyle={styles.button}
          color={colors.blue["2"]}
        />
      </View>
    </View>
  );
};

const ConfirmationSection = memo(ConfirmationSectionComponent);
export default ConfirmationSection;
