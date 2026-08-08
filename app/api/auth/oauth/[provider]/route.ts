import { z } from 'zod';
import { apiError } from '@/lib/api-response';

const providerSchema = z.object({ provider: z.string() });

export async function POST(request: Request, { params }: { params: { provider: string } }) {
  const body = await request.json().catch(() => ({}));
  const parsed = providerSchema.safeParse({ provider: params.provider, ...body });
  if (!parsed.success) return apiError('Invalid OAuth payload.', 'INVALID_INPUT', 400);
  return Response.json({ message: `${params.provider} OAuth flow stubbed.` });
}
