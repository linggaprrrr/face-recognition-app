import { createApi } from '@reduxjs/toolkit/query/react';
import { baseService } from './_base-query';

export const users = createApi({
    reducerPath: 'users',
    baseQuery: baseService,
    endpoints: (builder) => ({
        getMe: builder.query<User.UserResponse, void>({
            query: () => ({
                url: '/photos',
                method: 'GET',
            })
        }),
    }),
});

export const {  } = users;