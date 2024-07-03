interface SidebarType {
  id: number;
  title: string;
  icon: any;
  link: string;
}

interface ScheduleType {
  _id?: number;
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
