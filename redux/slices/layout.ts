import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface InitialState {
  selectedTab: string;
  openDrawer: boolean;
}

const initialState: InitialState = {
  selectedTab: "Dashboard",
  openDrawer: false,
};

export const layoutSlice = createSlice({
  name: "layoutSlice",
  initialState,
  reducers: {
    insertSelectedTab: (state: InitialState, action: PayloadAction<any>) => {
      state.selectedTab = action.payload;
    },
    insertOpenDrawer: (state: InitialState, action: PayloadAction<any>) => {
      state.openDrawer = action.payload;
    },
  },
});

export const { insertSelectedTab, insertOpenDrawer } = layoutSlice.actions;

export const getSelectedTab = (state: RootState) =>
  state.layoutSlice.selectedTab;

export const getOpenDrawer = (state: RootState) => state.layoutSlice.openDrawer;

export default layoutSlice.reducer;
