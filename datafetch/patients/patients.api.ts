import baseApi from "../base.api";

export const getPatients = async (url: string) => {
  const response = await baseApi.get(url);
  return response.data;
};

export const getPatient = async (url: string) => {
  const response = await baseApi.get(url);
  return response.data;
};

export const createPatient = async (
  url: string,
  {
    arg,
  }: {
    arg: PatientType;
  }
) => {
  const response = await baseApi.post(url, arg);
  return response.data;
};

export const updatePatient = async (
  url: string,
  { args }: { args: UpdatePatientType }
) => {
  const response = await baseApi.patch(url, args);
  return response.data;
};

export const deletePatient = async (url: string) => {
  const response = await baseApi.delete(url);
  return response.data;
};
