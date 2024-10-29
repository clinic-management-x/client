import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Dayjs } from "dayjs";

interface InitialState {
  selectedTab: string;
  selectedSubcategoryTab: string;
  openDrawer: boolean;
  showMobileSearchBar: boolean;
  mutateStaffs: any;
  openNotification: boolean;
  notificationCount: number;
  appointmentView: string;
  filterView: boolean;
  selectedDoctorAppointment: DoctorByAppointmentDate | null;
  selectedSchedule: {
    start: string;
    end: string;
  };
  selectedDate: Dayjs | null;
}

const initialState: InitialState = {
  selectedTab: "",
  selectedSubcategoryTab: "",
  openDrawer: false,
  showMobileSearchBar: false,
  mutateStaffs: null,
  openNotification: false,
  notificationCount: 0,
  appointmentView: "row",
  filterView: false,
  selectedDoctorAppointment: null,
  selectedSchedule: {
    start: "",
    end: "",
  },
  selectedDate: null,
};

export const layoutSlice = createSlice({
  name: "layoutSlice",
  initialState,
  reducers: {
    insertSelectedTab: (state: InitialState, action: PayloadAction<any>) => {
      state.selectedTab = action.payload;
    },
    insertSelectedSubcategoryTab: (
      state: InitialState,
      action: PayloadAction<any>
    ) => {
      state.selectedSubcategoryTab = action.payload;
    },
    insertOpenDrawer: (state: InitialState, action: PayloadAction<any>) => {
      state.openDrawer = action.payload;
    },
    insertShowMobileSearchBar: (
      state: InitialState,
      action: PayloadAction<any>
    ) => {
      state.showMobileSearchBar = action.payload;
    },
    insertMutateStaff: (state: InitialState, action: PayloadAction<any>) => {
      state.mutateStaffs = action.payload;
    },
    insertOpenNotification: (
      state: InitialState,
      action: PayloadAction<any>
    ) => {
      state.openNotification = action.payload;
    },
    insertNotificationCount: (
      state: InitialState,
      action: PayloadAction<any>
    ) => {
      state.notificationCount = action.payload;
    },
    insertAppointmentView: (
      state: InitialState,
      action: PayloadAction<any>
    ) => {
      state.appointmentView = action.payload;
    },
    insertFilterView: (state: InitialState, action: PayloadAction<boolean>) => {
      state.filterView = action.payload;
    },
    insertSelectedDoctorAppointment: (
      state: InitialState,
      action: PayloadAction<DoctorByAppointmentDate | null>
    ) => {
      state.selectedDoctorAppointment = action.payload;
    },
    insertSelectedSchedule: (
      state: InitialState,
      action: PayloadAction<{ start: string; end: string }>
    ) => {
      state.selectedSchedule = action.payload;
    },
    insertSelectedDate: (
      state: InitialState,
      action: PayloadAction<Dayjs | null>
    ) => {
      state.selectedDate = action.payload;
    },
  },
});

export const {
  insertSelectedTab,
  insertSelectedSubcategoryTab,
  insertOpenDrawer,
  insertShowMobileSearchBar,
  insertMutateStaff,
  insertOpenNotification,
  insertNotificationCount,
  insertAppointmentView,
  insertFilterView,
  insertSelectedDoctorAppointment,
  insertSelectedSchedule,
  insertSelectedDate,
} = layoutSlice.actions;

export const getSelectedTab = (state: RootState) =>
  state.layoutSlice.selectedTab;

export const getSelectedSubcategoryTab = (state: RootState) =>
  state.layoutSlice.selectedSubcategoryTab;

export const getOpenDrawer = (state: RootState) => state.layoutSlice.openDrawer;

export const getShowMobileSearchBar = (state: RootState) =>
  state.layoutSlice.showMobileSearchBar;

export const getMutateStaffs = (state: RootState) =>
  state.layoutSlice.mutateStaffs;

export const getOpenNotifications = (state: RootState) =>
  state.layoutSlice.openNotification;

export const getNotificationCount = (state: RootState) =>
  state.layoutSlice.notificationCount;

export const getAppointmentView = (state: RootState) =>
  state.layoutSlice.appointmentView;

export const getFilterView = (state: RootState) => state.layoutSlice.filterView;

export const getSelectedDoctorAppointment = (state: RootState) =>
  state.layoutSlice.selectedDoctorAppointment;

export const getSelectedSchedule = (state: RootState) =>
  state.layoutSlice.selectedSchedule;

export const getSelectedDate = (state: RootState) =>
  state.layoutSlice.selectedDate;

export default layoutSlice.reducer;
