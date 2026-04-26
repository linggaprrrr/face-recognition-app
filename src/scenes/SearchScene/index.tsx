import React, { useRef, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { setScreenshotPrevention } from '@utils/screenshotPrevention';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import SearchInput from "@components/SearchInput";
import useSearchScene from "./hooks/useSearchScene";
import icons from "@icons";
import styles from "./style";
import { useDispatch } from "react-redux";
import { setUnitId } from "@redux/slice/home-slice";
import { Navigation } from "@navigations";

const SearchScene = () => {
  const searchInputRef = useRef<any>(null);
  const { state, method } = useSearchScene();
  const { data, keyword, loading } = state;
  const dispatch = useDispatch();
  const { setKeyword } = method;

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handlePressItem = (id: string) => {
    dispatch(setUnitId(id));
    Navigation.pop();
  };

  const ItemRender = ({ item }: { item: Unit.IUnit }) => (
    <Pressable
      style={styles.itemContainer}
      onPress={() => handlePressItem(item.id)}
    >
      <Image source={icons.mapPin} style={styles.itemIcon} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemLocation}>{item.location}</Text>
      </View>
    </Pressable>
  );

  useFocusEffect(
    useCallback(() => {
      setScreenshotPrevention(true);

      return () => {        
        setScreenshotPrevention(false);
      };
    }, [])
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <SearchInput
            inputRef={searchInputRef}
            placeholder="Cari..."
            value={keyword}
            onChangeText={setKeyword}
          />
        </View>

        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <FlatList
            style={styles.list}
            data={data || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={ItemRender}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScene;
