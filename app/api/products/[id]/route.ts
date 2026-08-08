import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { apiError } from '@/lib/api-response';
import { getCurrentUser } from '@/lib/auth';

const productSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  category: z.string().optional(),
  price: z.number().positive().optional(),
  discountPrice: z.number().optional(),
  images: z.array(z.string()).optional(),
  condition: z.string().optional(),
  deliveryScope: z.string().optional(),
  buyooProtected: z.boolean().optional(),
  quantity: z.number().int().optional(),
  isSponsored: z.boolean().optional(),
  status: z.enum(['DRAFT', 'ACTIVE', 'SOLD', 'ARCHIVED']).optional(),
});

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id }, include: { vendor: true } });
  if (!product) return apiError('Product not found.', 'NOT_FOUND', 404);
  return Response.json(product);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return apiError('Unauthorized.', 'UNAUTHORIZED', 401);

  const product = await prisma.product.findUnique({ where: { id: params.id }, include: { vendor: true } });
  if (!product) return apiError('Product not found.', 'NOT_FOUND', 404);

  const vendor = await prisma.vendor.findFirst({ where: { userId: user.id } });
  if (!vendor || product.vendorId !== vendor.id) return apiError('Forbidden.', 'FORBIDDEN', 403);

  const body = await request.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) return apiError('Invalid product payload.', 'INVALID_INPUT', 400);

  const updated = await prisma.product.update({ where: { id: params.id }, data: parsed.data });
  return Response.json(updated);
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return apiError('Unauthorized.', 'UNAUTHORIZED', 401);

  const product = await prisma.product.findUnique({ where: { id: params.id }, include: { vendor: true } });
  if (!product) return apiError('Product not found.', 'NOT_FOUND', 404);

  const vendor = await prisma.vendor.findFirst({ where: { userId: user.id } });
  if (!vendor || product.vendorId !== vendor.id) return apiError('Forbidden.', 'FORBIDDEN', 403);

  await prisma.product.delete({ where: { id: params.id } });
  return Response.json({ success: true });
}
