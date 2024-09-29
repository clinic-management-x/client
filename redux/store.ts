"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

import userSlice from "./slices/user";
import layoutSlice from "./slices/layout";
import workersSlice from "./slices/workers";
import storage from "./storage";
import supplierSlice from "./slices/supplier";
import inventorySlice from "./slices/inventory";
import settingsSlice from "./slices/settings";

const reducer = combineReducers({
  userSlice: userSlice,
  layoutSlice: layoutSlice,
  workersSlice: workersSlice,
  supplierSlice: supplierSlice,
  inventorySlice: inventorySlice,
  settingsSlice: settingsSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userSlice", "layoutSlice"],
};

export const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
