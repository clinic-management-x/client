export const createDoctorDetail = (doctor: DoctorType) => {
  return {
    name: doctor.name,
    dateOfBirth: doctor.dateOfBirth,
    gender: doctor.gender,
    speciality: doctor.speciality,
    mobile: doctor.mobile.substring(4),
    doctorFee: doctor.doctorFee,
    email: doctor.email,
  };
};
