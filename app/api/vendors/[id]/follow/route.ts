import { prisma } from '@/lib/prisma';
import { apiError } from '@/lib/api-response';
import { getCurrentUser } from '@/lib/auth';

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return apiError('Unauthorized.', 'UNAUTHORIZED', 401);

  const vendor = await prisma.vendor.findUnique({ where: { id: params.id } });
  if (!vendor) return apiError('Vendor not found.', 'NOT_FOUND', 404);

  const existing = await prisma.follow.findFirst({ where: { followerId: user.id, vendorId: vendor.id } });
  if (existing) return Response.json({ message: 'Already following.' });

  await prisma.follow.create({ data: { followerId: user.id, vendorId: vendor.id } });
  await prisma.vendor.update({ where: { id: vendor.id }, data: { followerCount: { increment: 1 } } });
  return Response.json({ message: 'Followed successfully.' });
}
