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