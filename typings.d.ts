interface SidebarType {
  id: number;
  title: string;
  icon: any;
  link: string;
}

interface DoctorType {
  clinic?: string;
  doctorFee: number;
  dateOfBirth: string;
  avatarUrl: string;
  email: string;
  gender: string;
  mobile: string;
  name: string;
  speciality: {
    name: string;
    _id: string;
  };
  _id?: string;
}
