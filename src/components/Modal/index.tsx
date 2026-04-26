import React, {memo, useImperativeHandle, useState} from 'react';
import {Modal as RNModal, Pressable} from 'react-native';

import {ModalProps, ModalRef} from './types';
import styles from './styles';

const ModalComponent = React.forwardRef<ModalRef, ModalProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      openModal,
      closeModal,
    }),
    [],
  );

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function onRequestClose() {
    if (props.onClose) {
      props.onClose();
      return;
    }
    closeModal();
  }

  return (
    <RNModal transparent={true} visible={isOpen} onRequestClose={onRequestClose}>
      <Pressable
        style={[styles.container, props?.containerStyle]}
        onPress={onRequestClose}>
        <Pressable style={[styles.content, props?.contentStyle]}>
          {props.children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
});

const Modal = memo(ModalComponent);
export default Modal;
