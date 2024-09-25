import baseApi from "../base.api";

export const getAlerts = async (url: string) => {
  const response = await baseApi.get(url);

  return response.data;
};

export const createAlert = async (url: string, { arg }: { arg: Alert }) => {
  const response = await baseApi.post(url, {
    enable: arg.enable,
    type: arg.type,
    days: arg.days,
  });
  return response.data;
};

export const updateAlert = async (url: string, { arg }: { arg: Alert }) => {
  const response = await baseApi.patch(`${url}/${arg._id}`, {
    enable: arg.enable,
    type: arg.type,
    days: arg.days,
  });
  return response.data;
};
