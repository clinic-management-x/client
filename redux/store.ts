import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slices/user";
import layoutSlice from "./slices/layout";
import doctorSlice from "./slices/doctors";

const reducer = combineReducers({
  userSlice: userSlice,
  layoutSlice: layoutSlice,
  doctorSlice: doctorSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userSlice"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
