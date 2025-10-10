import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value; if (!token) {
        return NextResponse.json({ message: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(`${apiUrl}/api/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            // Sunucudan-sunucuya isteklerde cache'i devre dışı bırakmak önemlidir
            cache: 'no-store' 
        });

        const data = await response.json();
        
        if (!response.ok) {
            return NextResponse.json({ message: data.message || 'Profil alınamadı.' }, { status: response.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: 'Sunucu hatası.' }, { status: 500 });
    }
}