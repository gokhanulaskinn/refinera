import { baseUrl } from "../../utils/global";
import { PaymentInput } from "../../utils/types";
import { handleResponse } from "../ResponseHandler";


export const paymentCreate = async (values: any, provider: string, tokenData?: string) => {
  const token = tokenData || localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/${provider}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(values)
  });

  return handleResponse(response);
}

export const createPhysicalPos = async (values: any, provider: string, tokenData?: string) => {
  const token = tokenData || localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/paywall/create-physical`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(values)
  });

  return handleResponse(response);
} 

export const checkPaymentStatus = async (values: any, provider: string, tokenData?: string) => {
  const token = tokenData || localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/${provider}/check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(values)
  });

  return handleResponse(response);
}


export const deleteSeller = async (id: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/jewelers/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return handleResponse(response);
}

export const createPaymentLink = async (values: any, provider: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/${provider}/link`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(values)
  });

  return handleResponse(response);
}


export const createBranch = async (values: any) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/branches`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(values)
  });

  return handleResponse(response);
}

export const updateBranch = async (id: string, values: any) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/branches/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(values)
  });

  return handleResponse(response);
}

export const getBranch = async (id: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/branches/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return handleResponse(response);
}

export const deleteBranch = async (id: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/branches/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return handleResponse(response);
}
