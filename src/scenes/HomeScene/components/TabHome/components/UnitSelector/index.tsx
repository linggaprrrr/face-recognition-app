import React, { memo, useCallback } from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUnitsQuery } from '@redux/services/unit';
import { setUnitId } from '@redux/slice/home-slice';
import { RootState } from '@redux/store';
import Text from '@components/Text';
import styles from './styles';

const ALL_UNIT = { id: '', name: 'Semua' } as Unit.IUnit;

const UnitSelector = () => {
  const dispatch = useDispatch();
  const selectedId = useSelector((state: RootState) => state.home.unit_id);
  const { data: units = [], isLoading } = useGetUnitsQuery();

  const items = [ALL_UNIT, ...units];

  const handleSelect = useCallback(
    (id: string) => {
      dispatch(setUnitId(id));
    },
    [dispatch],
  );

  if (isLoading) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="small" color="#6366F1" />
      </View>
    );
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={items}
      keyExtractor={item => item.id}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => {
        const active = selectedId === item.id;
        return (
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => handleSelect(item.id)}
            style={[styles.chip, active && styles.chipActive]}>
            <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default memo(UnitSelector);
