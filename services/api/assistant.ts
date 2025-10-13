import { apiClient } from './apiClient';
import { type ChatMessage } from '@/lib/types';

export const getChatHistory = async (): Promise<ChatMessage[]> => {
  return apiClient<ChatMessage[]>('/assistant/history');
};