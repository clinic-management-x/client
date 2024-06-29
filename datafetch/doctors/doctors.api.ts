import baseApi from "../base.api";

export const getDoctors = async (url: string) => {
  const response = await baseApi.get(url);
  if (response.statusText !== "OK") {
    console.log("res", response);
  }
  return response.data.data;
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
      avatarUrl: string;
    };
  }
) => {
  console.log("url", url);
  console.log("arg", arg);
  const response = await baseApi.post(url, arg);
  return response.data;
};
