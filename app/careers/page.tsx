'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, Mail, Heart, Zap, Users, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const perks = [
  { icon: Zap, title: 'Move fast', description: 'Small teams, real ownership, shipped features every week.' },
  { icon: Users, title: 'Remote-friendly', description: 'Work from Lagos or anywhere — we care about output, not seat time.' },
  { icon: TrendingUp, title: 'Room to grow', description: 'Early team members shape the roadmap and grow with the company.' },
  { icon: Heart, title: 'Build for real people', description: 'Everything you ship is used by real vendors and customers, immediately.' },
];

const openRoles = [
  {
    title: 'Frontend Engineer (React/Next.js)',
    type: 'Full-time',
    location: 'Lagos, Nigeria · Remote',
    department: 'Engineering',
  },
  {
    title: 'Backend Engineer (Node.js/PostgreSQL)',
    type: 'Full-time',
    location: 'Lagos, Nigeria · Remote',
    department: 'Engineering',
  },
  {
    title: 'Vendor Success Associate',
    type: 'Full-time',
    location: 'Lagos, Nigeria',
    department: 'Operations',
  },
  {
    title: 'Product Designer',
    type: 'Contract',
    location: 'Remote',
    department: 'Design',
  },
];

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary">We're hiring</Badge>
        <h1 className="font-display text-3xl font-bold text-navy dark:text-white md:text-4xl">
          Build the marketplace for everything around you
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Join a small team building tools that help real vendors, brokers, and customers
          connect every single day.
        </p>
      </motion.div>

      {/* Perks */}
      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl font-bold text-navy dark:text-white">Why Buyoo</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full p-5">
                <perk.icon className="mb-3 h-6 w-6 text-primary" />
                <h3 className="mb-1.5 font-semibold text-navy dark:text-white">{perk.title}</h3>
                <p className="text-sm text-muted-foreground">{perk.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open roles */}
      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl font-bold text-navy dark:text-white">Open roles</h2>
        <div className="space-y-3">
          {openRoles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="flex flex-col gap-3 p-5 transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-navy dark:text-white">{role.title}</h3>
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary">{role.department}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {role.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {role.type}</span>
                  </div>
                </div>
                <Button asChild variant="outline" className="rounded-full shrink-0">
                  <a href={`mailto:careers@buyoo.com?subject=Application: ${role.title}`}>
                    Apply
                  </a>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Card className="flex flex-col items-center gap-4 bg-navy p-8 text-center text-white">
        <Briefcase className="h-8 w-8 text-primary" />
        <div>
          <h3 className="font-display text-xl font-bold">Don't see the right role?</h3>
          <p className="mt-1 text-white/70">
            We're always open to meeting people who care about building great local marketplaces.
          </p>
        </div>
        <Button asChild size="lg" className="rounded-full bg-warm-orange-gradient text-white hover:opacity-90">
          <a href="mailto:careers@buyoo.com">
            <Mail className="mr-1.5 h-4 w-4" /> careers@buyoo.com
          </a>
        </Button>
      </Card>
    </div>
  );
}
