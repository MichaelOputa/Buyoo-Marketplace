'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Bell, Shield, Globe, Trash2 } from 'lucide-react';
import { DashboardSidebar, DashboardMobileNav, customerNav } from '@/components/dashboard-sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    orders: true,
    messages: true,
    promotions: false,
    priceAlerts: true,
  });
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showActivity: false,
  });

  return (
    <div className="flex">
      <DashboardSidebar items={customerNav} title="Customer Dashboard" />
      <div className="flex-1">
        <DashboardMobileNav items={customerNav} title="Customer Dashboard" />
        <div className="p-4 md:p-8">
          <h1 className="mb-1 font-display text-2xl font-bold text-navy dark:text-white">Settings</h1>
          <p className="mb-8 text-muted-foreground">Manage your account and preferences</p>

          <div className="space-y-6">
            {/* Profile */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="p-6">
                <div className="mb-5 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-lg font-semibold text-navy dark:text-white">Profile</h2>
                </div>
                <div className="mb-5 flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="mt-1.5 text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@johndoe" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input id="email" defaultValue="john@example.com" className="pl-9" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative mt-1.5">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input id="phone" defaultValue="+234 800 000 0000" className="pl-9" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative mt-1.5">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input id="location" defaultValue="Lekki Phase 1, Lagos" className="pl-9" />
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </Card>
            </motion.div>

            {/* Notifications */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
              <Card className="p-6">
                <div className="mb-5 flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-lg font-semibold text-navy dark:text-white">Notifications</h2>
                </div>
                <div className="space-y-4">
                  <ToggleRow
                    label="Order Updates"
                    description="Get notified about your order status"
                    checked={notifications.orders}
                    onChange={(v) => setNotifications({ ...notifications, orders: v })}
                  />
                  <ToggleRow
                    label="Messages"
                    description="New messages from vendors"
                    checked={notifications.messages}
                    onChange={(v) => setNotifications({ ...notifications, messages: v })}
                  />
                  <ToggleRow
                    label="Promotions"
                    description="Deals, discounts, and special offers"
                    checked={notifications.promotions}
                    onChange={(v) => setNotifications({ ...notifications, promotions: v })}
                  />
                  <ToggleRow
                    label="Price Alerts"
                    description="When wishlist items drop in price"
                    checked={notifications.priceAlerts}
                    onChange={(v) => setNotifications({ ...notifications, priceAlerts: v })}
                  />
                </div>
              </Card>
            </motion.div>

            {/* Privacy */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
              <Card className="p-6">
                <div className="mb-5 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-lg font-semibold text-navy dark:text-white">Privacy</h2>
                </div>
                <div className="space-y-4">
                  <ToggleRow
                    label="Public Profile"
                    description="Allow others to view your profile"
                    checked={privacy.profilePublic}
                    onChange={(v) => setPrivacy({ ...privacy, profilePublic: v })}
                  />
                  <ToggleRow
                    label="Show Activity"
                    description="Display your activity status to others"
                    checked={privacy.showActivity}
                    onChange={(v) => setPrivacy({ ...privacy, showActivity: v })}
                  />
                </div>
              </Card>
            </motion.div>

            {/* Connected Accounts */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
              <Card className="p-6">
                <div className="mb-5 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-lg font-semibold text-navy dark:text-white">Connected Accounts</h2>
                </div>
                <div className="space-y-3">
                  <ConnectedAccountRow provider="Google" email="john@example.com" connected />
                  <ConnectedAccountRow provider="Apple" email="Not connected" connected={false} />
                  <ConnectedAccountRow provider="Facebook" email="john.fb@example.com" connected />
                </div>
              </Card>
            </motion.div>

            {/* Danger Zone */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
              <Card className="border-destructive/30 p-6">
                <div className="mb-5 flex items-center gap-2">
                  <Trash2 className="h-5 w-5 text-destructive" />
                  <h2 className="font-display text-lg font-semibold text-destructive">Danger Zone</h2>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium text-navy dark:text-white">Delete Account</p>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data.</p>
                  </div>
                  <Button variant="destructive" size="sm">Delete Account</Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-navy dark:text-white">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function ConnectedAccountRow({ provider, email, connected }: { provider: string; email: string; connected: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border p-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
          <Globe className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium text-navy dark:text-white">{provider}</p>
          <p className="text-xs text-muted-foreground">{email}</p>
        </div>
      </div>
      <Button variant={connected ? 'outline' : 'default'} size="sm">
        {connected ? 'Disconnect' : 'Connect'}
      </Button>
    </div>
  );
}
