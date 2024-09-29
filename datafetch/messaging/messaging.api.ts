import baseApi from "../base.api";

export const getAllTelegramInfo = async (url: string) => {
  const response = await baseApi.get(url);

  return response.data;
};

export const createTelegramInfo = async (
  url: string,
  { arg }: { arg: { supplierId: string; clinicId: string; groupId: string } }
) => {
  const response = await baseApi.post(url, {
    ...arg,
    groupId: Number(arg.groupId),
  });
  return response.data;
};

export const updateTelegramInfo = async (
  url: string,
  { arg }: { arg: { groupId: string } }
) => {
  const response = await baseApi.patch(url, {
    groupId: Number(arg.groupId),
  });
  return response.data;
};

export const deleteTelegramInfo = async (url: string) => {
  const response = await baseApi.delete(url);
  return response.data;
};
