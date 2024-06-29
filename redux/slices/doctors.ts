import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface InitialState {
  openCreateDoctorDialog: boolean;
}

const initialState: InitialState = {
  openCreateDoctorDialog: false,
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
  },
});

export const { insertOpenCreateDoctorDialog } = doctorSlice.actions;

export const getOpenCreateDoctorDialog = (state: RootState) =>
  state.doctorSlice.openCreateDoctorDialog;

export default doctorSlice.reducer;
