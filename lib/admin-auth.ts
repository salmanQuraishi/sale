import crypto from 'crypto';

export const ADMIN_EMAIL = 'admin@example.com';
export const ADMIN_PASSWORD = 'Admin@12345';
const SESSION_COOKIE = 'admin_session';
const SECRET = 'hardcoded-demo-secret-change-this-in-production';

export function getAdminSessionCookieName() {
  return SESSION_COOKIE;
}

export function isValidAdminCredentials(email: string, password: string) {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export function createAdminSessionValue(email: string) {
  return crypto.createHmac('sha256', SECRET).update(email).digest('hex');
}

export function isValidAdminSession(sessionValue?: string) {
  if (!sessionValue) return false;
  const expected = createAdminSessionValue(ADMIN_EMAIL);
  return crypto.timingSafeEqual(Buffer.from(sessionValue), Buffer.from(expected));
}
