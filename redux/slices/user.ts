import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface initialState {
  userData: any;
}

const initialState: initialState = {
  userData: { id: 1 },
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export const getUserData = (state: RootState) => state.userSlice.userData;

export default userSlice.reducer;
