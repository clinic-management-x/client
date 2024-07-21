import createAccApi from "../createacc.api";

export const createUser = async (
  url: string,
  { arg }: { arg: { email: string; password: string } }
) => {
  const response = await createAccApi.post(url, arg);
  return response.data;
};

export const signinUser = async (
  url: string,
  { arg }: { arg: { username?: string; password: string } }
) => {
  const response = await createAccApi.post(url, arg);
  return response.data;
};
