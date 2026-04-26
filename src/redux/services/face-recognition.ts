import { createApi } from '@reduxjs/toolkit/query/react';
import { baseService } from './_base-query';

export const faceRecognition = createApi({
  reducerPath: 'faceRecognition',
  tagTypes: ['FaceSearch'],
  baseQuery: baseService,
  endpoints: (builder) => ({
    uploadFaceReference: builder.mutation<Face.UploadResponse, { path: string; filename: string; isReference?: boolean }>({
      query: ({ path, filename, isReference = true }) => {
        const formData = new FormData();

        formData.append('file', {
          uri: path,
          name: filename,
          type: 'image/jpeg',
        } as any);

        return {
          url: `/faces/register-reference?is_reference=${isReference}`,
          method: 'POST',
          body: formData,
        };
      },
    }),
    searchFace: builder.query<Face.SearchResponse, Face.SearchPayload>({
      query: (params) => ({
        url: `/faces/search`,
        method: 'GET',
        params,
      }),
      providesTags: ['FaceSearch'],
    }),
    choosenPhoto: builder.mutation<void, { photo_id: string; choice: boolean }>({
      query: ({ photo_id, choice }) => ({
        url: '/photos/photo-choosen',
        method: 'POST',
        params: { photo_id, choice },
      }),
      invalidatesTags: ['FaceSearch']
    }),
    faceGetInference: builder.query<Face.IResponseGetInference, { user_id: string }>({
      query: ({ user_id }) => ({
        url: `/faces/get-inference/${user_id}`,
        method: 'GET'
      })
    }),
    faceGetPhotoReference: builder.query<Face.PhotoReferenceStatus, { photo_id: string }>({
      query: ({ photo_id }) => ({
        url: `/faces/photo-references/${photo_id}/status`,
        method: 'GET'
      })
    }),
    faceGetPurchaced: builder.query<Face.PurchasedStatus, { user_id: string, photo_id: string }>({
      query: ({ user_id, photo_id }) => ({
        url: `/faces/is-purchased?user_id=${user_id}&photo_id=${photo_id}`,
        method: 'GET'
      })
    }),
  }),
});

export const {
  useUploadFaceReferenceMutation,
  useSearchFaceQuery,
  useChoosenPhotoMutation,
  useLazySearchFaceQuery, 
  useLazyFaceGetInferenceQuery,
  useLazyFaceGetPhotoReferenceQuery,
  useLazyFaceGetPurchacedQuery,
} = faceRecognition;
