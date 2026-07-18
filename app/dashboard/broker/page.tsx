'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Handshake,
  DollarSign,
  Wallet,
  TrendingUp,
  Percent,
  MessageCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { DashboardSidebar, DashboardMobileNav, brokerNav } from '@/components/dashboard-sidebar';
import { StatCard } from '@/components/stat-card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VerifiedBadge } from '@/components/verified-badge';
import { vendors, formatCount } from '@/lib/data';

const earningsData = [
  { month: 'Jan', earnings: 45000, commission: 12000 },
  { month: 'Feb', earnings: 62000, commission: 18000 },
  { month: 'Mar', earnings: 58000, commission: 15000 },
  { month: 'Apr', earnings: 78000, commission: 22000 },
  { month: 'May', earnings: 95000, commission: 28000 },
  { month: 'Jun', earnings: 112000, commission: 35000 },
  { month: 'Jul', earnings: 134000, commission: 42000 },
];

const clientRequests = [
  { name: 'Adebayo Okafor', type: 'Electronics', budget: '₦500K - ₦1M', status: 'pending', date: '2 hours ago' },
  { name: 'Fatima Bello', type: 'Fashion', budget: '₦50K - ₦200K', status: 'matched', date: '5 hours ago' },
  { name: 'Chidi Eze', type: 'Vehicles', budget: '₦5M - ₦10M', status: 'pending', date: '1 day ago' },
  { name: 'Grace Adeyemi', type: 'Agriculture', budget: '₦100K - ₦500K', status: 'completed', date: '2 days ago' },
];

export default function BrokerDashboard() {
  return (
    <div className="flex">
      <DashboardSidebar items={brokerNav} title="Broker Dashboard" />
      <div className="flex-1">
        <DashboardMobileNav items={brokerNav} title="Broker Dashboard" />
        <div className="p-4 md:p-8">
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold text-navy dark:text-white">
              Broker Dashboard
            </h1>
            <p className="mt-1 text-muted-foreground">Manage your clients and commissions</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Client Requests" value="24" change="+8" icon={Users} color="bg-primary/10 text-primary" delay={0} />
            <StatCard label="Matched Vendors" value="18" change="+5" icon={Handshake} color="bg-secondary/10 text-secondary" delay={0.05} />
            <StatCard label="Total Earnings" value="₦134K" change="+22%" icon={DollarSign} color="bg-green-500/10 text-green-600" delay={0.1} />
            <StatCard label="Available" value="₦92K" icon={Wallet} color="bg-blue-500/10 text-blue-600" delay={0.15} />
          </div>

          {/* Earnings chart */}
          <Card className="mt-6 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-navy dark:text-white">
                Earnings & Commission
              </h2>
              <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                <TrendingUp className="mr-1 h-3 w-3" /> +22% growth
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={earningsData}>
                <defs>
                  <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142 57% 49%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(142 57% 49%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="commGrad" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="earnings" stroke="hsl(142 57% 49%)" strokeWidth={2} fill="url(#earnGrad)" />
                <Area type="monotone" dataKey="commission" stroke="hsl(28 100% 50%)" strokeWidth={2} fill="url(#commGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Client requests */}
          <Card className="mt-6 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-navy dark:text-white">
                Recent Client Requests
              </h2>
              <Button variant="ghost" size="sm">View all</Button>
            </div>
            <div className="space-y-3">
              {clientRequests.map((req, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 rounded-xl border border-border p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-navy dark:text-white">{req.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {req.type} · Budget: {req.budget} · {req.date}
                    </p>
                  </div>
                  <Badge
                    className={
                      req.status === 'pending' ? 'bg-amber-500/10 text-amber-600' :
                      req.status === 'matched' ? 'bg-secondary/10 text-secondary' :
                      'bg-green-500/10 text-green-600'
                    }
                  >
                    {req.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                    {req.status === 'matched' && <Handshake className="mr-1 h-3 w-3" />}
                    {req.status === 'completed' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Matched vendors */}
          <Card className="mt-6 p-6">
            <h2 className="mb-4 font-display text-lg font-semibold text-navy dark:text-white">
              Matched Vendors
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {vendors.slice(0, 3).map((vendor, i) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-border p-4"
                >
                  <div className="flex items-center gap-3">
                    <img src={vendor.avatar} alt={vendor.name} className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <h3 className="flex items-center gap-1 text-sm font-medium text-navy dark:text-white">
                        {vendor.name}
                        {vendor.verified && <VerifiedBadge className="h-3.5 w-3.5" />}
                      </h3>
                      <p className="text-xs text-muted-foreground">{vendor.category}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{formatCount(vendor.followers)} followers</span>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="mr-1 h-3.5 w-3.5" /> Contact
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Withdrawal */}
          <Card className="mt-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold text-navy dark:text-white">
                  Withdrawal
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Available balance: <span className="font-bold text-secondary">₦92,000</span>
                </p>
              </div>
              <Button className="bg-warm-orange-gradient">
                <Wallet className="mr-1.5 h-4 w-4" /> Withdraw
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
