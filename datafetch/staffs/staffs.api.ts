import baseApi from "../base.api";

export const getStaffs = async (url: string) => {
  const response = await baseApi.get(url);

  return response.data.data;
};

export const getStaff = async (url: string) => {
  const response = await baseApi.get(url);
  if (response.statusText !== "OK") {
    console.log("res", response);
  }
  return response.data;
};

export const createStaff = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      name: string;
      dateOfBirth: string;
      gender: string;
      address?: string;
      mobile: string;
      email: string;
      avatarUrl?: string;
    };
  }
) => {
  const response = await baseApi.post(url, arg);
  return response.data;
};

export const updateStaff = async (
  url: string,
  {
    arg,
  }: {
    arg: StaffType;
  }
) => {
  const staffData = {
    ...arg,
    mobile: "+959" + arg.mobile,
  };

  delete staffData["_id"];
  delete staffData["__v"];
  delete staffData["clinic"];
  const response = await baseApi.patch(url, staffData);

  return response.data;
};

export const deleteStaff = async (url: string) => {
  const response = await baseApi.delete(url);
  return response.data;
};
