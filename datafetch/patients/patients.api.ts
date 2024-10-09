import baseApi from "../base.api";

export const getPatients = async (url: string) => {
  const response = await baseApi.get(url);
  return response.data;
};

export const getPatient = async (url: string) => {
  const response = await baseApi.get(url);
  return response.data;
};

export const createPatient = async (
  url: string,
  {
    arg,
  }: {
    arg: PatientType;
  }
) => {
  delete arg.qrCodeUrl;
  if (arg.preferredDoctor == "") {
    delete arg.preferredDoctor;
  }
  const payload = {
    ...arg,
    contacts: arg.contacts.map((contact) =>
      contact.name === "mobile"
        ? { ...contact, value: "+959" + contact.value }
        : contact
    ),
    emergencyMobileContact: "+959" + arg.emergencyMobileContact,
  };
  const response = await baseApi.post(url, payload);
  return response.data;
};

export const updatePatient = async (
  url: string,
  {
    arg,
  }: {
    arg: UpdatePatientType;
  }
) => {
  const response = await baseApi.patch(url, arg);
  return response.data;
};

export const deletePatient = async (url: string) => {
  const response = await baseApi.delete(url);
  return response.data;
};
