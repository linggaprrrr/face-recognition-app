import {ImageSourcePropType, StatusBarStyle} from 'react-native';

export interface INavbar {
  title?: string;
  barColor?: string;
  barStyle?: StatusBarStyle;
  showLeftButton?: boolean;
  leftIcon?: ImageSourcePropType;
  rightComponent?: React.ReactNode;

  onBack?: () => void;
}

export interface IRightButton {
  onPress: () => void;
}
