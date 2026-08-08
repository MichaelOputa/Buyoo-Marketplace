import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { apiError } from '@/lib/api-response';
import { getCurrentUser } from '@/lib/auth';

const messageSchema = z.object({ receiverId: z.string(), body: z.string().min(1), conversationId: z.string().optional() });

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return apiError('Unauthorized.', 'UNAUTHORIZED', 401);

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '10');
  const skip = (page - 1) * limit;

  const messages = await prisma.message.findMany({ where: { OR: [{ senderId: user.id }, { receiverId: user.id }] }, skip, take: limit, orderBy: { createdAt: 'desc' } });
  const total = await prisma.message.count({ where: { OR: [{ senderId: user.id }, { receiverId: user.id }] } });
  return Response.json({ items: messages, page, limit, total });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return apiError('Unauthorized.', 'UNAUTHORIZED', 401);

  const body = await request.json();
  const parsed = messageSchema.safeParse(body);
  if (!parsed.success) return apiError('Invalid message payload.', 'INVALID_INPUT', 400);

  const message = await prisma.message.create({ data: { senderId: user.id, receiverId: parsed.data.receiverId, conversationId: parsed.data.conversationId || 'default', body: parsed.data.body } });
  return Response.json(message, { status: 201 });
}
