import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { apiError } from '@/lib/api-response';
import { getCurrentUser } from '@/lib/auth';

const orderSchema = z.object({
  vendorId: z.string(),
  productId: z.string(),
  quantity: z.number().int().positive().default(1),
  totalPrice: z.number().positive(),
  deliveryAddress: z.string().optional(),
});

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return apiError('Unauthorized.', 'UNAUTHORIZED', 401);

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '10');
  const skip = (page - 1) * limit;

  const orders = await prisma.order.findMany({
    where: { buyerId: user.id },
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
  const total = await prisma.order.count({ where: { buyerId: user.id } });
  return Response.json({ items: orders, page, limit, total });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return apiError('Unauthorized.', 'UNAUTHORIZED', 401);

  const body = await request.json();
  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) return apiError('Invalid order payload.', 'INVALID_INPUT', 400);

  const order = await prisma.order.create({ data: { buyerId: user.id, ...parsed.data } });
  return Response.json(order, { status: 201 });
}
