import { Workspace } from '@/lib/types';
import { apiClient } from './apiClient';

export const getWorkspace = async (workspaceId: string) => {
  return apiClient<Workspace>(`/workspaces/${workspaceId}`);
};