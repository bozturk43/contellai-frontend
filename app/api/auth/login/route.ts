import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // İstek, backend API'mize gidiyor
    const apiResponse = await fetch(`${apiUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      return NextResponse.json({ message: data.message || 'Giriş başarısız' }, { status: apiResponse.status });
    }

    // Token'ı al ve cookie'ye ayarla
    const response = NextResponse.json({ success: true });
    response.cookies.set('auth_token', data.token, {
      httpOnly: true, // JavaScript'in cookie'ye erişmesini engeller
      secure: process.env.NODE_ENV !== 'development', // Sadece HTTPS'te gönder
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 gün
    });

    return response;

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Bir hata oluştu.' }, { status: 500 });
  }
}