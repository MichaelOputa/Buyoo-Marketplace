'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { DashboardSidebar, DashboardMobileNav, customerNav } from '@/components/dashboard-sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { products, getVendorById, formatPrice, formatCount } from '@/lib/data';

export default function LikedProductsPage() {
  const liked = products.slice(0, 6);

  return (
    <div className="flex">
      <DashboardSidebar items={customerNav} title="Customer Dashboard" />
      <div className="flex-1">
        <DashboardMobileNav items={customerNav} title="Customer Dashboard" />
        <div className="p-4 md:p-8">
          <h1 className="mb-1 font-display text-2xl font-bold text-navy dark:text-white">Liked Products</h1>
          <p className="mb-8 text-muted-foreground">Products you&apos;ve liked across the marketplace</p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {liked.map((product, i) => {
              const vendor = getVendorById(product.vendorId);
              return (
                <motion.div key={product.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}>
                  <Card className="group overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-square overflow-hidden">
                      <Link href={`/marketplace/${product.id}`}>
                        <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                      </Link>
                      <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-xs backdrop-blur">
                        <Heart className="h-3 w-3 fill-destructive text-destructive" />
                        {formatCount(product.likes)}
                      </div>
                    </div>
                    <div className="p-3">
                      <Link href={`/marketplace/${product.id}`}>
                        <h3 className="truncate text-sm font-medium text-navy dark:text-white hover:text-primary">{product.title}</h3>
                      </Link>
                      <p className="mt-0.5 text-xs text-muted-foreground">{vendor?.name}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-bold text-primary">{formatPrice(product.price, product.currency)}</span>
                        <div className="flex items-center gap-0.5 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {product.rating}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
