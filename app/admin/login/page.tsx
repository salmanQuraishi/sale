import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAdminSessionCookieName, isValidAdminSession, ADMIN_EMAIL, ADMIN_PASSWORD } from '@/lib/admin-auth';

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get(getAdminSessionCookieName())?.value;

  if (isValidAdminSession(session)) {
    redirect('/admin');
  }

  const params = (await searchParams) ?? {};

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Admin Login</h1>
            <p className="mt-2 text-slate-600">Login with hardcoded admin email and password to view orders.</p>
          </div>

          {params.error ? (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              Invalid email or password.
            </div>
          ) : null}

          <form action="/api/admin/login" method="POST" className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                required
                defaultValue={ADMIN_EMAIL}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
              <input
                type="password"
                name="password"
                required
                defaultValue={ADMIN_PASSWORD}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
              />
            </div>

            <button className="w-full rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white">
              Login
            </button>
          </form>

          <p className="mt-6 text-xs leading-6 text-slate-500">
            Demo credentials are prefilled for testing. Change them in <code>lib/admin-auth.ts</code> before using this project live.
          </p>
        </div>
      </div>
    </main>
  );
}
