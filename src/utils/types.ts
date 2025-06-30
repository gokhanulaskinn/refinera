import { SxProps } from "@mui/material";

export type ApiList<T> = {
  results: T[],
  total: number,
};

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}

export enum UserRole {
  SUPERADMIN = "SUPERADMIN",
  SUPERADMIN_EMPLOYEE = "SUPERADMIN_EMPLOYEE",
  JEWELER_OWNER = "JEWELER_OWNER",
  JEWELER_EMPLOYEE = "JEWELER_EMPLOYEE",
  SUPPLIER_OWNER = "SUPPLIER_OWNER",
  SUPPLIER_EMPLOYEE = "SUPPLIER_EMPLOYEE"
}

export enum CompanyType {
  LIMITED = "LIMITED",
  ANONYMOUS = "ANONYMOUS",
  JOINT_STOCK = "JOINT_STOCK"
}

export interface User {
  id: string;
  email: string;
  phone?: string;
  status: Status;
  firstName?: string;
  lastName?: string;
  identity: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  branches: Branch[];
  jeweler?: Jeweler;
  supplier?: Supplier;
  jewelerId?: string;
  supplierId?: string;
  permissions: string[];
  role: UserRole;
}

export interface Branch {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  isMain: boolean;
  users: User[];
  jeweler: Jeweler;
  jewelerId: string;
}

export interface BranchInput {
  name: string;
  address?: string;
  phone?: string;
}

export interface Jeweler {
  id: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  companyTableName?: string;
  companyType?: CompanyType;
  taxOffice?: string;
  email?: string;
  phone?: string;
  status?: Status;
  taxNumber?: string;
  branches: Branch[];
  users: User[];
  bankAccounts: BankAccount[];
  createdAt: Date;
  updatedAt: Date;
  pos: PosType;
}

export interface JewelerInput {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  companyTableName?: string;
  companyType?: CompanyType;
  taxOffice?: string;
  taxNumber?: string;
  phone?: string;
  email?: string;
  identity?: string;
  iban?: string;
  accountHolder?: string;
  bankName?: string;
  pos: PosType;
}

export type PosType = {
  name: string;
  rate: number;
}

export interface Supplier {
  id: string;
  name?: string;
  companyName?: string;
  companyType?: string;
  taxOffice?: string;
  taxNumber?: string;
  users: User[];
  bankAccounts: BankAccount[];
  createdAt: Date;
  updatedAt: Date;
  Product: Product[];
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  supplier?: Supplier;
  supplierId?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  iban: string;
  accountHolder: string;
  jeweler?: Jeweler;
  isMain: boolean;
  supplier?: Supplier;
  jewelerId?: string;
  supplierId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentInput {
  customerName: string;
  customerPhone: string,
  customerIdentity: string,
  cardNumber: string,
  cardExpiry: string,
  cardCvv: string,
  cardAccountHolderName: string,
  idCardFrontImage?: File,
  idCardBackImage?: File,
  isLink?: boolean,
}

export interface CurrencyItem {
  parity: string;
  currency: string;
  buyPrice: number;
  sellerPrice: number;
  timestamp: string;
}

export const posProviders = ['Ozan', 'Elekse', 'Paywall']

export const ayars = [
  { label: '1', value: 41.66 },
  { label: '2', value: 83.32 },
  { label: '3', value: 124.98 },
  { label: '4', value: 166.64 },
  { label: '5', value: 208.30 },
  { label: '6', value: 249.96 },
  { label: '7', value: 291.62 },
  { label: '8', value: 333.28 },
  { label: '9', value: 374.94 },
  { label: '10', value: 416.60 },
  { label: '11', value: 458.26 },
  { label: '12', value: 499.92 },
  { label: '13', value: 541.58 },
  { label: '14', value: 585.00 },
  { label: '15', value: 624.90 },
  { label: '16', value: 666.56 },
  { label: '17', value: 708.22 },
  { label: '18', value: 750.00 },
  { label: '19', value: 791.54 },
  { label: '20', value: 833.20 },
  { label: '21', value: 874.86 },
  { label: '22', value: 916.00 },
  { label: '23', value: 958.18 },
  { label: '24', value: 995 },
]

export interface Transaction {
  id: string;
  amount: number;
  totalAmount: number;
  transactionOwner: string;
  customerIdentity: string;
  cardholderName: string;
  email: string;
  phone: string;
  pos: string;
  transactionId: string;
  referenceId: string;
  status: Status;
  jewelerId: string;
  createdAt: Date;
  updatedAt: Date;
  jeweler: Jeweler;
}

export interface OzanPaymentRes {
  referenceNo: string;
  transactionId: string;
  form3d: string;
}

export interface PaywallPaymentRes {
  redirectUrl: string;
  merchantuniquecode: string;
}

export interface EleksePaymentRes {
  URL_3DS: string;
  ORDER_REF_NUMBER: string;
}

export interface ConstantsType {
  Ozan?: string;
  Elekse?: string;
  Paywall?: string;
}

export type TableDataType = {
  head: {
    id: string;
    label: string;
  }[];
  body: TableBodyRowType[];
}

export type TableBodyRowType = {
  id?: string;
  rowData: TableRowCellType[]
}

export type TableRowCellType = {
  value: string | string[];
  type: 'text' | 'options' | 'actions' | 'badge';
  id?: string;
  onSelected?: (id: any) => void;
  variant?: { id: string; label: string, bgColor?: string, textColor?: string }[];
  actions?: { name: string, action: any }[];
  sx?: SxProps
}

export type BucketType = {
  itemId: string,
  quantity: number,
}