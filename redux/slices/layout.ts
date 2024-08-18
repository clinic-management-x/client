import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface InitialState {
  selectedTab: string;
  selectedSubcategoryTab: string;
  openDrawer: boolean;
  showMobileSearchBar: boolean;
  mutateStaffs: any;
}

const initialState: InitialState = {
  selectedTab: "dashboard",
  selectedSubcategoryTab: "",
  openDrawer: false,
  showMobileSearchBar: false,
  mutateStaffs: null,
};

export const layoutSlice = createSlice({
  name: "layoutSlice",
  initialState,
  reducers: {
    insertSelectedTab: (state: InitialState, action: PayloadAction<any>) => {
      state.selectedTab = action.payload;
    },
    insertSelectedSubcategoryTab: (
      state: InitialState,
      action: PayloadAction<any>
    ) => {
      state.selectedSubcategoryTab = action.payload;
    },
    insertOpenDrawer: (state: InitialState, action: PayloadAction<any>) => {
      state.openDrawer = action.payload;
    },
    insertShowMobileSearchBar: (
      state: InitialState,
      action: PayloadAction<any>
    ) => {
      state.showMobileSearchBar = action.payload;
    },
    insertMutateStaff: (state: InitialState, action: PayloadAction<any>) => {
      state.mutateStaffs = action.payload;
    },
  },
});

export const {
  insertSelectedTab,
  insertSelectedSubcategoryTab,
  insertOpenDrawer,
  insertShowMobileSearchBar,
  insertMutateStaff,
} = layoutSlice.actions;

export const getSelectedTab = (state: RootState) =>
  state.layoutSlice.selectedTab;

export const getSelectedSubcategoryTab = (state: RootState) =>
  state.layoutSlice.selectedSubcategoryTab;

export const getOpenDrawer = (state: RootState) => state.layoutSlice.openDrawer;

export const getShowMobileSearchBar = (state: RootState) =>
  state.layoutSlice.showMobileSearchBar;

export const getMutateStaffs = (state: RootState) =>
  state.layoutSlice.mutateStaffs;

export default layoutSlice.reducer;
