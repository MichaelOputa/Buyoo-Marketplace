'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LifeBuoy, Search, ShoppingBag, Store, ShieldCheck, CreditCard, Truck, MessageCircle, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const categories = [
  { icon: ShoppingBag, label: 'Buying on Buyoo' },
  { icon: Store, label: 'Selling & vendors' },
  { icon: CreditCard, label: 'Payments' },
  { icon: Truck, label: 'Delivery & riders' },
  { icon: ShieldCheck, label: 'Trust & safety' },
  { icon: MessageCircle, label: 'Account & messaging' },
];

const faqs = [
  {
    category: 'Buying on Buyoo',
    question: 'How do I find products or vendors near me?',
    answer: 'Use the search bar or the Nearby tab to browse markets, vendors, and products filtered by your city and category. You can also filter by rating, price, and distance.',
  },
  {
    category: 'Buying on Buyoo',
    question: 'How do I contact a vendor about a product?',
    answer: "Open the product or vendor's profile and use the message button to start a conversation directly through Buyoo's messaging system.",
  },
  {
    category: 'Selling & vendors',
    question: 'How do I become a vendor or broker?',
    answer: "Sign up and select Vendor, Broker, or Custom Vendor during onboarding. You'll set up your profile, add products or services, and start appearing in search once your profile is verified.",
  },
  {
    category: 'Selling & vendors',
    question: 'How do I get verified on Buyoo?',
    answer: 'Verification is granted after we confirm your business details. Verified vendors get a badge on their profile, which builds trust with customers and can improve visibility in search.',
  },
  {
    category: 'Payments',
    question: 'What payment methods are supported?',
    answer: 'Buyoo supports card and bank transfer payments through our payment partners. Vendors can also arrange other terms directly with customers where applicable.',
  },
  {
    category: 'Delivery & riders',
    question: 'How does delivery work?',
    answer: 'Depending on the vendor, delivery is handled by their own logistics or by riders available on Buyoo. You can track rider availability and ratings from the Nearby tab.',
  },
  {
    category: 'Trust & safety',
    question: 'What should I do if something goes wrong with an order?',
    answer: 'First, try messaging the vendor to resolve it directly. If that doesn\'t work, use our Report an Issue form and our team will step in.',
  },
  {
    category: 'Account & messaging',
    question: 'How do I reset my password or update my profile?',
    answer: 'Head to your dashboard settings to update your profile, contact details, or password at any time.',
  },
];

export default function HelpPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return faqs;
    const q = query.toLowerCase();
    return faqs.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q) || f.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <LifeBuoy className="h-7 w-7" />
        </div>
        <h1 className="font-display text-3xl font-bold text-navy dark:text-white md:text-4xl">
          Help Center
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Find answers about buying, selling, payments, and more.
        </p>

        <div className="relative mx-auto mt-6 max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for help..."
            className="h-12 rounded-full pl-10"
          />
        </div>
      </motion.div>

      {/* Categories */}
      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card
              className="flex cursor-pointer items-center gap-2.5 p-3 transition-all hover:border-primary/40 hover:shadow-md"
              onClick={() => setQuery(cat.label)}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <cat.icon className="h-4 w-4" />
              </div>
              <p className="text-sm font-medium text-navy dark:text-white">{cat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* FAQs */}
      <section>
        <h2 className="mb-4 font-display text-xl font-bold text-navy dark:text-white">
          Frequently asked questions
        </h2>
        {filtered.length > 0 ? (
          <Card className="p-2 sm:p-4">
            <Accordion type="single" collapsible className="w-full">
              {filtered.map((faq, i) => (
                <AccordionItem key={faq.question} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-sm font-medium text-navy dark:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        ) : (
          <Card className="p-8 text-center text-sm text-muted-foreground">
            No results for "{query}". Try a different search, or contact us directly.
          </Card>
        )}
      </section>

      {/* CTA */}
      <Card className="mt-10 flex flex-col items-center gap-4 bg-navy p-8 text-center text-white sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h3 className="font-display text-xl font-bold">Still need help?</h3>
          <p className="mt-1 text-white/70">Our support team is ready to assist.</p>
        </div>
        <Button asChild size="lg" className="shrink-0 rounded-full bg-warm-orange-gradient text-white hover:opacity-90">
          <Link href="/contact">
            Contact support <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </Card>
    </div>
  );
}
