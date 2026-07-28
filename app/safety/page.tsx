'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  UserCheck,
  MessageSquareWarning,
  MapPin,
  CreditCard,
  Flag,
  ArrowRight,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const buyerTips = [
  {
    icon: UserCheck,
    title: 'Check for the verified badge',
    description: 'Verified vendors have had their business details confirmed by Buyoo. Look for the badge on their profile before making high-value purchases.',
  },
  {
    icon: MessageSquareWarning,
    title: 'Keep communication on Buyoo',
    description: "Use Buyoo's messaging system for order-related conversations. It keeps a record you can refer back to if something goes wrong.",
  },
  {
    icon: CreditCard,
    title: 'Pay through supported methods',
    description: "Avoid sending payment outside Buyoo's supported channels — it removes the protections we're able to offer if a transaction goes wrong.",
  },
  {
    icon: MapPin,
    title: 'Meet in safe, public locations',
    description: 'If you arrange to meet a vendor or rider in person, choose a well-lit, public location, and let someone know where you\'ll be.',
  },
];

const vendorTips = [
  {
    icon: ShieldCheck,
    title: 'Protect your account',
    description: 'Use a strong, unique password and never share your login details, even with someone claiming to be from Buyoo support.',
  },
  {
    icon: MessageSquareWarning,
    title: 'Be wary of unusual requests',
    description: 'Watch out for buyers pushing you to ship before payment clears, or asking you to communicate off-platform immediately.',
  },
];

export default function SafetyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <h1 className="font-display text-3xl font-bold text-navy dark:text-white md:text-4xl">
          Safety Tips
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          A few simple habits keep buying and selling on Buyoo safe for everyone.
        </p>
      </motion.div>

      {/* For buyers */}
      <section className="mb-10">
        <h2 className="mb-4 font-display text-xl font-bold text-navy dark:text-white">For customers</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {buyerTips.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="h-full p-5">
                <tip.icon className="mb-3 h-6 w-6 text-primary" />
                <h3 className="mb-1.5 font-semibold text-navy dark:text-white">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* For vendors */}
      <section className="mb-10">
        <h2 className="mb-4 font-display text-xl font-bold text-navy dark:text-white">
          For vendors, brokers & riders
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {vendorTips.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="h-full p-5">
                <tip.icon className="mb-3 h-6 w-6 text-secondary" />
                <h3 className="mb-1.5 font-semibold text-navy dark:text-white">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Red flags */}
      <Card className="mb-10 border-destructive/30 bg-destructive/5 p-6">
        <h3 className="mb-2 flex items-center gap-2 font-semibold text-navy dark:text-white">
          <Flag className="h-5 w-5 text-destructive" /> Warning signs to watch for
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>• Prices that seem too good to be true for the item or service</li>
          <li>• Pressure to pay immediately or move the conversation off Buyoo</li>
          <li>• Refusal to share verifiable business or contact details</li>
          <li>• Requests for sensitive personal or financial information</li>
        </ul>
      </Card>

      {/* CTA */}
      <Card className="flex flex-col items-center gap-4 bg-navy p-8 text-center text-white sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h3 className="font-display text-xl font-bold">Seen something concerning?</h3>
          <p className="mt-1 text-white/70">Report it and our trust & safety team will look into it.</p>
        </div>
        <Button asChild size="lg" className="shrink-0 rounded-full bg-warm-orange-gradient text-white hover:opacity-90">
          <Link href="/report">
            Report an issue <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </Card>
    </div>
  );
}
