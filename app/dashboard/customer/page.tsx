'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  Bell,
  Eye,
  MapPin,
  Star,
  Package,
  TrendingUp,
  Settings,
  Download,
  Trash2,
  Cookie,
  Mail,
  Shield,
} from 'lucide-react';
import { DashboardSidebar, DashboardMobileNav, customerNav } from '@/components/dashboard-sidebar';
import { StatCard } from '@/components/stat-card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VerifiedBadge } from '@/components/verified-badge';
import { products, vendors, getVendorById, formatPrice, formatCount } from '@/lib/data';

export default function CustomerDashboard() {
  const savedProducts = products.slice(0, 3);
  const followingVendors = vendors.slice(0, 4);
  const recentProducts = products.slice(0, 4);

  return (
    <div className="flex">
      <DashboardSidebar items={customerNav} title="Customer Dashboard" />
      <div className="flex-1">
        <DashboardMobileNav items={customerNav} title="Customer Dashboard" />
        <div className="p-4 md:p-8">
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold text-navy dark:text-white">
              Welcome back, John!
            </h1>
            <p className="mt-1 text-muted-foreground">
              Here&apos;s what&apos;s happening around you
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Saved Products" value="24" change="+3" icon={Heart} color="bg-primary/10 text-primary" delay={0} />
            <StatCard label="Active Orders" value="3" change="+1" icon={ShoppingBag} color="bg-secondary/10 text-secondary" delay={0.05} />
            <StatCard label="Unread Messages" value="7" icon={MessageCircle} color="bg-blue-500/10 text-blue-600" delay={0.1} />
            <StatCard label="Notifications" value="12" icon={Bell} color="bg-amber-500/10 text-amber-600" delay={0.15} />
          </div>

          {/* Saved products */}
          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-navy dark:text-white">
                Saved Products
              </h2>
              <Link href="/dashboard/customer/liked" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedProducts.map((product, i) => {
                const vendor = getVendorById(product.vendorId);
                if (!vendor) return null;
                return (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                    <Link href={`/marketplace/${product.id}`}>
                      <Card className="flex gap-3 p-3 transition-all hover:shadow-lg">
                        <img src={product.images[0]} alt={product.title} className="h-20 w-20 rounded-xl object-cover" />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-navy dark:text-white">{product.title}</h3>
                          <p className="mt-1 text-sm font-bold text-primary">{formatPrice(product.price, product.currency)}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{vendor.name} · {product.city}</p>
                        </div>
                        <Heart className="h-4 w-4 fill-destructive text-destructive" />
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Following */}
          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-navy dark:text-white">
                Following
              </h2>
              <Link href="/dashboard/customer/following" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {followingVendors.map((vendor, i) => (
                <motion.div key={vendor.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Link href={`/vendors/${vendor.id}`}>
                    <Card className="flex flex-col items-center p-4 text-center transition-all hover:shadow-lg">
                      <img src={vendor.avatar} alt={vendor.name} className="h-14 w-14 rounded-full object-cover" />
                      <h3 className="mt-2 flex items-center gap-1 text-sm font-medium text-navy dark:text-white">
                        {vendor.name}
                        {vendor.verified && <VerifiedBadge className="h-3 w-3" />}
                      </h3>
                      <p className="text-xs text-muted-foreground">{formatCount(vendor.followers)} followers</p>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Recently viewed */}
          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-navy dark:text-white">
                Recently Viewed
              </h2>
              <Link href="/dashboard/customer/recent" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {recentProducts.map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                  <Link href={`/marketplace/${product.id}`}>
                    <Card className="group overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative aspect-square overflow-hidden">
                        <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                      </div>
                      <div className="p-3">
                        <h3 className="truncate text-sm font-medium text-navy dark:text-white">{product.title}</h3>
                        <p className="mt-1 text-sm font-bold text-primary">{formatPrice(product.price, product.currency)}</p>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Nearby recommendations */}
          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-navy dark:text-white">
                Nearby Recommendations
              </h2>
              <Link href="/vendors" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {vendors.slice(0, 3).map((vendor, i) => (
                <motion.div key={vendor.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link href={`/vendors/${vendor.id}`}>
                    <Card className="flex items-center gap-3 p-4 transition-all hover:shadow-lg">
                      <img src={vendor.avatar} alt={vendor.name} className="h-12 w-12 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h3 className="flex items-center gap-1 text-sm font-semibold text-navy dark:text-white">
                          {vendor.name}
                          {vendor.verified && <VerifiedBadge className="h-3.5 w-3.5" />}
                        </h3>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {vendor.location}, {vendor.city}
                        </p>
                      </div>
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                        <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {vendor.rating}
                      </Badge>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
