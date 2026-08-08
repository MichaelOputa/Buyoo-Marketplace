import { prisma } from '@/lib/prisma';
import { apiError } from '@/lib/api-response';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return apiError('Unauthorized.', 'UNAUTHORIZED', 401);

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '10');
  const skip = (page - 1) * limit;

  const conversations = await prisma.conversation.findMany({ skip, take: limit, orderBy: { lastMessageAt: 'desc' } });
  const total = await prisma.conversation.count();
  return Response.json({ items: conversations, page, limit, total });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return apiError('Unauthorized.', 'UNAUTHORIZED', 401);

  const body = await request.json();
  const conversation = await prisma.conversation.create({ data: { participantIds: [user.id, body.receiverId].sort(), lastMessageAt: new Date() } });
  return Response.json(conversation, { status: 201 });
}
