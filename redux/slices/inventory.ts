import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { stat } from "fs";

interface InitialState {
  currentMedicineId: string;
  imageEditing: boolean;
  imageUploading: boolean;
}

const initialState: InitialState = {
  currentMedicineId: "",
  imageEditing: false,
  imageUploading: false,
};

export const inventorySlice = createSlice({
  name: "inventorySlice",
  initialState,
  reducers: {
    insertCurrentMedicineId: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
      state.currentMedicineId = action.payload;
    },
    insertImageEdiging: (
      state: InitialState,
      action: PayloadAction<boolean>
    ) => {
      state.imageEditing = action.payload;
    },
    insertImageUploading: (
      state: InitialState,
      action: PayloadAction<boolean>
    ) => {
      state.imageUploading = action.payload;
    },
  },
});

export const {
  insertCurrentMedicineId,
  insertImageEdiging,
  insertImageUploading,
} = inventorySlice.actions;

export const getCurrentMedicineId = (state: RootState) =>
  state.inventorySlice.currentMedicineId;
export const getImageEditing = (state: RootState) =>
  state.inventorySlice.imageEditing;
export const getImageUploading = (state: RootState) =>
  state.inventorySlice.imageUploading;
export default inventorySlice.reducer;
