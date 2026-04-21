import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAdminSessionCookieName } from '@/lib/admin-auth';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(getAdminSessionCookieName(), '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });

  return NextResponse.redirect(new URL('/admin/login', 'http://localhost:3000'));
}
