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
  if (!value) return '';
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


export const allCurrency = [
  {
    "currency": "Has Altın",
    "parity": "ALTIN",
    "buyPrice": 2812.16,
    "sellerPrice": 2832.94,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Ons Altın",
    "parity": "ONS",
    "buyPrice": 2559.7,
    "sellerPrice": 2560,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Altın USD/KG",
    "parity": "USDKG",
    "buyPrice": 82830,
    "sellerPrice": 83130,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Altın EUR/KG",
    "parity": "EURKG",
    "buyPrice": 74840,
    "sellerPrice": 75270,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "22 Ayar Altın",
    "parity": "AYAR22",
    "buyPrice": 2557.07,
    "sellerPrice": 2706.29,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Gram Altın",
    "parity": "KULCEALTIN",
    "buyPrice": 2798.1,
    "sellerPrice": 2841.44,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Altın Gümüş Oranı",
    "parity": "XAUXAG",
    "buyPrice": 85.55,
    "sellerPrice": 85.62,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Yeni Çeyrek Altın",
    "parity": "CEYREK_YENI",
    "buyPrice": 4584,
    "sellerPrice": 4637,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Eski Çeyrek Altın",
    "parity": "CEYREK_ESKI",
    "buyPrice": 4514,
    "sellerPrice": 4566,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Yeni Yarım Altın",
    "parity": "YARIM_YENI",
    "buyPrice": 9140,
    "sellerPrice": 9268,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Eski Yarım Altın",
    "parity": "YARIM_ESKI",
    "buyPrice": 9027,
    "sellerPrice": 9132,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Yeni Tam Altın",
    "parity": "TEK_YENI",
    "buyPrice": 18279,
    "sellerPrice": 18471,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Eski Tam Altın",
    "parity": "TEK_ESKI",
    "buyPrice": 18110,
    "sellerPrice": 18293,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Yeni Ata Altın",
    "parity": "ATA_YENI",
    "buyPrice": 18774,
    "sellerPrice": 18958,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Eski Ata Altın",
    "parity": "ATA_ESKI",
    "buyPrice": 18763,
    "sellerPrice": 18944,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Yeni Ata 5'li",
    "parity": "ATA5_YENI",
    "buyPrice": 93504,
    "sellerPrice": 94529,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Eski Ata 5'li",
    "parity": "ATA5_ESKI",
    "buyPrice": 93364,
    "sellerPrice": 94387,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Yeni Gremse Altın",
    "parity": "GREMESE_YENI",
    "buyPrice": 45416,
    "sellerPrice": 46085,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Eski Gremse Altın",
    "parity": "GREMESE_ESKI",
    "buyPrice": 45135,
    "sellerPrice": 45802,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "14 Ayar Altın",
    "parity": "AYAR14",
    "buyPrice": 1514.81,
    "sellerPrice": 2341.41,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Gümüş TL",
    "parity": "GUMUSTRY",
    "buyPrice": 32.336,
    "sellerPrice": 33.252,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Gümüş Ons",
    "parity": "XAGUSD",
    "buyPrice": 29.9,
    "sellerPrice": 29.92,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Gümüş USD",
    "parity": "GUMUSUSD",
    "buyPrice": 957,
    "sellerPrice": 981,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Platin Ons",
    "parity": "XPDUSD",
    "buyPrice": 1050,
    "sellerPrice": 1052,
    "diff": 0,
    "timestamp": "1726173612443"
  },
  {
    "currency": "Paladyum Ons",
    "parity": "PALADYUM",
    "buyPrice": 23750,
    "sellerPrice": 33820,
    "diff": 0,
    "timestamp": "1726173612443"
  }
];

