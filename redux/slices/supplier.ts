import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { stat } from "fs";

interface InitialState {
  medRepresentative: MedicalRepresentativeType | null;
}

const initialState: InitialState = {
  medRepresentative: null,
};

export const supplierSlice = createSlice({
  name: "supplierSlice",
  initialState,
  reducers: {
    insertMedRepresentative: (
      state: InitialState,
      action: PayloadAction<MedicalRepresentativeType | null>
    ) => {
      state.medRepresentative = action.payload;
    },
  },
});

export const { insertMedRepresentative } = supplierSlice.actions;

export const getMedRepresentative = (state: RootState) =>
  state.supplierSlice.medRepresentative;

export default supplierSlice.reducer;
