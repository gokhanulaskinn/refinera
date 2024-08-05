import { baseUrl } from "../../utils/global";
import { JewelerInput } from "../../utils/types";
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
