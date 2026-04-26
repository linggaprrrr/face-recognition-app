import {Permission, PermissionsAndroid, Platform} from 'react-native';

export const isGrantedAndroidPermission = async (permission: Permission) => {
  if (Platform.OS === 'android' && Number(Platform.constants.Release) >= 13) {
    if (
      [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ].includes(permission)
    ) {
      const permissionResult = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      );
      return permissionResult === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  } else {
    const permissionResult = await PermissionsAndroid.request(permission);
    return permissionResult === PermissionsAndroid.RESULTS.GRANTED;
  }
};

export const checkCameraPermissionAndroid = () => {
  return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
};
