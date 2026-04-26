import {StyleProp, ViewStyle} from 'react-native';

export interface ModalProps {
  children: JSX.Element;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;

  onClose?: () => void;
}

export interface ModalRef {
  openModal: () => void;
  closeModal: () => void;
}
