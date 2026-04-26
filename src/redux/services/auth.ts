import { createApi } from '@reduxjs/toolkit/query/react';
import { baseService } from './_base-query';

export const auth = createApi({
  reducerPath: 'auth',
  baseQuery: baseService,
  endpoints: (builder) => ({
    login: builder.mutation<Auth.LoginResponse, Auth.LoginPayload>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<Auth.RegisterResponse, Auth.RegisterPayload>({
      query: (newUser) => ({
        url: '/auth/register',
        method: 'POST',
        body: newUser,
      }),
    }),
    googleLogin: builder.mutation<Auth.LoginResponse, Auth.GoogleLoginRequest>({
      query: (payload) => ({
        url: '/auth/google-login',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGoogleLoginMutation,
} = auth;
