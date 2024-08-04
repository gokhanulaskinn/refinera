import { baseUrl } from "../../utils/global";
import { PaymentInput } from "../../utils/types";
import { handleResponse } from "../ResponseHandler";

const token = localStorage.getItem('token');

export const paymentCreate = async (values: any) => {
  const response = await fetch(`${baseUrl}/payment/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(values)
  });

  return handleResponse(response);
}
