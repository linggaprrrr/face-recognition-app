import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { auth } from './services/auth';
import { faceRecognition } from './services/face-recognition';
import { users } from './services/users';
import { units } from './services/unit';
import { transactions } from './services/transaction';
import userSlice from './slice/user-slice';
import homeSlice from './slice/home-slice';
import cartSlice from './slice/cart-slice';
import loggerMiddleware from './logger-middleware';


const rootReducer = combineReducers({
  [auth.reducerPath]: auth.reducer,
  [faceRecognition.reducerPath]: faceRecognition.reducer,
  [users.reducerPath]: users.reducer,
  [units.reducerPath]: units.reducer,
  [transactions.reducerPath]: transactions.reducer,
  user: userSlice,
  home: homeSlice,
  cart: cartSlice,
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      auth.middleware,
      faceRecognition.middleware,
      users.middleware,
      units.middleware,
      transactions.middleware,
      loggerMiddleware
    ]),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default { store };