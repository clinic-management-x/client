import baseApi from "../base.api";

export const getDoctors = async (url: string) => {
  const response = await baseApi.get(url);

  return response.data.data;
};

export const getDoctor = async (url: string) => {
  const response = await baseApi.get(url);
  if (response.statusText !== "OK") {
    console.log("res", response);
  }
  return response.data;
};

export const getSpecialities = async (url: string) => {
  const response = await baseApi.get(url);
  return response.data;
};

export const createDoctor = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      name: string;
      dateOfBirth: string;
      gender: string;
      speciality: string;
      mobile: string;
      doctorFee: number;
      email: string;
      avatarUrl?: string;
      schedules?: ScheduleType[];
    };
  }
) => {
  const response = await baseApi.post(url, arg);
  return response.data;
};

export const updateDoctor = async (
  url: string,
  {
    arg,
  }: {
    arg: DoctorType;
  }
) => {
  const doctorData = {
    ...arg,
    mobile: "+959" + arg.mobile,
    speciality: arg.speciality._id,
  };
  delete doctorData["schedules"];
  delete doctorData["_id"];
  delete doctorData["__v"];
  delete doctorData["clinic"];

  const response = await baseApi.patch(url, doctorData);

  return response.data;
};

export const updateSchedule = async (
  url: string,
  { arg }: { arg: ScheduleType }
) => {
  const response = await baseApi.patch(url, { start: arg.start, end: arg.end });

  return response.data;
};

export const createSchedules = async (
  url: string,
  { arg }: { arg: { schedules: ScheduleType[]; doctor: string } }
) => {
  const payload = {
    ...arg,
    schedules: arg.schedules.map((schedule) => {
      return { start: schedule.start, end: schedule.end };
    }),
  };

  const response = await baseApi.post(url, payload);

  return response.data;
};

export const deleteSchedule = async (url: string) => {
  const response = await baseApi.delete(url);
  return response.data;
};

export const deleteDoctor = async (url: string) => {
  const response = await baseApi.delete(url);
  return response.data;
};
