'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Megaphone, Check, Target, BarChart3, Zap, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const plans = [
  {
    name: 'Starter',
    price: '₦15,000',
    period: '/month',
    description: 'Get discovered in category search and nearby results.',
    features: ['Featured in category search', 'Basic profile boost', 'Monthly performance summary'],
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '₦45,000',
    period: '/month',
    description: 'Priority placement across the marketplace and homepage.',
    features: ['Everything in Starter', 'Homepage featured placement', 'Sponsored product badges', 'Weekly performance insights'],
    highlighted: true,
  },
  {
    name: 'Custom',
    price: 'Let\'s talk',
    period: '',
    description: 'For brands and brokers running large campaigns.',
    features: ['Everything in Growth', 'Dedicated account support', 'Custom banner placements', 'Campaign-level reporting'],
    highlighted: false,
  },
];

const benefits = [
  { icon: Target, title: 'Reach the right audience', description: 'Get in front of customers actively searching in your category and city.' },
  { icon: BarChart3, title: 'Track real performance', description: 'See impressions, clicks, and conversions on every campaign.' },
  { icon: Zap, title: 'Launch in minutes', description: 'No design team needed — set up a campaign straight from your dashboard.' },
];

export default function AdvertisePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Megaphone className="h-7 w-7" />
        </div>
        <h1 className="font-display text-3xl font-bold text-navy dark:text-white md:text-4xl">
          Advertise on Buyoo
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Put your products and services in front of customers who are already looking
          to buy — in your category, in your city.
        </p>
      </motion.div>

      {/* Benefits */}
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="h-full p-5 text-center">
              <b.icon className="mx-auto mb-3 h-6 w-6 text-primary" />
              <h3 className="mb-1.5 font-semibold text-navy dark:text-white">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Plans */}
      <section className="mt-14">
        <h2 className="mb-6 text-center font-display text-2xl font-bold text-navy dark:text-white">
          Choose your plan
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                className={`relative flex h-full flex-col p-6 ${
                  plan.highlighted ? 'border-2 border-primary shadow-lg' : ''
                }`}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-warm-orange-gradient text-white">
                    Most popular
                  </Badge>
                )}
                <h3 className="font-display text-lg font-bold text-navy dark:text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-bold text-navy dark:text-white">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`mt-6 rounded-full ${
                    plan.highlighted
                      ? 'bg-warm-orange-gradient text-white hover:opacity-90'
                      : ''
                  }`}
                  variant={plan.highlighted ? 'default' : 'outline'}
                >
                  <Link href="/auth/signup">
                    Get started <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Prices shown are indicative. Final pricing is confirmed when you set up your campaign.
        </p>
      </section>

      {/* CTA */}
      <Card className="mt-14 flex flex-col items-center gap-4 bg-navy p-8 text-center text-white">
        <div>
          <h3 className="font-display text-xl font-bold">Not sure which plan fits?</h3>
          <p className="mt-1 text-white/70">Talk to us and we'll help you set up your first campaign.</p>
        </div>
        <Button asChild size="lg" className="rounded-full bg-warm-orange-gradient text-white hover:opacity-90">
          <a href="mailto:ads@buyoo.com">Contact advertising team</a>
        </Button>
      </Card>
    </div>
  );
}
