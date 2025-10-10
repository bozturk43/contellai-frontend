// Tipleri merkezi bir yerden alalım
import { type UserProfile } from '@/lib/types';

// Bu fonksiyon, tarayıcıda çalışır ve Next.js'in proxy rotasını çağırır.
export const getMyProfile = async (): Promise<UserProfile> => {
  
  // Tam URL yazmıyoruz, çünkü zaten aynı sunucudayız.
  const response = await fetch('/api/me'); 

  if (!response.ok) {
    throw new Error('Profil bilgisi alınamadı.');
  }
  return response.json();
};