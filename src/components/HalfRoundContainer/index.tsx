import React, { memo } from 'react';
import { View } from 'react-native';
import styles from './styles';

interface IHalfRoundContainer {
  children: React.ReactNode;
}

const HalfRoundContainerComponent = ({
  children,
}: IHalfRoundContainer) => {
  return (
    <View style={styles.container}>
      <View style={styles.handle} />
      {children}
    </View>
  );
};

const HalfRoundContainer = memo(HalfRoundContainerComponent);
export default HalfRoundContainer;
