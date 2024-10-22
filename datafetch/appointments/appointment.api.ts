import baseApi from "../base.api";

export const getAppointments = async (url: string) => {
  const response = await baseApi.get(url);
  return response.data;
};

export const getBookedAppointments = async (url: string) => {
  const response = await baseApi.get(url);
  return response.data;
};

export const createAppointment = async (
  url: string,
  {
    arg,
  }: {
    arg: CrudAppointmentType;
  }
) => {
  delete arg.status;
  const response = await baseApi.post(url, arg);
  return response.data;
};

export const updateAppointment = async (
  url: string,
  {
    arg,
  }: {
    arg: CrudAppointmentType;
  }
) => {
  const response = await baseApi.patch(url, arg);
  return response.data;
};

export const deleteAppointments = async (
  url: string,
  { arg }: { arg: { data: string[] } }
) => {
  const response = await baseApi.post(url, arg);
  return response.data;
};

export const deleteAppointment = async (url: string) => {
  const response = await baseApi.delete(url);
  return response.data;
};
