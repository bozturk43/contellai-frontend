import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const apiResponse = await fetch(`${apiUrl}/api/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await apiResponse.json();
        if (!apiResponse.ok) {
            return NextResponse.json({ message: data.message || 'Kayıt başarısız' }, { status: apiResponse.status });
        }

        const response = NextResponse.json(data);
        response.cookies.set('auth_token', data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            path: '/',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
        }); 
        return response;

    } catch (error) {
        return NextResponse.json({ message: 'Bir hata oluştu.' }, { status: 500 });
    }
}