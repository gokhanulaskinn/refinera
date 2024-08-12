import { baseUrl } from "../../utils/global";
import { Jeweler, JewelerInput } from "../../utils/types";
import { handleResponse } from "../ResponseHandler";

export const createJeweler = async (jeweler: JewelerInput) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/jewelers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      ...jeweler,
      status: 'ACTIVE'
    })
  });

  return handleResponse(response);
}

export const getJeweler = async (id: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/jewelers/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return handleResponse(response);
}

export const updateJeweler = async (id: string, jeweler: Partial<Jeweler>) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/jewelers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(jeweler)
  });

  return handleResponse(response);
}


export const setComissionRate = async (jewelerIds: string[], comissionRate: number) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/jewelers/bulk`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      ids: jewelerIds,
      comissionRate
    })
  });

  return handleResponse(response);
}

export const updateBaseCommissionRate = async (rate: number) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/configuration/key/commissionRate`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      key: "commissionRate",
      value: rate.toString()
    })
  });

  return handleResponse(response);
}
