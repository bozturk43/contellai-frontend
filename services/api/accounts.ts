import { ConnectAccountPayload, ConnectedAccountResponse } from "@/lib/types";

export const connectAccount = async (payload: ConnectAccountPayload): Promise<ConnectedAccountResponse> => {
  const response = await fetch('/api/accounts/connect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Hesap bağlama işlemi başarısız.');
  }

  return response.json();
};