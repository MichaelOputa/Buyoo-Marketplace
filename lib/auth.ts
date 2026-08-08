import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { createServerComponentClient } from '@/lib/supabase-server';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change-me');

export type AuthUser = {
  id: string;
  email: string;
  role: string;
  name: string;
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(user: AuthUser) {
  return new SignJWT({ sub: user.id, email: user.email, role: user.role, name: user.name })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload as { sub: string; email: string; role: string; name: string };
}

export async function getCurrentUser() {
  const supabase = await createServerComponentClient();
  const {
    data: { user: supabaseUser },
  } = await supabase.auth.getUser();

  if (supabaseUser) {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email ?? '',
      name: typeof supabaseUser.user_metadata?.name === 'string' ? supabaseUser.user_metadata.name : '',
      role: typeof supabaseUser.user_metadata?.role === 'string' ? supabaseUser.user_metadata.role : 'CUSTOMER',
    };
  }

  const cookieStore = cookies();
  const token = cookieStore.get('session')?.value;
  if (!token) return null;

  try {
    const payload = await verifySessionToken(token);
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      name: payload.name,
    };
  } catch {
    return null;
  }
}

export function setAuthCookies(token: string, options?: { maxAge?: number }) {
  const cookieStore = cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: options?.maxAge ?? 60 * 60 * 24 * 7,
    path: '/',
  });
}

export function clearAuthCookies() {
  const cookieStore = cookies();
  cookieStore.set('session', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  });
}
