import { StyleSheet, Dimensions } from 'react-native';
import colors from '@colors'; 

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    fullScreenModalContainer: {
        flex: 1,
        backgroundColor: colors.white, 
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray[4], 
    },
    headerPlaceholder: { 
        width: 30, 
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
        textAlign: 'center',
        flex: 1, 
    },
    closeButton: {
        padding: 5, 
        width: 30, 
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.black, 
    },
    contentContainer: {
        flex: 1, 
        // Menghapus padding agar FlatList bisa mengontrolnya sendiri
    },
    photoList: {
        paddingHorizontal: 10,
    },
    listContentContainer: {
        paddingBottom: 10, 
    },
    photoItemContainer: {
        marginBottom: 15,
        alignItems: 'center',
        borderRadius: 8,
        position: 'relative', // Diperlukan untuk checkbox overlay
    },
    photoImage: {
        width: screenWidth - 40, 
        height: screenWidth - 40, 
        borderRadius: 8,
        marginBottom: 8,
    },
    photoFilename: {
        fontSize: 14,
        color: colors.gray[1],
        marginTop: 4,
    },
    noPhotosText: {
        textAlign: 'center',
        color: colors.gray[1],
        paddingVertical: 30,
    },
    centeredMessage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    transactionInfoContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray[4],
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    infoLabel: {
        color: colors.gray[1],
        fontWeight: '600',
    },
    infoValue: {
        color: colors.black,
        fontWeight: 'bold',
    },
    statusText: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        overflow: 'hidden',
        color: colors.white, 
        fontSize: 12,
    },
    statusPaid: { // Mengubah nama properti menjadi PascalCase
        backgroundColor: colors.green[2], 
    },
    statusPending: { // Mengubah nama properti menjadi PascalCase dan menyamakan warna
        backgroundColor: colors.gray[1], // Sesuai dengan TransactionItem
        color: colors.white, // Sesuai dengan statusText default
    },
    statusExpired: { // Mengubah nama properti menjadi PascalCase
        backgroundColor: colors.red[1],
    },
    statusFailed: { // Mengubah nama properti menjadi PascalCase dan menyamakan warna
        backgroundColor: colors.red[1], // Menggunakan red[1] agar konsisten dengan statusExpired dan asumsi colors.danger adalah red[1]
    },
    statusCancelled: { // Menambahkan status Cancelled
        backgroundColor: colors.gray[1],
    },
    statusSuccess: { // Menambahkan status Success (jika ada)
        backgroundColor: colors.green[2],
    },
    headerControls: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    selectAllContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    selectAllText: {
        color: colors.black,
    },
    checkbox: {
        height: 20,
        width: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: colors.black,
    },
    checkboxOverlay: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 5,
        borderRadius: 8,
    },
    bottomBar: {
        padding: 15,
        paddingBottom: 30,
        borderTopWidth: 1,
        borderTopColor: colors.gray[4],
        backgroundColor: colors.white,
        height:100
    },
    bottomBarPending: {
        gap: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    actionButton: {
        borderRadius: 25,
        height: 50,
    },
    cancelButton: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.red[1],
    },
    cancelButtonText: {
        color: colors.red[1],
    },
 });