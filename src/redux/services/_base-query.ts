import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API } from '@constants/index';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_API,

  // ✅ SAFE: jangan paksa JSON parsing
  responseHandler: async (response) => {
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      return response.json();
    }

    return response.text(); // fallback aman untuk upload/multipart
  },

  prepareHeaders: async (headers) => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    // ❌ JANGAN set Content-Type manual
    // biarkan browser/RN set sendiri (penting untuk FormData)

    return headers;
  },
});

export const baseService: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const modifiedArgs =
    typeof args === 'string'
      ? { url: args }
      : {
          ...args,
        };

  // 🔥 DEBUG OPTIONAL (aktifkan kalau perlu)
  // console.log('🚀 API CALL:', modifiedArgs);

  return rawBaseQuery(modifiedArgs, api, extraOptions);
};