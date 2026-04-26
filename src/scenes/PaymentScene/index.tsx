import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { setScreenshotPrevention } from '@utils/screenshotPrevention';
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  Button,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';
import RNFS from 'react-native-fs';

import styles from './styes';
import colors from '@colors';
import { usePaymentScene } from './hooks/usePaymentScene';

interface PaymentSceneProps {
  webViewUrl: string;
  fromPage: 'payment' | 'detail';
  transactionId: string;
}

/**
 * Save QRIS image (base64) to Android Download folder
 */
const saveDokuQR = async (base64: string, transactionId: string) => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission ditolak', 'Tidak bisa menyimpan QRIS');
        return;
      }
    }

    const fileName = `QRIS_DOKU_${transactionId || Date.now()}.png`;
    const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;
    const cleanBase64 = base64.replace(/^data:image\/png;base64,/, '');

    await RNFS.writeFile(path, cleanBase64, 'base64');

    Alert.alert('Berhasil', `QRIS berhasil disimpan\n${path}`);
    console.log('QR saved at:', path);
  } catch (e) {
    console.error('Save QR error:', e);
    Alert.alert('Gagal', 'Gagal menyimpan QRIS');
  }
};

function PaymentScene({
  webViewUrl,
  fromPage,
  transactionId,
}: PaymentSceneProps) {
  const { state, methods } = usePaymentScene({ fromPage, transactionId });
  const { isLoading } = state;
  const { handleNavigation } = methods;

  const [qrBase64, setQrBase64] = React.useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      setScreenshotPrevention(true);

      return () => {        
        setScreenshotPrevention(false);
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}

      <WebView
        source={{ uri: webViewUrl }}
        javaScriptEnabled
        originWhitelist={['*']}
        injectedJavaScript={`
          (function () {
            function extractDokuQR() {
              const canvas = document.querySelector('canvas');
              if (!canvas) return;

              try {
                const dataUrl = canvas.toDataURL('image/png');
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'DOKU_QR',
                  payload: dataUrl
                }));
              } catch (e) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'DOKU_QR_ERROR',
                  error: e.message
                }));
              }
            }

            // tunggu halaman DOKU render QR
            setTimeout(extractDokuQR, 1500);
          })();
        `}
        onMessage={(event) => {
          try {
            const data = JSON.parse(event.nativeEvent.data);
            console.log('WEBVIEW MSG:', data);

            if (data.type === 'DOKU_QR') {
              setQrBase64(data.payload);
            }
          } catch (e) {
            console.warn('Invalid WebView message');
          }
        }}
        onShouldStartLoadWithRequest={(event: WebViewNavigation) => {
          if (event.url.startsWith('app://payment/back')) {
            handleNavigation();
            return false;
          }
          return true;
        }}
      />

      {/* Tombol native — jangan pakai tombol download dari web */}
      {qrBase64 && (
        <View style={{ padding: 16 }}>
          <Button
            title="Simpan QRIS"
            onPress={() => saveDokuQR(qrBase64, transactionId)}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default PaymentScene;
