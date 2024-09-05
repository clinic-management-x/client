import baseApi from "../base.api";

export const checkOverlapBatchId = async (
  url: string,
  { arg }: { arg: { batchId: string; isEdit?: boolean; _id?: string } }
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

export const updateOrder = async (
  url: string,
  { arg }: { arg: OrderUpdateType }
) => {
  const response = await baseApi.patch(url, arg);
  return response.data;
};

export const deleteOrder = async (url: string) => {
  const response = await baseApi.delete(url);
  return response.data;
};

export const createOrderItem = async (
  url: string,
  { arg }: { arg: { itemName: string; quantity: number; unit: string } }
) => {
  const response = await baseApi.put(url, arg);
  return response.data;
};

export const updateOrderItem = async (
  url: string,
  {
    arg,
  }: {
    arg: { itemId: string; quantity: number; unit: string };
  }
) => {
  const response = await baseApi.patch(url, arg);
  return response.data;
};

export const deleteOrderItem = async (url: string) => {
  const response = await baseApi.delete(url);
  return response.data;
};
