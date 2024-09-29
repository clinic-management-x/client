import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface InitialState {
  currentMessagingSystem: string;
}

const initialState: InitialState = {
  currentMessagingSystem: "",
};

export const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState,
  reducers: {
    insertCurrentMessagingSystem: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
      state.currentMessagingSystem = action.payload;
    },
  },
});

export const { insertCurrentMessagingSystem } = settingsSlice.actions;

export const getCurrentMessagingSystem = (state: RootState) =>
  state.settingsSlice.currentMessagingSystem;

export default settingsSlice.reducer;
