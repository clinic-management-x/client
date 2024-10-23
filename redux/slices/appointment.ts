import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { defaultFilter } from "@/utils/staticData";

interface InitialState {
  selectedAppointment: AppointmentType | null;
  selectedDoctor: DoctorType | null;
  availableSchedules: ScheduleType[];
  availableDays: number[];
  timeStamps: string[];
  bookedTimeArr: string[];
  filterData: AdditionalFilter;
}

const initialState: InitialState = {
  selectedAppointment: null,
  selectedDoctor: null,
  availableSchedules: [],
  availableDays: [],
  timeStamps: [],
  bookedTimeArr: [],
  filterData: defaultFilter,
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
    insertFilterData: (
      state: InitialState,
      action: PayloadAction<AdditionalFilter>
    ) => {
      state.filterData = action.payload;
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
  insertFilterData,
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

export const getFilterData = (state: RootState) =>
  state.appointmentSlice.filterData;

export default appointmentSlice.reducer;
