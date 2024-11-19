import { baseUrl } from "../utils/global";
import { handleResponse } from "./ResponseHandler";

export const loginUser = async (email: string, password: string) => {
  const url = `${baseUrl}/auth/login`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        email: email,
        password: password,
      }
    )
  });

  const res = await handleResponse(response);

  return res;
}

export const changePassword = async (userId: string, oldPassword: string, newPassword: string) => {
  const token = localStorage.getItem('token');
  const url = `${baseUrl}/auth/change-password`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        userId: userId,
        oldPassword: oldPassword,
        newPassword: newPassword,
      }
    )
  });

  const res = await handleResponse(response);

  return res;
}