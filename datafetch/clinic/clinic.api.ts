import baseApi from "../base.api";

export const getClinicData = async (url: string) => {
  const response = await baseApi.get(url);
  return response.data;
};

export const createClinic = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      name: string;
    };
  }
) => {
  const response = await baseApi.post(url, arg);
  return response.data;
};

export const updateClinic = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      name?: string;
      enableTelegram?: boolean;
      enableViber?: boolean;
      enableSMS?: boolean;
    };
  }
) => {
  const response = await baseApi.patch(url, arg);
  return response.data;
};

export const updateClinicPassword = async (
  url: string,
  {
    password,
    newPassword,
  }: {
    password: string;
    newPassword: string;
  }
) => {
  const response = await baseApi.patch(url, { password, newPassword });
  return response.data;
};
