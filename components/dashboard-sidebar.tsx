'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Heart,
  ShoppingBag,
  MessageCircle,
  Bell,
  Settings,
  Eye,
  MapPin,
  Package,
  BarChart3,
  DollarSign,
  Users,
  Percent,
  Megaphone,
  CreditCard,
  FileText,
  Calendar,
  Hammer,
  Handshake,
  Wallet,
  TrendingUp,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
}

export const customerNav: NavItem[] = [
  { label: 'Overview', href: '/dashboard/customer', icon: LayoutDashboard },
  { label: 'Orders', href: '/dashboard/customer/orders', icon: ShoppingBag },
  { label: 'Wishlist', href: '/dashboard/customer/wishlist', icon: Star },
  { label: 'Following', href: '/dashboard/customer/following', icon: Users },
  { label: 'Notifications', href: '/dashboard/customer/notifications', icon: Bell },
  { label: 'Liked Products', href: '/dashboard/customer/liked', icon: Heart },
  { label: 'Recently Viewed', href: '/dashboard/customer/recent', icon: Eye },
  { label: 'Settings', href: '/dashboard/customer/settings', icon: Settings },
];

export const vendorNav: NavItem[] = [
  { label: 'Overview', href: '/dashboard/vendor', icon: LayoutDashboard },
  { label: 'Analytics', href: '/dashboard/vendor/analytics', icon: BarChart3 },
  { label: 'Products', href: '/dashboard/vendor/products', icon: Package },
  { label: 'Inventory', href: '/dashboard/vendor/inventory', icon: Package },
  { label: 'Orders', href: '/dashboard/vendor/orders', icon: ShoppingBag },
  { label: 'Messages', href: '/messaging', icon: MessageCircle },
  { label: 'Coupons', href: '/dashboard/vendor/coupons', icon: Percent },
  { label: 'Advertisements', href: '/dashboard/vendor/ads', icon: Megaphone },
  { label: 'Revenue', href: '/dashboard/vendor/revenue', icon: DollarSign },
  { label: 'Subscription', href: '/dashboard/vendor/subscription', icon: CreditCard },
  { label: 'Settings', href: '/dashboard/vendor/settings', icon: Settings },
];

export const brokerNav: NavItem[] = [
  { label: 'Overview', href: '/dashboard/broker', icon: LayoutDashboard },
  { label: 'Client Requests', href: '/dashboard/broker/clients', icon: Users },
  { label: 'Matched Vendors', href: '/dashboard/broker/matches', icon: Handshake },
  { label: 'Commission', href: '/dashboard/broker/commission', icon: Percent },
  { label: 'Earnings', href: '/dashboard/broker/earnings', icon: DollarSign },
  { label: 'Withdrawals', href: '/dashboard/broker/withdrawals', icon: Wallet },
  { label: 'Messages', href: '/messaging', icon: MessageCircle },
  { label: 'Performance', href: '/dashboard/broker/performance', icon: TrendingUp },
  { label: 'Settings', href: '/dashboard/broker/settings', icon: Settings },
];

export const customVendorNav: NavItem[] = [
  { label: 'Overview', href: '/dashboard/custom-vendor', icon: LayoutDashboard },
  { label: 'Analytics', href: '/dashboard/custom-vendor/analytics', icon: BarChart3 },
  { label: 'Products', href: '/dashboard/custom-vendor/products', icon: Package },
  { label: 'Quotations', href: '/dashboard/custom-vendor/quotations', icon: FileText },
  { label: 'Projects', href: '/dashboard/custom-vendor/projects', icon: Hammer },
  { label: 'Appointments', href: '/dashboard/custom-vendor/appointments', icon: Calendar },
  { label: 'Invoices', href: '/dashboard/custom-vendor/invoices', icon: FileText },
  { label: 'Contracts', href: '/dashboard/custom-vendor/contracts', icon: FileText },
  { label: 'Orders', href: '/dashboard/custom-vendor/orders', icon: ShoppingBag },
  { label: 'Messages', href: '/messaging', icon: MessageCircle },
  { label: 'Revenue', href: '/dashboard/custom-vendor/revenue', icon: DollarSign },
  { label: 'Settings', href: '/dashboard/custom-vendor/settings', icon: Settings },
];

interface DashboardSidebarProps {
  items: NavItem[];
  title: string;
}

export function DashboardSidebar({ items, title }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-border bg-card/50 p-4 hidden md:block">
      <h2 className="mb-4 px-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <nav className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function DashboardMobileNav({ items, title }: DashboardSidebarProps) {
  const pathname = usePathname();
  return (
    <div className="md:hidden">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                isActive ? 'bg-warm-orange-gradient text-white' : 'bg-muted text-muted-foreground'
              )}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
