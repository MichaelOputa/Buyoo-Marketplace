import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { apiError } from '@/lib/api-response';
import { getCurrentUser } from '@/lib/auth';

const wishlistSchema = z.object({ productId: z.string() });

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return apiError('Unauthorized.', 'UNAUTHORIZED', 401);

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '10');
  const skip = (page - 1) * limit;

  const wishlist = await prisma.wishlist.findMany({ where: { userId: user.id }, skip, take: limit, orderBy: { createdAt: 'desc' } });
  const total = await prisma.wishlist.count({ where: { userId: user.id } });
  return Response.json({ items: wishlist, page, limit, total });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return apiError('Unauthorized.', 'UNAUTHORIZED', 401);

  const body = await request.json();
  const parsed = wishlistSchema.safeParse(body);
  if (!parsed.success) return apiError('Invalid wishlist payload.', 'INVALID_INPUT', 400);

  const existing = await prisma.wishlist.findFirst({ where: { userId: user.id, productId: parsed.data.productId } });
  if (existing) return Response.json(existing);

  const item = await prisma.wishlist.create({ data: { userId: user.id, productId: parsed.data.productId } });
  return Response.json(item, { status: 201 });
}
