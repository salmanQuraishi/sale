import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createAdminSessionValue, getAdminSessionCookieName, isValidAdminCredentials, ADMIN_EMAIL } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!isValidAdminCredentials(email, password)) {
    return NextResponse.redirect(new URL('/admin/login?error=1', request.url));
  }

  const cookieStore = await cookies();
  cookieStore.set(getAdminSessionCookieName(), createAdminSessionValue(ADMIN_EMAIL), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.redirect(new URL('/admin', request.url));
}
