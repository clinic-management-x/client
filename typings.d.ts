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
interface ActiveIngredientCreate {
  componentId?: string;
  _id: string;
  activeIngredient: string;
  strength: number;
  unit: string;
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
  sellPrices: {
    price: number;
    unit: string;
  }[];
  imageUrls: [];
  clinic?: string;
  _id?: string;
  __v?: string;
}
