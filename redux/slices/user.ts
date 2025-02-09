import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface initialState {
  userData: any;
  hasClinic: boolean;
  clinicId: string;
  clinic: ClinicType | null;
}

const initialState: initialState = {
  userData: null,
  hasClinic: false,
  clinicId: "",
  clinic: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    insertUser: (state: initialState, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
    insertHasClinic: (state: initialState, action: PayloadAction<any>) => {
      state.hasClinic = action.payload;
    },
    insertClinicId: (state: initialState, action: PayloadAction<any>) => {
      state.clinicId = action.payload;
    },
    insertClinic: (state: initialState, action: PayloadAction<ClinicType>) => {
      state.clinic = action.payload;
    },
  },
});

export const { insertUser, insertHasClinic, insertClinicId, insertClinic } =
  userSlice.actions;

export const getUserData = (state: RootState) => state.userSlice.userData;
export const getHasClinic = (state: RootState) => state.userSlice.hasClinic;
export const getClinicId = (state: RootState) => state.userSlice.clinicId;
export const getClinic = (state: RootState) => state.userSlice.clinic;

export default userSlice.reducer;
