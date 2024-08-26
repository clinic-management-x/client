import baseApi from "../base.api";

export const getGenericDrugNames = async (url: string) => {
  const response = await baseApi.get(url);

  return response.data.data;
};

export const getActiveIngridients = async (url: string) => {
  const response = await baseApi.get(url);

  return response.data.data;
};
