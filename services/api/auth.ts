
import { LoginResponse, type RegisterPayload } from '@/lib/types';


export const registerUser = async (payload: RegisterPayload): Promise<LoginResponse> => {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Kayıt işlemi başarısız.');
    }
    return response.json();
};