import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  CameraOptions,
  Callback,
  ImagePickerResponse,
} from 'react-native-image-picker';

export interface IImagePicker extends ImagePickerResponse {
  error?: string;
}

const logError = (response: IImagePicker, callback: Callback) => {
  const error = response?.errorMessage || response?.errorCode;
  if (error) {
    response.error = error;
  }

  callback?.(response);
};

const ImagePicker = {
  launchCamera: (options: CameraOptions, callback: Callback) => {
    const newCallback = (response: IImagePicker) =>
      logError(response, callback);
    return launchCamera(options, newCallback);
  },
  launchImageLibrary: (options: ImageLibraryOptions, callback: Callback) => {
    const newCallback = (response: IImagePicker) =>
      logError(response, callback);
    return launchImageLibrary(options, newCallback);
  },
};

export default ImagePicker;
