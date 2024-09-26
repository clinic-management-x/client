import baseApi from "../base.api";

export const getNotifications = async (url: string) => {
  const response = await baseApi.get(url);

  return response.data;
};

export const updateNotification = async (
  url: string,
  { arg }: { arg: { _id: string; hasRead: boolean } }
) => {
  const response = await baseApi.patch(url, arg);

  return response.data;
};
