'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users, Store, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { vendors, products } from '@/lib/data';

const values = [
  {
    icon: Heart,
    title: 'Community first',
    description: 'We build for the people who show up every day — customers, vendors, brokers, and riders alike.',
  },
  {
    icon: ShieldCheck,
    title: 'Trust by design',
    description: 'Verification badges, reviews, and transparent policies keep every transaction honest.',
  },
  {
    icon: Target,
    title: 'Built for Africa',
    description: "We design around how people actually shop and sell here — not a copy-pasted playbook.",
  },
];

const stats = [
  { label: 'Active vendors', value: `${vendors.length}+` },
  { label: 'Products listed', value: `${products.length}+` },
  { label: 'Cities served', value: '6' },
  { label: 'User roles supported', value: '4' },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="font-display text-3xl font-bold text-navy dark:text-white md:text-4xl">
          Everything Around You
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Buyoo is a marketplace built for how people actually buy and sell locally —
          connecting customers, vendors, brokers, and custom vendors in one seamless experience.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="p-4 text-center">
              <p className="font-display text-2xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Story */}
      <section className="mb-12">
        <h2 className="mb-3 font-display text-2xl font-bold text-navy dark:text-white">Our story</h2>
        <p className="text-muted-foreground">
          Buyoo started with a simple observation: the best local marketplaces are the ones
          that feel personal — a vendor you trust, a rider who knows your street, a broker
          who understands exactly what you need. We set out to bring that same feeling
          online, without losing the human touch that makes local commerce work.
        </p>
        <p className="mt-4 text-muted-foreground">
          Today, Buyoo brings customers, vendors, brokers, and custom vendors together on
          one platform — with verified profiles, real-time discovery, and tools that make
          selling as easy as buying.
        </p>
      </section>

      {/* Mission & Vision */}
      <div className="mb-12 grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Target className="h-5 w-5" />
          </div>
          <h3 className="mb-2 font-display text-lg font-semibold text-navy dark:text-white">Our mission</h3>
          <p className="text-sm text-muted-foreground">
            Make it effortless for anyone to discover, buy, and sell everything around them —
            with trust and transparency at every step.
          </p>
        </Card>
        <Card className="p-6">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
            <Eye className="h-5 w-5" />
          </div>
          <h3 className="mb-2 font-display text-lg font-semibold text-navy dark:text-white">Our vision</h3>
          <p className="text-sm text-muted-foreground">
            A future where every local business, broker, and rider has the same digital
            reach as the biggest players — powered by one connected marketplace.
          </p>
        </Card>
      </div>

      {/* Values */}
      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl font-bold text-navy dark:text-white">What we value</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full p-5">
                <value.icon className="mb-3 h-6 w-6 text-primary" />
                <h3 className="mb-1.5 font-semibold text-navy dark:text-white">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Who we serve */}
      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl font-bold text-navy dark:text-white">Who we serve</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Users, label: 'Customers', description: 'Discover trusted vendors and products nearby.' },
            { icon: Store, label: 'Vendors & brokers', description: 'Reach more customers and grow with confidence.' },
            { icon: Truck, label: 'Riders & errand pros', description: 'Turn availability into steady earnings.' },
          ].map((item) => (
            <Card key={item.label} className="p-5">
              <item.icon className="mb-3 h-6 w-6 text-secondary" />
              <h3 className="mb-1.5 font-semibold text-navy dark:text-white">{item.label}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Card className="flex flex-col items-center gap-4 bg-warm-orange-gradient p-8 text-center text-white md:flex-row md:justify-between md:text-left">
        <div>
          <h3 className="font-display text-xl font-bold">Ready to join Buyoo?</h3>
          <p className="mt-1 text-white/90">Start buying, selling, or delivering today.</p>
        </div>
        <Button asChild size="lg" variant="secondary" className="shrink-0 rounded-full bg-white text-primary hover:bg-white/90">
          <Link href="/auth/signup">
            Get started <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </Card>
    </div>
  );
}
