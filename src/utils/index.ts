import {Dimensions} from 'react-native';
import RNFS from 'react-native-fs';

export function getWindowHeight() {
  return Dimensions.get('window').height;
}

export function getWindowWidth() {
  return Dimensions.get('window').width;
}

export function printLog(key: string, value?: any) {
  __DEV__ && console.log(key, value ?? '');
}

export const convertImageToBase64 = async (uri: string): Promise<string> => {
  try {
    const base64String = await RNFS.readFile(uri, 'base64');
    return base64String;
  } catch (error) {
    console.error('Gagal mengkonversi gambar ke base64', error);
    throw error;
  }
};


export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateName = (name: string) => {
  const regex = /^[a-zA-Z\s]{5,}$/;
  return regex.test(name.trim());
};


export const formatToRupiah = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};
