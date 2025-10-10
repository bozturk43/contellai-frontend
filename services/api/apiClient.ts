export const apiClient = async <T>(
  endpoint: string, // örn: '/workspaces/123-abc'
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `API isteği başarısız: ${response.status}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
};