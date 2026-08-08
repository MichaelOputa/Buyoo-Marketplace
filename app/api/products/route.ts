import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { apiError } from '@/lib/api-response';
import { getCurrentUser } from '@/lib/auth';

const productSchema = z.object({
  vendorId: z.string(),
  title: z.string().min(2),
  description: z.string().min(10),
  category: z.string(),
  price: z.number().positive(),
  discountPrice: z.number().optional(),
  images: z.array(z.string()).default([]),
  condition: z.string().default('New'),
  deliveryScope: z.string().default('Local'),
  buyooProtected: z.boolean().default(false),
  quantity: z.number().int().default(1),
  isSponsored: z.boolean().default(false),
  status: z.enum(['DRAFT', 'ACTIVE', 'SOLD', 'ARCHIVED']).default('ACTIVE'),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '10');
  const skip = (page - 1) * limit;

  const products = await prisma.product.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: { vendor: true },
  });

  const total = await prisma.product.count();
  return Response.json({ items: products, page, limit, total });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return apiError('Unauthorized.', 'UNAUTHORIZED', 401);

  const body = await request.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) return apiError('Invalid product payload.', 'INVALID_INPUT', 400);

  const vendor = await prisma.vendor.findFirst({ where: { userId: user.id } });
  if (!vendor) return apiError('Vendor profile not found.', 'VENDOR_REQUIRED', 403);

  const product = await prisma.product.create({
    data: { ...parsed.data, vendorId: vendor.id },
  });

  return Response.json(product, { status: 201 });
}
