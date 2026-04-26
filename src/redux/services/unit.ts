import { createApi } from '@reduxjs/toolkit/query/react';
import { baseService } from './_base-query';

export const units = createApi({
    reducerPath: 'units',
    baseQuery: baseService,
    endpoints: (builder) => ({
        searchUnits: builder.query<Unit.IUnit[], string>({
            query: (search) => `/units/?search=${search}`,
            transformResponse: (response: Unit.IPaginatedUnitResponse) => response.data,
        }),
        getUnits: builder.query<Unit.IUnit[], void>({
            query: () => '/units/',
            transformResponse: (response: Unit.IPaginatedUnitResponse) => response.data,
        }),
    }),
});

export const { useSearchUnitsQuery, useLazySearchUnitsQuery, useGetUnitsQuery } = units;