import { prisma } from '@/lib/prisma';
import { apiError } from '@/lib/api-response';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() ?? '';
  if (!q) return Response.json({ items: [] });

  const [products, vendors] = await Promise.all([
    prisma.product.findMany({ where: { OR: [{ title: { contains: q, mode: 'insensitive' } }, { description: { contains: q, mode: 'insensitive' } }] }, take: 10 }),
    prisma.vendor.findMany({ where: { OR: [{ businessName: { contains: q, mode: 'insensitive' } }, { category: { contains: q, mode: 'insensitive' } }] }, take: 10 }),
  ]);

  return Response.json({ products, vendors });
}
