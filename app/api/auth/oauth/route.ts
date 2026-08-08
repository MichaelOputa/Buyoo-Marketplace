import { NextResponse } from 'next/server';
import { z } from 'zod';
import { apiError } from '@/lib/api-response';

const oauthSchema = z.object({
  provider: z.enum(['google', 'apple']),
  redirectTo: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = oauthSchema.safeParse(body);
    if (!parsed.success) {
      return apiError('Invalid OAuth payload.', 'INVALID_INPUT', 400);
    }

    const { provider, redirectTo } = parsed.data;
    const redirectUrl = redirectTo || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`;

    return NextResponse.json({
      provider,
      redirectTo: redirectUrl,
      message: 'Use your Supabase project OAuth settings to complete this sign-in.',
    });
  } catch {
    return apiError('OAuth sign-in failed.', 'OAUTH_FAILED', 500);
  }
}
