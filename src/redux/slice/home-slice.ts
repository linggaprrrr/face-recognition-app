import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HomeState {
  date: string;
  unit_id: string;
  reset_photo: boolean;
  pending_upload: boolean;
  photo_id: string;
  feedPhotos: Face.FaceSearchResult[];
  nRadius: number;
}

const initialState: HomeState = {
  date: '',
  unit_id: '',
  reset_photo: false,
  pending_upload: false,
  photo_id: '',
  feedPhotos: [],
  nRadius: 0.47,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setUnitId: (state, action: PayloadAction<string>) => {
      state.unit_id = action.payload;
    },
    setResetPhoto: (state, action: PayloadAction<boolean>) => {
      state.reset_photo = action.payload;
    },
    setPhotoId: (state, action: PayloadAction<string>) => {
      state.photo_id = action.payload;
    },
    setFeedPhotos: (state, action: PayloadAction<Face.FaceSearchResult[]>) => {
      state.feedPhotos = action.payload;
    },
    setNRadius: (state, action: PayloadAction<number>) => {
      state.nRadius = action.payload;
    },
    setPendingUpload: (state, action: PayloadAction<boolean>) => {
      state.pending_upload = action.payload;
    },
    clearHomeState: () => {
      return initialState;
    },
  },
});

export const { setDate, setUnitId, setResetPhoto, setPhotoId, setFeedPhotos, setNRadius, setPendingUpload, clearHomeState } = homeSlice.actions;
export default homeSlice.reducer;