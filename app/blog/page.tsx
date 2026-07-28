'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PenSquare, TrendingUp, Store, Sparkles, Mail } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const upcomingTopics = [
  { icon: Store, title: 'Vendor spotlights', description: 'Stories from the businesses building on Buyoo.' },
  { icon: TrendingUp, title: 'Marketplace insights', description: 'Trends, data, and tips for buying and selling smarter.' },
  { icon: Sparkles, title: 'Product updates', description: 'What we shipped, and why we built it.' },
];

export default function BlogPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setSubmitted(true);
    toast.success("You're on the list! We'll email you when we publish.");
    setEmail('');
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <PenSquare className="h-7 w-7" />
        </div>
        <Badge variant="secondary" className="mb-3 bg-secondary/10 text-secondary">Coming soon</Badge>
        <h1 className="font-display text-3xl font-bold text-navy dark:text-white md:text-4xl">
          The Buyoo Blog
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          We're putting together stories, guides, and updates from across the Buyoo
          marketplace. Nothing published yet — but here's what's coming.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {upcomingTopics.map((topic, i) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="h-full p-5 text-center">
              <topic.icon className="mx-auto mb-3 h-6 w-6 text-primary" />
              <h3 className="mb-1.5 font-semibold text-navy dark:text-white">{topic.title}</h3>
              <p className="text-sm text-muted-foreground">{topic.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="mt-12 flex flex-col items-center gap-4 bg-warm-orange-gradient p-8 text-center text-white">
        <Mail className="h-7 w-7" />
        <div>
          <h3 className="font-display text-xl font-bold">Get notified at launch</h3>
          <p className="mt-1 text-white/90">Be the first to know when we publish our first post.</p>
        </div>
        <form onSubmit={handleSubscribe} className="flex w-full max-w-sm gap-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="h-11 rounded-full border-0 bg-white text-navy placeholder:text-muted-foreground"
          />
          <Button type="submit" variant="secondary" className="h-11 shrink-0 rounded-full bg-navy text-white hover:bg-navy/90">
            Notify me
          </Button>
        </form>
      </Card>
    </div>
  );
}
