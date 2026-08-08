import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { apiError } from '@/lib/api-response';
import { hashPassword } from '@/lib/auth';

const resetSchema = z.object({ email: z.string().email(), password: z.string().min(8) });

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = resetSchema.safeParse(body);
  if (!parsed.success) return apiError('Invalid reset payload.', 'INVALID_INPUT', 400);

  const passwordHash = await hashPassword(parsed.data.password);
  await prisma.user.update({ where: { email: parsed.data.email }, data: { passwordHash } });
  return Response.json({ message: 'Password reset successfully.' });
}
