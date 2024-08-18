import baseApi from "../base.api";

export const getSuppliers = async (url: string) => {
  const response = await baseApi.get(url);

  return response.data.data;
};

export const getSupplier = async (url: string) => {
  const response = await baseApi.get(url);

  return response.data;
};

export const createSupplier = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      company: SupplierType;
      representatives: MedicalRepresentativeType[];
    };
  }
) => {
  const response = await baseApi.post(url, arg);
  return response.data;
};

export const editSupplier = async (url: string, { arg }: { arg: any }) => {
  const response = await baseApi.patch(url, arg);
  return response.data;
};

export const deleteSupplier = async (url: string) => {
  const response = await baseApi.delete(url);
  return response.data;
};

export const createMR = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      mr: MedicalRepresentativeType;
      _id: string;
    };
  }
) => {
  const response = await baseApi.post(url, arg);
  return response.data;
};

export const editMR = async (url: string, { arg }: { arg: any }) => {
  const response = await baseApi.patch(url, arg);
  return response.data;
};

export const deleteMR = async (url: string) => {
  const response = await baseApi.delete(url);
  return response.data;
};
