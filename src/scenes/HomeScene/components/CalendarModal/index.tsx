import React, { memo } from 'react';
import { Calendar, DateData } from 'react-native-calendars';

import Modal from '@components/Modal';
import styles from './styles';
import { useCalendarModal } from './hooks/useCalendarModal';
import colors from '@colors';
import Text from '@components/Text';
import Button from '@components/Button';
import { View } from 'react-native';

const CalendarModalComponent = () => {
    const {modalRef, selected, setSelected, onSelectedDate, onClose} = useCalendarModal();

    return (
        <Modal
            ref={modalRef}
            contentStyle={styles.container}
            onClose={onClose}
        >
            <View>
                <Text style={styles.title}>Silahkan pilih terlebih dahulu jadwdal{'\n'}berkunjung</Text>
                <Calendar
                    firstDay={1}
                    theme={{
                        arrowColor: colors.black,
                        todayTextColor: colors.black,
                        selectedDayBackgroundColor: colors.blue['6'],
                        selectedDayTextColor: colors.white,
                    }}
                    onDayPress={(day: DateData) => {
                        setSelected(day.dateString);
                    }}
                    markedDates={{
                        [selected]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedDotColor: colors.blue['6'],
                        },
                      }}
                />
                <Button
                    label='Pilih'
                    containerStyle={styles.buttonSelect}
                    isDisabled={!selected}
                    onPress={onSelectedDate}
                />
            </View>
        </Modal>
    );
};

const CalendarModal = memo(CalendarModalComponent);
export default CalendarModal;
