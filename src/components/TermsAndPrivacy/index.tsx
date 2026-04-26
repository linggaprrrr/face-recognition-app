import React, { memo } from "react";
import { Image, Pressable, StyleProp, View, ViewStyle } from "react-native";

import icons from "@icons";

import styles from "./styles";

interface ITermAndPrivacy {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  checked: boolean;
  setChecked: () => void;
}

const TermAndPrivacyComponent = ({
  children,
  containerStyle,
  checked,
  setChecked,
}: ITermAndPrivacy) => {
  return (
    <View style={[styles.termsContainer, containerStyle]}>
      <Pressable onPress={setChecked}>
        <Image
          source={icons.roundCheckBlue}
          style={[styles.roundCheckIcon, { tintColor: checked ? undefined : "grey" }]}
        />
      </Pressable>
      {children}
    </View>
  );
};

const TermAndPrivacy = memo(TermAndPrivacyComponent);
export default TermAndPrivacy;
