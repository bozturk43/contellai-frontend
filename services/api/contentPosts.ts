import { CreateContentPostPayload, GeneratedContentResult, Post, SaveContentPostDto } from '@/lib/types';
import { apiClient } from './apiClient';




export const generateContentPreview = async (payload: CreateContentPostPayload): Promise<GeneratedContentResult> => {
  const response = await fetch('/api/content-posts/generate-preview', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'İçerik üretme işlemi başarısız.');
  }

  return response.json();
};
export const getPostsByWorkspace = async (workspaceId: string): Promise<Post[]> => {
    return apiClient<Post[]>(`/content-posts/workspace/${workspaceId}`);
};
export const saveContentPost = async (payload: SaveContentPostDto) => {
  const response = await fetch('/api/content-posts/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'İçerik kaydetme işlemi başarısız.');
  }

  return response.json();
};