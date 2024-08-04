import { baseUrl } from "../../utils/global";
import { JewelerInput } from "../../utils/types";
import { handleResponse } from "../ResponseHandler";

const token = localStorage.getItem('token');

export const createJeweler = async (jeweler: JewelerInput) => {
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
