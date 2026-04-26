import { Image, View } from "react-native";
import React from "react";
import Text from "@components/Text";
import icons from "@icons";

interface IIconText {
  text: string;
  icon: any;
  textColor?: string;
}

const IconText = ({ text, icon, textColor }: IIconText) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
      <Image source={icon} style={{ height: 14, width: 14 }} />
      <Text style={{ color: textColor || "black" }} >{text}</Text>
    </View>
  );
};

export default IconText;
