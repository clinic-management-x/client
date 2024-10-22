import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface InitialState {
  selectedAppointment: AppointmentType | null;
  selectedDoctor: DoctorType | null;
  availableSchedules: ScheduleType[];
  availableDays: number[];
  timeStamps: string[];
  bookedTimeArr: string[];
}

const initialState: InitialState = {
  selectedAppointment: null,
  selectedDoctor: null,
  availableSchedules: [],
  availableDays: [],
  timeStamps: [],
  bookedTimeArr: [],
};

export const appointmentSlice = createSlice({
  name: "appointmentSlice",
  initialState,
  reducers: {
    insertSelectedAppointment: (
      state: InitialState,
      action: PayloadAction<AppointmentType | null>
    ) => {
      state.selectedAppointment = action.payload;
    },
    insertSelectedDoctor: (
      state: InitialState,
      action: PayloadAction<DoctorType | null>
    ) => {
      state.selectedDoctor = action.payload;
    },
    insertAvailableSchedules: (
      state: InitialState,
      action: PayloadAction<ScheduleType[]>
    ) => {
      state.availableSchedules = action.payload;
    },
    insertAvailableDays: (
      state: InitialState,
      action: PayloadAction<number[]>
    ) => {
      state.availableDays = action.payload;
    },
    insertTimeStamps: (
      state: InitialState,
      action: PayloadAction<string[]>
    ) => {
      state.timeStamps = action.payload;
    },
    insertBookedTimeArr: (
      state: InitialState,
      action: PayloadAction<string[]>
    ) => {
      state.bookedTimeArr = action.payload;
    },
  },
});

export const {
  insertSelectedAppointment,
  insertSelectedDoctor,
  insertAvailableSchedules,
  insertAvailableDays,
  insertTimeStamps,
  insertBookedTimeArr,
} = appointmentSlice.actions;

export const getSelectedAppointment = (state: RootState) =>
  state.appointmentSlice.selectedAppointment;

export const getSelectedDoctor = (state: RootState) =>
  state.appointmentSlice.selectedDoctor;

export const getAvailableSchedules = (state: RootState) =>
  state.appointmentSlice.availableSchedules;

export const getAvailableDays = (state: RootState) =>
  state.appointmentSlice.availableDays;

export const getTimeStamps = (state: RootState) =>
  state.appointmentSlice.timeStamps;

export const getBookedTimeArr = (state: RootState) =>
  state.appointmentSlice.bookedTimeArr;
export default appointmentSlice.reducer;
