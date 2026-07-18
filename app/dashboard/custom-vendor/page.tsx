'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  Hammer,
  Calendar,
  DollarSign,
  Eye,
  ShoppingBag,
  MessageCircle,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DashboardSidebar, DashboardMobileNav, customVendorNav } from '@/components/dashboard-sidebar';
import { StatCard } from '@/components/stat-card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const projectData = [
  { month: 'Jan', quotes: 12, projects: 3 },
  { month: 'Feb', quotes: 18, projects: 5 },
  { month: 'Mar', quotes: 15, projects: 4 },
  { month: 'Apr', quotes: 22, projects: 7 },
  { month: 'May', quotes: 28, projects: 9 },
  { month: 'Jun', quotes: 31, projects: 11 },
  { month: 'Jul', quotes: 35, projects: 14 },
];

const quotations = [
  { client: 'Lagos Properties Ltd', project: 'Office Renovation', amount: '₦2.5M', status: 'pending', date: '2 hours ago' },
  { client: 'Green Valley Homes', project: 'Kitchen Remodel', amount: '₦850K', status: 'approved', date: '1 day ago' },
  { client: 'Skyline Development', project: 'Full Building Project', amount: '₦15M', status: 'pending', date: '2 days ago' },
  { client: 'Private Client', project: 'Interior Design', amount: '₦1.2M', status: 'approved', date: '3 days ago' },
];

const appointments = [
  { client: 'Lagos Properties', time: 'Today, 2:00 PM', type: 'Site Visit' },
  { client: 'Green Valley', time: 'Tomorrow, 10:00 AM', type: 'Consultation' },
  { client: 'Skyline Dev', time: 'Jul 18, 1:00 PM', type: 'Project Review' },
];

export default function CustomVendorDashboard() {
  return (
    <div className="flex">
      <DashboardSidebar items={customVendorNav} title="Custom Vendor" />
      <div className="flex-1">
        <DashboardMobileNav items={customVendorNav} title="Custom Vendor" />
        <div className="p-4 md:p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-navy dark:text-white">
                Custom Vendor Dashboard
              </h1>
              <p className="mt-1 text-muted-foreground">BuildRight Construction · Services</p>
            </div>
            <Button className="bg-warm-orange-gradient">
              <Plus className="mr-1.5 h-4 w-4" /> New Quote
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Quotation Requests" value="35" change="+12%" icon={FileText} color="bg-primary/10 text-primary" delay={0} />
            <StatCard label="Active Projects" value="14" change="+3" icon={Hammer} color="bg-secondary/10 text-secondary" delay={0.05} />
            <StatCard label="Appointments" value="8" icon={Calendar} color="bg-blue-500/10 text-blue-600" delay={0.1} />
            <StatCard label="Revenue" value="₦18.5M" change="+28%" icon={DollarSign} color="bg-green-500/10 text-green-600" delay={0.15} />
          </div>

          {/* Chart */}
          <Card className="mt-6 p-6">
            <h2 className="mb-4 font-display text-lg font-semibold text-navy dark:text-white">
              Quotations & Projects
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={projectData}>
                <defs>
                  <linearGradient id="quoteGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(28 100% 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(28 100% 50%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142 57% 49%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(142 57% 49%)" stopOpacity={0} />
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
                <Area type="monotone" dataKey="quotes" stroke="hsl(28 100% 50%)" strokeWidth={2} fill="url(#quoteGrad)" />
                <Area type="monotone" dataKey="projects" stroke="hsl(142 57% 49%)" strokeWidth={2} fill="url(#projGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Quotation requests */}
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-navy dark:text-white">
                  Quotation Requests
                </h2>
                <Button variant="ghost" size="sm">View all</Button>
              </div>
              <div className="space-y-3">
                {quotations.map((quote, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-xl border border-border p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-navy dark:text-white">{quote.client}</h3>
                        <p className="text-xs text-muted-foreground">{quote.project}</p>
                      </div>
                      <span className="text-sm font-bold text-navy dark:text-white">{quote.amount}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <Badge
                        className={
                          quote.status === 'pending' ? 'bg-amber-500/10 text-amber-600' : 'bg-secondary/10 text-secondary'
                        }
                      >
                        {quote.status === 'pending' ? <Clock className="mr-1 h-3 w-3" /> : <CheckCircle2 className="mr-1 h-3 w-3" />}
                        {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{quote.date}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Appointments */}
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-navy dark:text-white">
                  Upcoming Appointments
                </h2>
                <Button variant="ghost" size="sm">Calendar</Button>
              </div>
              <div className="space-y-3">
                {appointments.map((apt, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 rounded-xl border border-border p-4"
                  >
                    <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-navy dark:text-white">{apt.client}</h3>
                      <p className="text-xs text-muted-foreground">{apt.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-navy dark:text-white">{apt.time.split(',')[0]}</p>
                      <p className="text-xs text-muted-foreground">{apt.time.split(',')[1]}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Invoices & Contracts */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Pending Invoices', value: '5', icon: FileText, color: 'bg-amber-500/10 text-amber-600' },
              { label: 'Active Contracts', value: '8', icon: FileText, color: 'bg-secondary/10 text-secondary' },
              { label: 'Project Views', value: '3.2K', icon: Eye, color: 'bg-primary/10 text-primary' },
              { label: 'Messages', value: '15', icon: MessageCircle, color: 'bg-blue-500/10 text-blue-600' },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="flex items-center gap-3 p-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-display text-lg font-bold text-navy dark:text-white">{item.value}</p>
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
