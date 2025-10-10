'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginPayload, LoginResponse, UserProfile } from '@/lib/types';
import { getMyProfile } from '@/services/api/profile';


// Mutation durumunu da dışarıya aktarabilmek için context tipini genişletiyoruz
interface AuthContextType {
    user: UserProfile | null;
    logout: () => Promise<void>;
    login: (data: LoginPayload) => void;
    loginMutation: {
        isPending: boolean;
        isError: boolean;
        error: Error | null;
    };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: user, isLoading } = useQuery({
        queryKey: ['profile'], // Bu sorgu için benzersiz anahtar: 'profile'
        queryFn: getMyProfile, // Veriyi tazelemek için bu fonksiyonu çağıracak
        retry: false, // Eğer ilk istekte hata alırsa (401 gibi), tekrar denemesin.
        refetchOnWindowFocus: false, // Pencereye odaklanıldığında tekrar çekmesin.
        staleTime: Infinity, // Otomatik olarak yeniden çekmesini engelle, biz manuel yapacağız
    });
    const loginMutation = useMutation({
        mutationFn: async (payload: LoginPayload): Promise<LoginResponse> => {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Giriş işlemi başarısız.');
            }
            return response.json();
        },
        onSuccess: (data) => {

            console.log("Login başarılı, user verisi geldi:", data);

            // 1. Önce state'i güncelle. Bu senkron bir işlemdir ve anında gerçekleşir.
            queryClient.setQueryData(['profile'], data.user);
            console.log("Query Cache güncellendi. Navbar'ın şimdi değişmesi lazım.");

            // 2. Yönlendirmeyi 50 milisaniye gibi çok kısa bir süre geciktir.
            //    Bu, React'e state değişikliğini fark edip arayüzü yeniden çizmesi için zaman tanır.
            setTimeout(() => {
                console.log("Yönlendirme (router.push) şimdi çalışıyor...");
                router.push('/dashboard');
            }, 50);
        },
    });

    const login = (data: LoginPayload) => {
        loginMutation.mutate(data);
    };

    const logout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        queryClient.setQueryData(['profile'], null);
        router.push('/login');
    };

    const value = {
        user: user || null,
        logout,
        login,
        loginMutation: {
            isPending: loginMutation.isPending,
            isError: loginMutation.isError,
            error: loginMutation.error,
        }
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};