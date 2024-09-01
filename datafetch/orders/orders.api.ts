import baseApi from "../base.api";

export const checkOverlapBatchId = async (
  url: string,
  { arg }: { arg: { batchId: string } }
) => {
  const response = await baseApi.post(url, arg);

  return response.data;
};

export const getOrders = async (url: string) => {
  const response = await baseApi.get(url);

  return response.data.data;
};

export const getOrder = async (url: string) => {
  const response = await baseApi.get(url);

  return response.data;
};

export const createOrder = async (
  url: string,
  {
    arg,
  }: {
    arg: OrderType;
  }
) => {
  const response = await baseApi.post(url, arg);
  return response.data;
};
