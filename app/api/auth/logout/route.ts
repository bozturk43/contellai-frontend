import { NextResponse } from 'next/server';

export async function POST() {
  // Cookie'yi sil
  const response = NextResponse.json({ success: true });
  response.cookies.delete('auth_token');
  return response;
}   