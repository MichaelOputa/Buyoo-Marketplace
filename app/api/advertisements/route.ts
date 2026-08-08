import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { apiError } from '@/lib/api-response';
import { getCurrentUser } from '@/lib/auth';

const advertisementSchema = z.object({
  vendorId: z.string(),
  productId: z.string().optional(),
  placement: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  isActive: z.boolean().default(true),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '10');
  const skip = (page - 1) * limit;

  const items = await prisma.advertisement.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } });
  const total = await prisma.advertisement.count();
  return Response.json({ items, page, limit, total });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return apiError('Unauthorized.', 'UNAUTHORIZED', 401);

  const body = await request.json();
  const parsed = advertisementSchema.safeParse(body);
  if (!parsed.success) return apiError('Invalid advertisement payload.', 'INVALID_INPUT', 400);

  const vendor = await prisma.vendor.findFirst({ where: { userId: user.id } });
  if (!vendor) return apiError('Vendor profile not found.', 'VENDOR_REQUIRED', 403);

  const ad = await prisma.advertisement.create({ data: { ...parsed.data, vendorId: vendor.id, startDate: new Date(parsed.data.startDate), endDate: new Date(parsed.data.endDate) } });
  return Response.json(ad, { status: 201 });
}
