import { prisma } from '@/lib/prisma';
import { apiError } from '@/lib/api-response';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '10');
  const skip = (page - 1) * limit;

  const vendors = await prisma.vendor.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } });
  const total = await prisma.vendor.count();
  return Response.json({ items: vendors, page, limit, total });
}
