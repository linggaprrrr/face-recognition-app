import { ModalRef } from '@components/Modal/types';
import { setDate } from '@redux/slice/home-slice';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

export function useCalendarModal() {
    const dispatch = useDispatch();
    const modalRef = useRef<ModalRef>(null);

    const [selected, setSelected] = useState('');

    useEffect(function openModalOnMount() {
        // ? untuk sementara tidak di munculkan 
        // openModal();
    }, []);

    function openModal() {
        modalRef.current?.openModal();
    }

    function onSelectedDate() {
        if (!selected) {
            Alert.alert('Pilih tanggal terlebih dahulu');
            return;
        }

        dispatch(setDate(selected))
        modalRef.current?.closeModal();
    }

    const onClose = useCallback(() => {
        // do nothing so calendar modal will not close when click outside modal
    }, []);

    return {
        modalRef,
        selected,

        setSelected,
        onSelectedDate,
        onClose,
    };
}
