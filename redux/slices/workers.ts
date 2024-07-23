import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface InitialState {
  openCreateDoctorDialog: boolean;
  openCreateStaffDialog: boolean;
  page: number;
}

const initialState: InitialState = {
  openCreateDoctorDialog: false,
  openCreateStaffDialog: false,
  page: 1,
};

export const workersSlice = createSlice({
  name: " wrokersSlice",
  initialState,
  reducers: {
    insertOpenCreateDoctorDialog: (
      state: InitialState,
      action: PayloadAction<any>
    ) => {
      state.openCreateDoctorDialog = action.payload;
    },
    insertOpenCreateStaffDialog: (
      state: InitialState,
      action: PayloadAction<any>
    ) => {
      state.openCreateStaffDialog = action.payload;
    },
    insertPageNumber: (state: InitialState, action: PayloadAction<any>) => {
      state.page = action.payload;
    },
  },
});

export const {
  insertOpenCreateDoctorDialog,
  insertOpenCreateStaffDialog,
  insertPageNumber,
} = workersSlice.actions;

export const getOpenCreateDoctorDialog = (state: RootState) =>
  state.workersSlice.openCreateDoctorDialog;

export const getOpenStaffDialog = (state: RootState) =>
  state.workersSlice.openCreateStaffDialog;

export const getPageNumber = (state: RootState) => state.workersSlice.page;

export default workersSlice.reducer;
