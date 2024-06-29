export const createDoctorOptions = (newDoctor: DoctorType) => {
  return {
    optimisticData: (doctors: DoctorType[]) => {
      return [...doctors, newDoctor];
    },
    rollbackOnError: true,
    populateCache: (res: any, doctors: DoctorType[]) => {
      return [...doctors, newDoctor];
    },
    revalidate: false,
  };
};
