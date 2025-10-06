// Bu fonksiyon, tüm API isteklerimiz için merkezi bir nokta olacak.
export const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }), // Koşullu ekleme
  };

  const response = await fetch(`${baseUrl}/api${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `API isteği başarısız: ${response.statusText}`);
  }

  // Cevap gövdesi boş olabilecek DELETE gibi metotlar için kontrol
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
};