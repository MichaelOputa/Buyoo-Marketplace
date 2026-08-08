import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { apiError } from '@/lib/api-response';
import { getCurrentUser } from '@/lib/auth';

const reviewSchema = z.object({
  productId: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '10');
  const skip = (page - 1) * limit;

  const reviews = await prisma.review.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } });
  const total = await prisma.review.count();
  return Response.json({ items: reviews, page, limit, total });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return apiError('Unauthorized.', 'UNAUTHORIZED', 401);

  const body = await request.json();
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) return apiError('Invalid review payload.', 'INVALID_INPUT', 400);

  const review = await prisma.review.create({ data: { userId: user.id, ...parsed.data } });
  return Response.json(review, { status: 201 });
}
