interface SidebarType {
  id: number;
  title: string;
  subCategories?: { id: number; title: string; icon: any; link: string }[];
  icon: any;
  link?: string;
}

interface ScheduleType {
  _id?: number | string;
  startDay?: number;
  start: number;
  endDay?: number;
  end: number;
  clinic?: string;
  doctor?: string;
}

interface DoctorType {
  clinic?: string;
  doctorFee: number;
  dateOfBirth: string;
  avatarUrl?: string;
  email: string;
  gender: string;
  mobile: string;
  name: string;
  speciality: {
    name: string;
    _id: string;
  };
  schedules?: ScheduleType[];
  _id?: string;
  __v?: string;
}

interface StaffType {
  clinic?: string;
  dateOfBirth: string;
  avatarUrl?: string;
  email: string;
  gender: string;
  mobile: string;
  name: string;
  address?: string;
  _id?: string;
  __v?: string;
}

interface SupplierType {
  clinic?: string;
  avatarUrl?: string;
  _id?: string;
  __v?: string;
  mobile: string;
  email: string;
  name: string;
  address?: string;
  contacts?: { name?: string; value: string }[];
  medRepresentatives?: MedicalRepresentativeType[];
}

interface EditSupplierType {
  avatarUrl?: string;
  mobile?: string;
  email?: string;
  name?: string;
  address?: string;
  contacts?: { name?: string; value: string }[];
  medRepresentatives?: MedicalRepresentativeType[];
}

interface MedicalRepresentativeType {
  clinic?: string;
  _id?: string;
  __v?: string;
  mobile: string;
  email: string;
  name: string;
  contacts?: { name?: string; value: string }[];
  supplierCompany?: string;
}
