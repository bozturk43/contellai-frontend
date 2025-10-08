import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { workspaceId: string } }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value; if (!token) {
        return NextResponse.json({ message: 'Yetkisiz erişim.' }, { status: 401 });
    }    if (!token) {
        return NextResponse.json({ message: 'Yetkisiz erişim.' }, { status: 401 });
    }
    if (!token) {
        return NextResponse.json({ message: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/contentposts/workspace/${params.workspaceId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
}