import { baseUrl } from "../utils/global";
import { handleResponse } from "./ResponseHandler";

export const getContants = async (token: string) => {
  const response = await fetch(`${baseUrl}/constants`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  return handleResponse(response);
}

export const getUser = async (token: string, id: string) => {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  return handleResponse(response);
}