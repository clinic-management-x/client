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
  duration: number;
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
interface ActiveIngredientCreate {
  componentId?: string;
  _id: string;
  activeIngredient: string;
  strength: number;
  unit: string;
}

interface QuantityRealtions {
  upperUnit: string;
  lowerUnit: string;
  quantityRelation: number;
}
interface MedicineTypeCreate {
  brandName: string;
  genericDrug: string;
  activeIngredients: ActiveIngredientCreate[];
  routeOfAdministration: string;
  stockQuantity: number;
  stockQuantityUnit: string;
  minimumAlertQuantity: number;
  minimumAlertQuantityUnit: string;
  sellPrices: {
    price: number;
    unit: string;
  }[];
  imageUrls: any[];
  quantityRelations?: QuantityRealtions[];
}
interface MedicineTypeUpdate {
  brandName?: string;
  genericDrug?: string;
  activeIngredients?: ActiveIngredientCreate[];
  routeOfAdministration?: string;
  stockQuantity?: number;
  stockQuantityUnit?: string;
  minimumAlertQuantity?: number;
  minimumAlertQuantityUni?: string;
  quantityRelations?: QuantityRealtions[];
  sellPrices?: {
    price: number;
    unit: string;
  }[];
  imageUrls?: any[];
}

interface ActiveIngridient {
  _id: string;
  activeIngredient: {
    _id: string;
    activeIngredientName: string;
  };
  strength: number;
  unit: string;
  __v: 0;
}

interface MedicineTypeStandard {
  brandName: string;
  genericDrug: {
    _id: string;
    genericName: string;
  };
  activeIngredients: ActiveIngridient[];
  routeOfAdministration: string;
  stockQuantity: number;
  stockQuantityUnit: string;
  minimumAlertQuantity: number;
  minimumAlertQuantityUnit: string;
  quantityRelations?: QuantityRealtions[];
  sellPrices: {
    price: number;
    unit: string;
  }[];
  imageUrls: [];
  clinic?: string;
  _id?: string;
  __v?: string;
}

interface ItemNameType {
  _id: string;
  brandName: string;
}
interface SupplierCompanyType {
  _id: string;
  name: string;
}

interface OrderItemType {
  itemName: ItemNameType | string;
  quantity: number;
  unit: string;
  _id?: string;
  _v?: string;
}
interface OrderType {
  _id?: string;
  __v?: string;
  batchId: string;
  paymentMethod: string;
  estimateDate: string;
  supplier: SupplierCompanyType | string;
  orderItems: OrderItemType[];
  orderStatus: string;
  hasAlreadyArrived: boolean;
}

interface OrderUpdateType {
  _id?: string;
  __v?: string;
  batchId?: string;
  paymentMethod?: string;
  estimateDate?: string;
  supplier?: SupplierCompanyType | string;
  orderItems?: OrderItemType[];
  orderStatus?: string;
  hasAlreadyArrived?: boolean;
}

interface Barcode {
  _id?: string;
  __v?: string;
  orderId: string;
  batchId: string;
  medicine: string;
  barcode: string;
  barCodeUrl?: string;
  expiredDate: string;
  quantity: number;
  unit: string;
}

interface BarcodeDisplay {
  _id?: string;
  __v?: string;
  orderId: {
    _id: string;
    supplier: {
      _id: string;
      name: string;
    };
  };
  batchId: string;
  medicine: {
    _id: string;
    brandName: string;
  };
  barcode: string;
  barCodeUrl: string;
  expiredDate: string;
  quantity: number;
  unit: string;
}

interface Alert {
  type: string;
  enable: boolean;
  days: number;
  clinicId?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface DefaultAlertData {
  _id: string;
  name: string;
  description: string;
  type: string;
  enable: boolean;
  days: number;
}

interface Notification {
  type: string;
  message: string;
  hasRead: boolean;
  clinicId: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface TelegramInfo {
  supplierId: {
    _id: string;
    name: string;
  };
  clinicId: string;
  groupId: number;
  _id?: string;
  __v?: number;
}

interface ClinicType {
  _id?: string;
  __v?: number;
  name: string;
  enableTelegram: boolean;
  enableViber: boolean;
  enableSMS: boolean;
  user: string;
}

interface ContactType {
  name: string;
  value: string;
  is_preferred_way: boolean;
}

interface PatientType {
  _id?: string;
  __v?: number;
  clinic?: string;
  name: string;
  patientId?: string;
  qrCodeUrl?: string;
  dateOfBirth: string;
  gender: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  emergencyMobileContact: string;
  contacts: ContactType[];
  occupation?: string;
  preferredDoctor?: string;
}

interface UpdatePatientType {
  name?: string;
  patientId?: string;
  qrCodeUrl?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  contacts?: ContactType[];
  occupation?: string;
  preferredDoctor?: string;
  emergencyMobileContact?: string;
}

interface AppointmentType {
  _id?: string;
  __v?: number;
  appointmentDate?: string;
  appointmentStartTime?: string;
  appointmentEndTime?: string;
  necessity: string;
  status?: string;
  clinicId?: string;
  createdAt?: string;
  updatedAt?: string;
  patient: {
    _id: string;
    name: string;
    patientId: string;
  };
  doctor: {
    _id: string;
    name: string;
    avatarUrl: string;
    speciality: {
      _id: string;
      name: string;
    };
  };
}

interface CrudAppointmentType {
  appointmentDate?: string;
  appointmentStartTime?: string;
  appointmentEndTime?: string;
  necessity?: string;
  status?: string;
  patient?: string;
  doctor?: string;
}

interface AdditionalFilter {
  nearestAppointment: boolean;
  necessity: string;
  status: string;
  start: string;
  end: string;
}

interface DoctorByAppointmentDate {
  clinic?: string;
  doctorFee: number;
  duration: number;
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
  appointments: AppointmentType[];
  schedules: ScheduleType[];
  _id?: string;
  __v?: string;
}
