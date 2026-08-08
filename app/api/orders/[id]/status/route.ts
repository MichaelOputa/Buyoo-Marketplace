import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { apiError } from '@/lib/api-response';
import { getCurrentUser } from '@/lib/auth';

const statusSchema = z.object({ status: z.enum(['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED']) });

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return apiError('Unauthorized.', 'UNAUTHORIZED', 401);

  const order = await prisma.order.findUnique({ where: { id: params.id } });
  if (!order) return apiError('Order not found.', 'NOT_FOUND', 404);

  const vendor = await prisma.vendor.findFirst({ where: { userId: user.id } });
  if (!vendor || vendor.id !== order.vendorId) return apiError('Forbidden.', 'FORBIDDEN', 403);

  const body = await request.json();
  const parsed = statusSchema.safeParse(body);
  if (!parsed.success) return apiError('Invalid status payload.', 'INVALID_INPUT', 400);

  const updated = await prisma.order.update({ where: { id: params.id }, data: { status: parsed.data.status } });
  return Response.json(updated);
}
