import { cookies } from 'next/headers';

const getAuthHeaders = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) return null;

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const getMyProfile = async () => {
    const headers = await getAuthHeaders();
    if (!headers) return null;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/me`, { headers, cache: 'no-store' });
    
    if (!response.ok) return null;

    return response.json();
};

export const getMyWorkspaces = async () => {
    const headers = await getAuthHeaders();
    if (!headers) return [];

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/workspaces/mine`, { headers, cache: 'no-store' });

    if (!response.ok) return [];

    return response.json();
};
export const getWorkspaceById = async (workspaceId: string) => {
    const headers = await getAuthHeaders();
    if (!headers) return null;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/workspaces/${workspaceId}`, { headers, cache: 'no-store' });

    if (!response.ok) return null;
    return response.json();
}
export const getPostsByWorkspaceId = async (workspaceId: string) => {
    const headers = await getAuthHeaders();
    if (!headers) return [];

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/contentposts/workspace/${workspaceId}`, { headers, cache: 'no-store' });

    if (!response.ok) return [];
    return response.json();
}