import baseApi from "../base.api";

export const getData = async (url: string) => {
  const response = await baseApi.get(url);
  return response.data;
};
