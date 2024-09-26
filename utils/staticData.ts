import dayjs from "dayjs";
import { FaViber } from "react-icons/fa";

export const days: { name: string; _id?: number }[] = [
  { name: "Monday", _id: 0 },
  { name: "Tuesday", _id: 1 },
  { name: "Wednesday", _id: 2 },
  { name: "Thursday", _id: 3 },
  { name: "Friday", _id: 4 },
  { name: "Saturday", _id: 5 },
  { name: "Sunday", _id: 6 },
];

export const defaultInfo = {
  name: "",
  dateOfBirth: dayjs().toISOString(),
  gender: "M",
  speciality: {
    name: "",
    _id: "",
  },
  mobile: "",
  doctorFee: 0,
  email: "",
};

export const defaultStaffInfo = {
  name: "",
  dateOfBirth: dayjs().toISOString(),
  gender: "M",
  address: "",
  mobile: "",
  email: "",
};

export const defaultSupplierInfo = {
  name: "",
  email: "",
  mobile: "",
  address: "",
};

export const defaultMRInfo = {
  name: "",
  email: "",
  mobile: "",
  contacts: [],
};

export const defaultNewSchedule = {
  _id: 0,
  start: 0,
  endDay: 0,
  startTime: 0,
  end: 0,
};

const activeIngredient = {};

export const defaultMedicinData = {
  brandName: "",
  genericDrug: "",
  activeIngredients: [],
  routeOfAdministration: "ORAL",
  stockQuantity: 0,
  stockQuantityUnit: "BOX",
  minimumAlertQuantity: 0,
  minimumAlertQuantityUnit: "BOX",
  sellPrices: [],
  imageUrls: [],
};

export const defaultOrderData: OrderType = {
  batchId: "",
  paymentMethod: "CASH",
  estimateDate: "",
  supplier: "",
  orderItems: [],
  orderStatus: "PENDING",
  hasAlreadyArrived: false,
};

export const units = [
  { _id: "1", name: "μg" },
  { _id: "2", name: "mg" },
  { _id: "3", name: "g" },
  { _id: "4", name: "kg" },
  { _id: "5", name: "l" },
  { _id: "6", name: "ml" },
  { _id: "7", name: "cc" },
  { _id: "8", name: "mol" },
  { _id: "9", name: "mmol" },
];

export const buySellUnits = [
  {
    _id: "1",
    name: "BOX",
  },
  {
    _id: "2",
    name: "BOTTLE",
  },
  {
    _id: "3",
    name: "UNIT",
  },
  {
    _id: "4",
    name: "TABLET",
  },
  {
    _id: "5",
    name: "CARD",
  },
];

export const routes = [
  {
    _id: 1,
    name: "ORAL",
  },
  {
    _id: 2,
    name: "SUBLINGUAL",
  },
  {
    _id: 3,
    name: "BUCCAL",
  },
  {
    _id: 4,
    name: "INTRAVENOUS",
  },
  {
    _id: 5,
    name: "INTRAMUSCULAR",
  },
  {
    _id: 6,
    name: "SUBCUTANEOUS",
  },
  {
    _id: 7,
    name: "INHALATION",
  },
  {
    _id: 8,
    name: "NASAL",
  },
  {
    _id: 9,
    name: "RECTAL",
  },
  {
    _id: 10,
    name: "VAGINAL",
  },
  {
    _id: 11,
    name: "CUTANEOUS",
  },
  {
    _id: 12,
    name: "OTIC",
  },
  {
    _id: 13,
    name: "OCULAR",
  },
  {
    _id: 14,
    name: "TRANSDERMAL",
  },
];

export const paymentMethods = [
  { id: 1, label: "CASH" },
  { id: 2, label: "CREDIT" },
];
export const orderStatus = [
  {
    id: 1,
    label: "PENDING",
  },
  {
    id: 2,
    label: "PAID",
  },
];

export const defaultBarcode = {
  orderId: "",
  batchId: "",
  medicine: "",
  barcode: "",
  expiredDate: "",
  quantity: 0,
  unit: "",
};

export const defaultAlertData = [
  {
    _id: "1",
    name: "Alert when expired date is near",
    description: "Please enter how many days ahead to alert.",
    type: "expired_near",
    enable: false,
    days: 0,
  },
  {
    _id: "2",
    name: "Alert when expired date is past",
    description: "Please enter how many days needed to be past due to alert.",
    type: "expired_past",
    enable: false,
    days: 0,
  },
  {
    _id: "3",
    name: "Alert when arrival date is near",
    description: "Please enter how many days ahead to alert",
    type: "arrival_near",
    enable: false,
    days: 0,
  },
  {
    _id: "4",
    name: "Alert when arrival date is past due",
    description: "Please enter how many days needed to be past due to alert.",
    type: "arrival_due",
    enable: false,
    days: 0,
  },
];
