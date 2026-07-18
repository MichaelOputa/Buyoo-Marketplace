'use client';

import { motion } from 'framer-motion';
import {
  Eye,
  ShoppingBag,
  DollarSign,
  MessageCircle,
  Package,
  Percent,
  Megaphone,
  CreditCard,
  TrendingUp,
  Plus,
  MoreHorizontal,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DashboardSidebar, DashboardMobileNav, vendorNav } from '@/components/dashboard-sidebar';
import { StatCard } from '@/components/stat-card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const revenueData = [
  { month: 'Jan', revenue: 450000, orders: 32 },
  { month: 'Feb', revenue: 520000, orders: 38 },
  { month: 'Mar', revenue: 680000, orders: 45 },
  { month: 'Apr', revenue: 590000, orders: 41 },
  { month: 'May', revenue: 750000, orders: 52 },
  { month: 'Jun', revenue: 890000, orders: 61 },
  { month: 'Jul', revenue: 980000, orders: 68 },
];

const trafficData = [
  { name: 'Direct', value: 35, color: 'hsl(28 100% 50%)' },
  { name: 'Search', value: 28, color: 'hsl(142 57% 49%)' },
  { name: 'Social', value: 22, color: 'hsl(223 49% 16%)' },
  { name: 'Referral', value: 15, color: 'hsl(43 74% 66%)' },
];

const topProducts = [
  { name: 'iPhone 15 Pro Max', sales: 24, revenue: 30000000 },
  { name: 'Samsung Galaxy S24', sales: 18, revenue: 21600000 },
  { name: 'AirPods Pro', sales: 32, revenue: 9600000 },
  { name: 'MacBook Air M2', sales: 8, revenue: 12800000 },
];

export default function VendorDashboard() {
  return (
    <div className="flex">
      <DashboardSidebar items={vendorNav} title="Vendor Dashboard" />
      <div className="flex-1">
        <DashboardMobileNav items={vendorNav} title="Vendor Dashboard" />
        <div className="p-4 md:p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-navy dark:text-white">
                Vendor Dashboard
              </h1>
              <p className="mt-1 text-muted-foreground">TechHub Lagos · Electronics</p>
            </div>
            <Button className="bg-warm-orange-gradient">
              <Plus className="mr-1.5 h-4 w-4" /> Add Product
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Total Views" value="12.4K" change="+18%" icon={Eye} color="bg-primary/10 text-primary" delay={0} />
            <StatCard label="Orders" value="68" change="+12%" icon={ShoppingBag} color="bg-secondary/10 text-secondary" delay={0.05} />
            <StatCard label="Revenue" value="₦980K" change="+15%" icon={DollarSign} color="bg-green-500/10 text-green-600" delay={0.1} />
            <StatCard label="Messages" value="23" change="+5" icon={MessageCircle} color="bg-blue-500/10 text-blue-600" delay={0.15} />
          </div>

          {/* Charts */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <Card className="p-6 lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-navy dark:text-white">
                  Revenue Overview
                </h2>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                  <TrendingUp className="mr-1 h-3 w-3" /> +15% this month
                </Badge>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(28 100% 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(28 100% 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(28 100% 50%)"
                    strokeWidth={2}
                    fill="url(#revGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h2 className="mb-4 font-display text-lg font-semibold text-navy dark:text-white">
                Traffic Sources
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={trafficData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {trafficData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {trafficData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="ml-auto font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Orders chart */}
          <Card className="mt-6 p-6">
            <h2 className="mb-4 font-display text-lg font-semibold text-navy dark:text-white">
              Orders per Month
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                  }}
                />
                <Bar dataKey="orders" fill="hsl(142 57% 49%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Top products */}
          <Card className="mt-6 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-navy dark:text-white">
                Top Products
              </h2>
              <Button variant="ghost" size="sm">View all</Button>
            </div>
            <div className="space-y-3">
              {topProducts.map((product, i) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 rounded-xl bg-muted/50 p-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-navy dark:text-white">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                  </div>
                  <span className="text-sm font-bold text-navy dark:text-white">
                    ₦{(product.revenue / 1000000).toFixed(1)}M
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Quick actions */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Add Product', icon: Package, color: 'bg-primary/10 text-primary' },
              { label: 'Create Coupon', icon: Percent, color: 'bg-secondary/10 text-secondary' },
              { label: 'Run Ad', icon: Megaphone, color: 'bg-amber-500/10 text-amber-600' },
              { label: 'Subscribe', icon: CreditCard, color: 'bg-blue-500/10 text-blue-600' },
            ].map((action) => (
              <Button key={action.label} variant="outline" className="h-auto flex-col gap-2 py-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
