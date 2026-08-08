import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 12);

  const customer = await prisma.user.upsert({
    where: { email: 'customer@buyoo.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'customer@buyoo.com',
      passwordHash,
      role: 'CUSTOMER',
      emailVerified: true,
    },
  });

  const vendor = await prisma.user.upsert({
    where: { email: 'vendor@buyoo.com' },
    update: {},
    create: {
      name: 'Ada Okafor',
      email: 'vendor@buyoo.com',
      passwordHash,
      role: 'VENDOR',
      emailVerified: true,
    },
  });

  const vendorProfile = await prisma.vendor.upsert({
    where: { userId: vendor.id },
    update: {},
    create: {
      userId: vendor.id,
      businessName: 'TechHub Lagos',
      handle: '@techhublagos',
      bio: 'Premium electronics retailer with doorstep delivery.',
      location: 'Lekki Phase 1',
      category: 'Electronics',
      phone: '+2348012345678',
      email: 'hello@techhublagos.com',
      website: 'techhublagos.com',
      followerCount: 12400,
      rating: 4.8,
    },
  });

  await prisma.product.upsert({
    where: { id: 'seed-product-1' },
    update: {},
    create: {
      id: 'seed-product-1',
      vendorId: vendorProfile.id,
      title: 'iPhone 15 Pro Max 256GB',
      description: 'Brand new iPhone 15 Pro Max, 256GB, Natural Titanium.',
      category: 'Electronics',
      price: 1250000,
      discountPrice: 1150000,
      images: ['https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=800'],
      condition: 'New',
      deliveryScope: 'Nationwide',
      buyooProtected: true,
      quantity: 12,
      isSponsored: true,
      status: 'ACTIVE',
    },
  });

  await prisma.category.upsert({ where: { name: 'Electronics' }, update: {}, create: { name: 'Electronics', slug: 'electronics', listingCount: 120 } });
  await prisma.category.upsert({ where: { name: 'Fashion' }, update: {}, create: { name: 'Fashion', slug: 'fashion', listingCount: 80 } });
  await prisma.market.createMany({ data: [{ name: 'Computer Village', location: 'Ikeja', lat: 6.607, lng: 3.351, marketDays: ['Monday', 'Tuesday', 'Wednesday'], openHours: '9am - 6pm' }], skipDuplicates: true });
  await prisma.rider.createMany({ data: [{ userId: customer.id, vehicleType: 'Bike', isAvailable: true, currentLat: 6.5244, currentLng: 3.3792 }], skipDuplicates: true });
  await prisma.errandPro.createMany({ data: [{ userId: customer.id, services: ['Delivery', 'Errands'], isAvailable: true }], skipDuplicates: true });
  console.log('Seed data created');
}

main().finally(() => prisma.$disconnect());
