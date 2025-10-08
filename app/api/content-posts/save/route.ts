import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value; if (!token) {
        return NextResponse.json({ message: 'Yetkisiz erişim.' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const apiResponse = await fetch(`${apiUrl}/api/contentposts/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body),
        });

        const data = await apiResponse.json();
        if (!apiResponse.ok) {
            return NextResponse.json({ message: data.message || 'İçerik kaydedilemedi.' }, { status: apiResponse.status });
        }
        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json({ message: 'Bir hata oluştu.' }, { status: 500 });
    }
}