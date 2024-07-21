import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface initialState {
  userData: any;
  hasClinic: boolean;
}

const initialState: initialState = {
  userData: null,
  hasClinic: false,
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
  },
});

export const { insertUser, insertHasClinic } = userSlice.actions;

export const getUserData = (state: RootState) => state.userSlice.userData;
export const getHasClinic = (state: RootState) => state.userSlice.hasClinic;

export default userSlice.reducer;
