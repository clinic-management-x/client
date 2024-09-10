import baseApi from "../base.api";

export const getGenericDrugNames = async (url: string) => {
  const response = await baseApi.get(url);

  return response.data.data;
};

export const getActiveIngridients = async (url: string) => {
  const response = await baseApi.get(url);

  return response.data.data;
};

export const getMedicines = async (url: string) => {
  const response = await baseApi.get(url);

  return response.data;
};
export const getMedicine = async (url: string) => {
  const response = await baseApi.get(url);

  return response.data;
};
export const getDrugList = async (url: string) => {
  const response = await baseApi.get(url);
  return response.data;
};
export const createMedicine = async (
  url: string,
  {
    arg,
  }: {
    arg: MedicineTypeCreate;
  }
) => {
  const response = await baseApi.post(url, arg);
  return response.data;
};

export const createBarcode = async (
  url: string,
  { arg }: { arg: Barcode[] }
) => {
  const response = await baseApi.post(url, arg);
  return response.data;
};

export const createIngredient = async (
  url: string,
  {
    arg,
  }: {
    arg: { activeIngredient: string; strength: number; unit: string };
  }
) => {
  const response = await baseApi.put(url, arg);
  return response.data;
};

export const updateMedicineData = async (
  url: string,
  {
    arg,
  }: {
    arg: MedicineTypeUpdate;
  }
) => {
  const response = await baseApi.patch(url, arg);
  return response.data;
};

export const updateIngredient = async (
  url: string,
  { arg }: { arg: { strength?: number; unit?: string } }
) => {
  const response = await baseApi.patch(url, arg);
  return response.data;
};

export const deleteIngredient = async (url: string) => {
  const response = await baseApi.delete(url);
  return response.data;
};
export const deleteMedicine = async (url: string) => {
  const response = await baseApi.delete(url);
  return response.data;
};
