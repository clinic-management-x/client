import baseApi from "../base.api";

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
