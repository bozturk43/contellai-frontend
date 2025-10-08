'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginPayload, LoginResponse, UserProfile } from '@/lib/types';

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

export const AuthProvider = ({ user: initialUser, children }: { user: UserProfile | null, children: ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(initialUser);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const queryClient = useQueryClient();
    useEffect(() => {
        setUser(initialUser);
        setIsLoading(false);
    }, [initialUser]);
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
            setUser(data.user);
            router.push('/dashboard');
            router.refresh();

        },
    });

    const login = (data: LoginPayload) => {
        loginMutation.mutate(data);
    };

    const logout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        setUser(null); 
        queryClient.clear();
        router.push('/login');
        router.refresh();
    };

    const value = {
        user,
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