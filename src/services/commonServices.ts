import { baseUrl } from "../utils/global";
import { User } from "../utils/types";
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

export const updateUser = async (id: string, user: Partial<User>) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(user)
  });

  return handleResponse(response);
}

export const createUser = async (values: any) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(values)
  });

  return handleResponse(response);
}

export const createBank = async (values: any) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/bankaccounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(values)
  });

  return handleResponse(response);
}

export const updateBank = async (id: string, values: any) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/bankaccounts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(values)
  });

  return handleResponse(response);
}

export const deleteBank = async (id: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/bankaccounts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return handleResponse(response);
}

export const getBank = async (id: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/bankaccounts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return handleResponse(response);
}

export const getLongUrl = async (code: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseUrl}/url?code=${code}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return handleResponse(response);
}