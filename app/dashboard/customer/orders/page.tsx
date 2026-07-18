'use client';

import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { DashboardSidebar, DashboardMobileNav, customerNav } from '@/components/dashboard-sidebar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { products, getVendorById, formatPrice } from '@/lib/data';

const orders = [
  { id: 'ORD-2401', product: products[0], status: 'Delivered', date: 'Jan 12, 2024', tracking: 'Delivered to Lekki Phase 1' },
  { id: 'ORD-2402', product: products[1], status: 'In Transit', date: 'Jan 14, 2024', tracking: 'Arriving tomorrow' },
  { id: 'ORD-2403', product: products[2], status: 'Processing', date: 'Jan 15, 2024', tracking: 'Vendor preparing order' },
  { id: 'ORD-2404', product: products[4], status: 'Delivered', date: 'Jan 10, 2024', tracking: 'Delivered to Victoria Island' },
];

const statusConfig: Record<string, { color: string; icon: typeof Package }> = {
  Delivered: { color: 'bg-secondary/10 text-secondary', icon: CheckCircle2 },
  'In Transit': { color: 'bg-blue-500/10 text-blue-600', icon: Truck },
  Processing: { color: 'bg-amber-500/10 text-amber-600', icon: Clock },
};

export default function OrdersPage() {
  return (
    <div className="flex">
      <DashboardSidebar items={customerNav} title="Customer Dashboard" />
      <div className="flex-1">
        <DashboardMobileNav items={customerNav} title="Customer Dashboard" />
        <div className="p-4 md:p-8">
          <h1 className="mb-1 font-display text-2xl font-bold text-navy dark:text-white">My Orders</h1>
          <p className="mb-8 text-muted-foreground">Track and manage your purchases</p>

          <div className="space-y-4">
            {orders.map((order, i) => {
              const vendor = getVendorById(order.product.vendorId);
              const StatusIcon = statusConfig[order.status].icon;
              return (
                <motion.div key={order.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Card className="overflow-hidden">
                    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                      <img src={order.product.images[0]} alt={order.product.title} className="h-20 w-20 rounded-xl object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-navy dark:text-white">{order.product.title}</h3>
                          <Badge className={statusConfig[order.status].color}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {order.status}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{vendor?.name}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {order.tracking}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">Order #{order.id} · {order.date}</p>
                      </div>
                      <div className="flex flex-col items-start gap-2 sm:items-end">
                        <span className="font-bold text-primary">{formatPrice(order.product.price, order.product.currency)}</span>
                        <Button variant="outline" size="sm">View Details</Button>
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
