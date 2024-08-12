import { UserRole } from "./types";

export const baseUrl = '/api';

export const fetcher = async (url: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return new Date(date).toLocaleDateString('tr-TR', options);
}

export const formatMoney = (value: string) => {
  // Ondalık kısmı ayır
  const parts = value.split('.');
  const integerPart = parts[0].replace(/\D/g, ''); // Tam sayı kısmından tüm rakam olmayan karakterleri kaldır
  const decimalPart = parts[1] ? parts[1].replace(/\D/g, '') : ''; // Ondalık kısmı temizle

  // Tam sayı kısmını 1000'lik gruplara ayır ve nokta ile ayır
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Eğer ondalık kısım varsa, tam sayı kısmına ondalık kısmı ekle
  return decimalPart ? `${formattedIntegerPart},${decimalPart}` : formattedIntegerPart;
};

export const removeFormat = (value: string) => {
  return value.replace(/\./g, '');
};

export const companyTypes = [
  { value: 'LIMITED', label: 'Limited' },
  { value: 'ANONYMOUS', label: 'Anonim' },
  { value: 'JOINT_STOCK', label: 'Sermaye Ortaklığı' },
]

export const getRoleName = (role: UserRole) => {
  switch (role) {
    case 'SUPERADMIN':
      return 'Süper Admin';
    case 'SUPERADMIN_EMPLOYEE':
      return 'Çalışan';
    case 'JEWELER_OWNER':
      return 'Admin';
    case 'JEWELER_EMPLOYEE':
      return 'Çalışan';
    case 'SUPPLIER_OWNER':
      return 'Admin';
    case 'SUPPLIER_EMPLOYEE':
      return 'Çalışan';
    default:
      return '';
  }
}
