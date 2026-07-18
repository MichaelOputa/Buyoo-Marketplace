'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserPlus, Star } from 'lucide-react';
import { DashboardSidebar, DashboardMobileNav, customerNav } from '@/components/dashboard-sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VerifiedBadge } from '@/components/verified-badge';
import { vendors, formatCount } from '@/lib/data';

export default function FollowingPage() {
  const following = vendors.slice(0, 4);

  return (
    <div className="flex">
      <DashboardSidebar items={customerNav} title="Customer Dashboard" />
      <div className="flex-1">
        <DashboardMobileNav items={customerNav} title="Customer Dashboard" />
        <div className="p-4 md:p-8">
          <h1 className="mb-1 font-display text-2xl font-bold text-navy dark:text-white">Following</h1>
          <p className="mb-8 text-muted-foreground">{following.length} vendors you follow</p>

          <div className="grid gap-4 sm:grid-cols-2">
            {following.map((vendor, i) => (
              <motion.div key={vendor.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Card className="flex items-center gap-4 p-4 transition-all hover:shadow-lg">
                  <Link href={`/vendors/${vendor.id}`}>
                    <img src={vendor.avatar} alt={vendor.name} className="h-16 w-16 rounded-full object-cover" />
                  </Link>
                  <div className="flex-1">
                    <Link href={`/vendors/${vendor.id}`}>
                      <h3 className="flex items-center gap-1 font-semibold text-navy dark:text-white hover:text-primary">
                        {vendor.name}
                        {vendor.verified && <VerifiedBadge className="h-3.5 w-3.5" />}
                      </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground">{vendor.category} · {vendor.city}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{formatCount(vendor.followers)} followers</span>
                      <span className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {vendor.rating}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <UserPlus className="mr-1.5 h-3.5 w-3.5" />
                    Following
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
