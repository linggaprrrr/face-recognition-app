import {StyleSheet} from 'react-native';

const styles = (size?: number) => StyleSheet.create({
  avatar: {
    width: size ?? 90,
    height: size ?? 90,
    borderRadius: size ?? 90,
  },
});

export default styles;
