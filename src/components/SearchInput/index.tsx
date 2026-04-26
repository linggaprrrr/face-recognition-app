import colors from "@colors";
import styles from "./styles";
import icons from "@icons";
import React from "react";
import { View, TextInput, TextInputProps, Image } from "react-native";

interface SearchInputProps extends TextInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  inputRef?: React.Ref<TextInput>;
  active?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  onChangeText,
  inputRef,
  active = false,
  ...restProps
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        {...restProps}
        placeholderTextColor={colors.gray[4]}
        ref={inputRef}
        keyboardType='web-search'
      />
      <Image
        source={active ? icons.searchActive : icons.search}
        style={styles.icon}
      />
    </View>
  );
};

export default SearchInput;
