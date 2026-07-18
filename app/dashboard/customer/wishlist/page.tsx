'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import { DashboardSidebar, DashboardMobileNav, customerNav } from '@/components/dashboard-sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { products, getVendorById, formatPrice } from '@/lib/data';

export default function WishlistPage() {
  const wishlist = products.slice(0, 4);

  return (
    <div className="flex">
      <DashboardSidebar items={customerNav} title="Customer Dashboard" />
      <div className="flex-1">
        <DashboardMobileNav items={customerNav} title="Customer Dashboard" />
        <div className="p-4 md:p-8">
          <h1 className="mb-1 font-display text-2xl font-bold text-navy dark:text-white">My Wishlist</h1>
          <p className="mb-8 text-muted-foreground">{wishlist.length} items saved for later</p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((product, i) => {
              const vendor = getVendorById(product.vendorId);
              return (
                <motion.div key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Card className="group overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-square overflow-hidden">
                      <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur hover:bg-white"
                      >
                        <Heart className="h-4 w-4 fill-destructive text-destructive" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <Link href={`/marketplace/${product.id}`}>
                        <h3 className="font-medium text-navy dark:text-white hover:text-primary">{product.title}</h3>
                      </Link>
                      <p className="mt-0.5 text-xs text-muted-foreground">{vendor?.name}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-bold text-primary">{formatPrice(product.price, product.currency)}</span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {product.rating}
                        </div>
                      </div>
                      <Button className="mt-3 w-full" size="sm">Move to Cart</Button>
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
