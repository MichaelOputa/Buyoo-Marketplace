import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { apiError } from '@/lib/api-response';
import { getCurrentUser } from '@/lib/auth';

const vendorSchema = z.object({
  businessName: z.string().min(2).optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  category: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().optional(),
});

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const vendor = await prisma.vendor.findUnique({ where: { id: params.id } });
  if (!vendor) return apiError('Vendor not found.', 'NOT_FOUND', 404);
  return Response.json(vendor);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return apiError('Unauthorized.', 'UNAUTHORIZED', 401);

  const vendor = await prisma.vendor.findUnique({ where: { id: params.id } });
  if (!vendor) return apiError('Vendor not found.', 'NOT_FOUND', 404);

  const currentVendor = await prisma.vendor.findFirst({ where: { userId: user.id } });
  if (!currentVendor || currentVendor.id !== vendor.id) return apiError('Forbidden.', 'FORBIDDEN', 403);

  const body = await request.json();
  const parsed = vendorSchema.safeParse(body);
  if (!parsed.success) return apiError('Invalid vendor payload.', 'INVALID_INPUT', 400);

  const updated = await prisma.vendor.update({ where: { id: params.id }, data: parsed.data });
  return Response.json(updated);
}
