'use server';

import { cookies } from 'next/headers';
import { type Workspace, type Post, type UserProfile, CreateWorkspaceDto } from '@/lib/types'; 
import { revalidatePath } from 'next/cache';
export async function serverFetcher<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
        throw new Error('Authentication token not found.');
    }
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
    };

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}${endpoint}`, {
        ...options,
        headers,
        cache: 'no-store', 
    });
    
    if (!response.ok) {
        const errorBody = await response.text();
        console.error(`API Error (${response.status}) on ${endpoint}: ${errorBody}`);
        throw new Error(`API isteği başarısız oldu: ${response.status}`);
    }

    if (response.status === 204) {
        return {} as T;
    }

    return response.json();
}

export const getMyProfile = async (): Promise<UserProfile | null> => {
    try {
        return await serverFetcher<UserProfile>('/api/me');
    } catch (error) {
        console.error('Failed to fetch profile:', error);
        return null;
    }
};

export const getMyWorkspaces = async (): Promise<Workspace[]> => {
    try {
        return await serverFetcher<Workspace[]>('/api/workspaces/mine');
    } catch (error) {
        console.error('Failed to fetch workspaces:', error);
        return [];
    }
};

export const getWorkspaceById = async (workspaceId: string): Promise<Workspace | null> => {
    try {
        return await serverFetcher<Workspace>(`/api/workspaces/${workspaceId}`);
    } catch (error) {
        console.error(`Failed to fetch workspace ${workspaceId}:`, error);
        return null;
    }
};

export const getPostsByWorkspaceId = async (workspaceId: string): Promise<Post[]> => {
    try {
        return await serverFetcher<Post[]>(`/api/contentposts/workspace/${workspaceId}`);
    } catch (error) {
        console.error(`Failed to fetch posts for workspace ${workspaceId}:`, error);
        return [];
    }
};

export async function createWorkspaceAction(payload: CreateWorkspaceDto) {
    
    // Tüm karmaşık fetch mantığı yerine, tek bir satır!
    const newWorkspace = await serverFetcher('/api/workspaces', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    
    revalidatePath('/dashboard');

    return newWorkspace;
}