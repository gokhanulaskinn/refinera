export type ApiList<T> = {
  results: T[],
  count: number,
};

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}

export enum UserRole {
  SUPERADMIN = "SUPERADMIN",
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
  first_name?: string;
  last_name?: string;
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
  isMainBranch: boolean;
  users: User[];
  jeweler: Jeweler;
  jewelerId: string;
}

export interface Jeweler {
  id: string;
  name?: string;
  companyName?: string;
  companyType?: CompanyType;
  taxOffice?: string;
  email?: string;
  phone?: string;
  status?: Status;
  taxNumber?: string;
  branches: Branch[];
  comissionRate: number;
  users: User[];
  bankAccounts: BankAccount[];
  createdAt: Date;
  updatedAt: Date;
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
  jeweler?: Jeweler;
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
}

export interface PaymentRes {
  referenceNo: string;
  transactionId: string;
  form3d: string;
}

export interface ConstantsType {
  comissionRate: number;
}

// export type User = {
//   id?: string;
//   email: string;
//   phone?: string;
//   status?: string;
//   name: string;
//   permissions?: string[];
//   userRole?: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export type Jeweler = {}

// export type Supplier = {}

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
}