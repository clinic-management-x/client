import dayjs from "dayjs";

export const days: { name: string; _id?: number }[] = [
  { name: "Monday", _id: 0 },
  { name: "Tuesday", _id: 1 },
  { name: "Wednesday", _id: 2 },
  { name: "Thursday", _id: 3 },
  { name: "Friday", _id: 4 },
  { name: "Saturday", _id: 5 },
  { name: "Sunday", _id: 6 },
];
export const defaultInfo = {
  name: "",
  dateOfBirth: dayjs().toISOString(),
  gender: "M",
  speciality: {
    name: "",
    _id: "",
  },
  mobile: "",
  doctorFee: 0,
  email: "",
};

export const defaultNewSchedule = {
  _id: 0,
  startDay: 0,
  endDay: 0,
  startTime: 0,
  endTime: 0,
};
