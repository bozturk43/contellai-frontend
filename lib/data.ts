import { cookies } from 'next/headers';

// Fonksiyonu 'async' olarak işaretledik
const getAuthHeaders = async () => {
    // cookies() fonksiyonunu 'await' ile bekliyoruz
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) return null;

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const getMyProfile = async () => {
    // getAuthHeaders artık async olduğu için onu da 'await' ile bekliyoruz
    const headers = await getAuthHeaders();
    if (!headers) return null;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/me`, { headers, cache: 'no-store' });
    
    if (!response.ok) return null;

    return response.json();
};

export const getMyWorkspaces = async () => {
    // getAuthHeaders artık async olduğu için onu da 'await' ile bekliyoruz
    const headers = await getAuthHeaders();
    if (!headers) return [];

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/workspaces`, { headers, cache: 'no-store' });

    if (!response.ok) return [];

    return response.json();
};