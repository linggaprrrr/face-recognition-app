import logger from '@libs/axiom-logger';
import { getCrashlytics, log } from '@react-native-firebase/crashlytics';
import { isFulfilled, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

const loggerMiddleware: Middleware = (storeAPI) => (next) => (action: any) => {
  const crashlytics = getCrashlytics();

  if (isFulfilled(action)) {
    log(crashlytics, JSON.stringify({
      header: action.meta.baseQueryMeta?.request?.headers,
      pathUrl: action.meta.baseQueryMeta?.request?.url,
      request: JSON.stringify(action.meta.arg?.originalArgs) || '',
      response: JSON.stringify(action.payload),
      status: action.meta.baseQueryMeta?.response?.status,
      level: 'info',
      tipe: 'android',
    }));

    logger('API berhasil', 'info', {
      header: action.meta.baseQueryMeta?.request?.headers,
      pathUrl: action.meta.baseQueryMeta?.request?.url,
      request: JSON.stringify(action.meta.arg?.originalArgs) || '',
      response: JSON.stringify(action.payload),
      status: action.meta.baseQueryMeta?.response?.status,
      level: 'info',
      tipe: 'android',
      method: action.meta.baseQueryMeta?.request?.method,
    });
  }

  if (isRejectedWithValue(action)) {
    log(crashlytics, JSON.stringify({
      header: action.meta.baseQueryMeta?.request?.headers,
      pathUrl: action.meta.baseQueryMeta?.request?.url,
      request: JSON.stringify(action.meta.arg?.originalArgs) || '',
      response: JSON.stringify(action.payload),
      status: action.meta.baseQueryMeta?.response?.status,
      level: 'error',
      tipe: 'android',
    }));

    logger('API Gagal', 'error', {
      header: action.meta.baseQueryMeta?.request?.headers,
      pathUrl: action.meta.baseQueryMeta?.request?.url,
      request: JSON.stringify(action.meta.arg?.originalArgs) || '',
      response: JSON.stringify(action.payload),
      status: action.meta.baseQueryMeta?.response?.status,
      level: 'error',
      tipe: 'android',
      method: action.meta.baseQueryMeta?.request?.method,
    });
  }

  return next(action);
};

export default loggerMiddleware;
