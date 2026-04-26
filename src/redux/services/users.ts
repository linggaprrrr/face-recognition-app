
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseService } from './_base-query';

export const users = createApi({
    reducerPath: 'users',
    baseQuery: baseService,
    endpoints: (builder) => ({
        getMe: builder.query<User.UserResponse, void>({
            query: () => ({
                url: '/users/me',
                method: 'GET',
            })
        }),
        updateUser: builder.mutation<User.UserResponse, { userId: string; data: User.UserUpdatePayload }>({
            query: ({ userId, data }) => ({
                url: `/users/${userId}`,
                method: 'PUT',
                body: data,
            }),
        }),
        uploadPhotoUser: builder.mutation<User.UserResponse, { userId: string; base64: string; filename: string; }>({
            query: ({ userId, base64, filename }) => {

                const formData = new FormData();

                formData.append('picture', {
                    uri: `data:image/jpeg;base64,${base64}`,
                    name: filename,
                    type: 'image/jpeg',
                } as any);

                return {
                    url: `/users/${userId}/upload-picture`,
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                };

            },
        }),
    }),
});

export const { useGetMeQuery, useLazyGetMeQuery, useUpdateUserMutation, useUploadPhotoUserMutation } = users;