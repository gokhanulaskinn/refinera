
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

export const companyTypes = [
  { value: 'LIMITED', label: 'Limited' },
  { value: 'ANONYMOUS', label: 'Anonim' },
  { value: 'JOINT_STOCK', label: 'Sermaye Ortaklığı' },
]