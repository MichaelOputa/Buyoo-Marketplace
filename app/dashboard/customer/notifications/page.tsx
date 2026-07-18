'use client';

import { motion } from 'framer-motion';
import { Bell, ShoppingBag, Heart, UserPlus, MessageCircle, Star } from 'lucide-react';
import { DashboardSidebar, DashboardMobileNav, customerNav } from '@/components/dashboard-sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const notifications = [
  { id: 1, icon: ShoppingBag, title: 'Order Delivered', message: 'Your order #ORD-2401 has been delivered to Lekki Phase 1.', time: '2 hours ago', color: 'bg-secondary/10 text-secondary', unread: true },
  { id: 2, icon: Heart, title: 'New Like', message: 'TechHub Lagos liked your review on iPhone 15 Pro Max.', time: '5 hours ago', color: 'bg-rose-500/10 text-rose-600', unread: true },
  { id: 3, icon: UserPlus, title: 'New Follower', message: 'Ada\'s Fashion House started following you.', time: '1 day ago', color: 'bg-blue-500/10 text-blue-600', unread: true },
  { id: 4, icon: MessageCircle, title: 'New Message', message: 'GreenFarm Produce replied to your inquiry about organic vegetables.', time: '1 day ago', color: 'bg-amber-500/10 text-amber-600', unread: false },
  { id: 5, icon: Star, title: 'Price Drop', message: 'An item on your wishlist (Toyota Camry 2018) has dropped in price.', time: '2 days ago', color: 'bg-primary/10 text-primary', unread: false },
  { id: 6, icon: ShoppingBag, title: 'Order Shipped', message: 'Your order #ORD-2402 is in transit. Arriving tomorrow.', time: '3 days ago', color: 'bg-blue-500/10 text-blue-600', unread: false },
];

export default function NotificationsPage() {
  return (
    <div className="flex">
      <DashboardSidebar items={customerNav} title="Customer Dashboard" />
      <div className="flex-1">
        <DashboardMobileNav items={customerNav} title="Customer Dashboard" />
        <div className="p-4 md:p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-navy dark:text-white">Notifications</h1>
              <p className="mt-1 text-muted-foreground">3 unread notifications</p>
            </div>
            <Button variant="outline" size="sm">Mark all read</Button>
          </div>

          <div className="space-y-3">
            {notifications.map((notif, i) => (
              <motion.div key={notif.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                <Card className={`flex items-start gap-4 p-4 transition-all hover:shadow-md ${notif.unread ? 'border-primary/30 bg-primary/5' : ''}`}>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${notif.color}`}>
                    <notif.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-navy dark:text-white">{notif.title}</h3>
                      {notif.unread && <span className="h-2 w-2 rounded-full bg-primary" />}
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{notif.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{notif.time}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
