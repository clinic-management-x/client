import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface InitialState {
  openCreateDoctorDialog: boolean;
  doctorsArrMutate: any;
  page: number;
}

const initialState: InitialState = {
  openCreateDoctorDialog: false,
  doctorsArrMutate: null,
  page: 1,
};

export const doctorSlice = createSlice({
  name: "doctorSlice",
  initialState,
  reducers: {
    insertOpenCreateDoctorDialog: (
      state: InitialState,
      action: PayloadAction<any>
    ) => {
      state.openCreateDoctorDialog = action.payload;
    },
    insertDoctorsArrMutate: (
      state: InitialState,
      action: PayloadAction<any>
    ) => {
      state.doctorsArrMutate = action.payload;
    },
    insertPageNumber: (state: InitialState, action: PayloadAction<any>) => {
      state.page = action.payload;
    },
  },
});

export const {
  insertOpenCreateDoctorDialog,
  insertDoctorsArrMutate,
  insertPageNumber,
} = doctorSlice.actions;

export const getOpenCreateDoctorDialog = (state: RootState) =>
  state.doctorSlice.openCreateDoctorDialog;
export const getDoctorsArrMutate = (state: RootState) =>
  state.doctorSlice.doctorsArrMutate;
export const getPageNumber = (state: RootState) => state.doctorSlice.page;

export default doctorSlice.reducer;
